import { Router } from "express";
import jsonwebtoken from "jsonwebtoken";
import md5 from "md5";
import { client } from "../ClienteElasticSearch.js";
import jwtDecode from "jwt-decode";
import { validateToken } from "../utils/authjws.js";

const authRouter = Router();

authRouter.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = md5(req.body.password);

  console.log(req.body);
  const result = await client.search({
    index: "sistemabarberia", // Reemplaza con el nombre de tu índice
    body: {
      query: {
        bool: {
          must: [
            { term: { "email.keyword": username } },
            { term: { "password.keyword": password } },
            /* {
              range: {
                sale_date: {
                  gte: new Date(startOfDay).getTime(),
                  lte: new Date(endOfDay).getTime()
                }
              }
            } */
          ],
        },
      },
    },
  });

  if (result.body.hits.total.value > 0) {
    delete result.body.hits.hits[0]._source.password
    const accessToken = generateAccessToken({
      ...result.body.hits.hits[0]._source,
      _id: result.body.hits.hits[0]._id,
    });
    return res.header("authorization", accessToken).json({
      message: "USUARIO AUTENTICADO",
      token: accessToken,
    });
  } else {
    return res.status(403).json({ message: "Cliente no Registrado" });
  }

  /* try {
    const accessToken = generateAccessToken(userDb.dataValues);
    return res.header("authorization", accessToken).json({
      message: "USUARIO AUTENTICADO",
      token: accessToken,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error Generando Token" });
  } */
});

authRouter.get("/get-user/", validateToken, (req, res) => {
    const token = req.headers[`access-token`];
    try {
      const decoded = jwtDecode(token);
      return res.status(200).json(decoded);
    } catch (error) {
      console.log(error);
    }
  });
const generateAccessToken = (user) => {
  return jsonwebtoken.sign(user, process.env.SECRECT_KEY, { expiresIn: "6h" });
};

export default authRouter;
