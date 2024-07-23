import jsPDF from "jspdf";
import "jspdf-autotable";
import PropTypes from "prop-types";
import { ViewDollar } from "../../../utils";
const TicketFactura = ({ data }) => {
  TicketFactura.propTypes = {
    data: PropTypes.object,
  };
  const generatePDF = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [80, 150],// 80mm width, 297mm height (A4 height for longer invoices)
    });

    console.log(data);

    
    doc.setFontSize(10)

    doc.text("Cra 43 # 4a13", 40, 15, { align: "center" });
    doc.text("Teléfono: 123-456-7890", 40, 20, { align: "center" });

    doc.text(`Fecha: ${data?.fecha?.substring(0, 10)}`, 10, 30);
    doc.text(
      `Cliente: ${data.client ? data.client.name : "No Registra"}`,
      10,
      35
    ); 
    // Add table with products
     const columns = [
      { header: "Producto", dataKey: "product" },
      { header: "Cant.", dataKey: "quantity" },
      { header: "Precio", dataKey: "price" },
      { header: "Total", dataKey: "total" },
    ];

    const rows = data.productos.map((item) => ({
      product: item?.name,
      quantity: item?.quantity,
      price: ViewDollar(item?.price),
      total: ViewDollar(item?.quantity * item?.price),
    }));

    doc.autoTable({
      columns,
      body: rows,
      startY: 40,
      margin: { right: 2, left: 2 },
      styles: { fontSize: 7 },
    });

    // Add total sum
    const finalY = doc.lastAutoTable.finalY;
    doc.text(`Total: ${ViewDollar(data.total)}`, 14, finalY + 10); 

    /* doc.save("invoice.pdf"); */
    /* startY += data.items.length * 5 + 10;
    doc.text(`Total: ${data.total}`, 10, startY); */

    // Open the PDF in a new window
    window.open(doc.output("bloburl"));
  };

  return (
    <div>
      <button onClick={generatePDF}>Generar PDF</button>
    </div>
  );
};

export default TicketFactura;
