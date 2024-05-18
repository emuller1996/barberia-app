import jsonwebtoken from "jsonwebtoken";

const validateToken = (req, res, next) => {
  const accessToken = req.headers["access-token"];
  if (!accessToken)
    return res
      .status(403)
      .json({ message: "ACCES DENIED: TOKEN NO SUMINISTRADO." });
  jsonwebtoken.verify(accessToken, process.env.SECRECT_KEY, (err, user) => {
    if (err) {
      return res
        .status(405)
        .json({ message: "ERROR-> TOKEN EXPIRED OR INCORRECT" });
    } else {
      next();
    }
  });
};

export { validateToken };
