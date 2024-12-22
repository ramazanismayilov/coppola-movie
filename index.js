const express = require("express");
const cors = require("cors");
const path = require("path");
const config = require("./src/config");
const errorMiddleware = require("./src/middlewares/error.middleware");
const router = require("./src/routes");
const swaggerUI = require("swagger-ui-express");
const swagger = require("./swagger");
const app = express();

require("./src/database");

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "./public")));

app.use("/api", router);

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swagger));
app.use(
  "/swagger-ui",
  express.static(path.join(__dirname, "node_modules/swagger-ui-dist"))
);

app.use(errorMiddleware);

app.listen(config.port, () => {
  console.log(`Application is running on http://localhost:${config.port}`);
});
