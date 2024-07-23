import { Router } from "express";
import prisma from "../prismaClient.js";
import { validateCreateSales } from "../validators/sales.validar.js";
import moment from "moment-timezone";
import { crearElasticByType, getDocumentById, parseDateISO } from "../utils/index.js";
import { client } from "../ClienteElasticSearch.js";

const InvoiceRouter = Router();

/* InvoiceRouter.get("/", async (req, res) => {
  try {
    const invoices = await prisma.invoice.findMany({
      include: { InvoiceDetail: { include: { product: true } }, client: true },
    });

    console.log(invoices);
    res.json(invoices);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}); */

InvoiceRouter.get("/per_day/:date", async (req, res) => {
  try {
    const specificDate = new Date(req.params.date);

    // Calculate the start and end of the day
  /*   const startOfDay = new Date(specificDate);
    startOfDay.setUTCHours(0, 0, 0, 0);

    const endOfDay = new Date(specificDate);
    endOfDay.setUTCHours(23, 59, 59, 999); */

    const startOfDay = new Date(specificDate).setHours(0, 0, 0, 0);
    const endOfDay = new Date(specificDate).setHours(23, 59, 59, 999);

    /* console.log(new Date(req.params.date)); */
    console.log(startOfDay);
    console.log(endOfDay);

    
    const result = await client.search({
      index: 'sistemabarberia', // Reemplaza con el nombre de tu índice
      body: {
        query: {
          bool: {
            must: [
              { match: { type: "factura" } },
              { match: { sale_date_day: specificDate } },              
              /* {
                range: {
                  sale_date: {
                    gte: new Date(startOfDay).getTime(),
                    lte: new Date(endOfDay).getTime()
                  }
                }
              } */
            ]
          }
        }
      }
    });
    var invoices =result.body.hits.hits
    invoices = invoices.map( async(c) =>{
      console.log(c._source.client_id !==null);
        if(c._source.client_id !==null){
          return {
            ...c._source,
            _id:c._id,
            client: await getDocumentById(c._source.client_id )
          }
        }else{

          return {
            ...c._source,
            _id:c._id
          }
        }
      
      
    })
    invoices = await Promise.all(invoices)    
    res.json(invoices);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

InvoiceRouter.post("/", validateCreateSales, async (req, res) => {
  try {
    const currentDate = moment.utc();
    const localDate = currentDate.tz("America/Bogota"); // Reemplaza con tu zona horaria   
    var data = req.body
    var dataMv = {};
    

    data.hora = `${localDate.hour()} : ${localDate.minutes()}`
    data.fecha = `${localDate.format()}`
    data.sale_date = new Date(localDate.format()).getTime();
    data.sale_date_day = localDate.format().substring(0,10);

    dataMv.sale_date_day = localDate.format().substring(0,10);
    dataMv.hora = `${localDate.hour()} : ${localDate.minutes()}`
    dataMv.fecha = `${localDate.format()}`
    dataMv.entra = `${data.payment_method ==="Efectivo" ? data.total : 0}`
    dataMv.sale = 0
  
    const responseCreateFactura = await crearElasticByType(data,"factura")

    dataMv.concepto = `Pago x Factura de Venta - ${responseCreateFactura.body._id} - ${data.payment_method}`
    await crearElasticByType(dataMv,"movimiento")

    return res
      .status(201)
      .json({ message: "Factura Creada."});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

export default InvoiceRouter;
