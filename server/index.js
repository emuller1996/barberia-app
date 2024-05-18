import server from "./src/app.js";


server.listen(process.env.PORT, () => {
  console.log(process.env.PORT);
  console.log(`Server listening at port ${process.env.PORT}`); // eslint-disable-line no-console
});
