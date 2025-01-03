const express = require("express");
const cors = require("cors");
const path = require("path");
const config = require("./src/config");
const errorMiddleware = require("./src/middlewares/error.middleware");
const router = require("./src/routes");
const swaggerUI = require("swagger-ui-express");
const swagger = require("./swagger");
const { engine } = require("express-handlebars");
const app = express();
 
//* connectDB
require("./src/database");

//* middleware
app.use(cors({
  origin: '*',  
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

//* routes
app.use("/api", router);

//* template-engine
app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "./src/views"));

app.get("/", async (req, res) => {
  res.render("home");
});

//* swagger-ui
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swagger));
app.use(
  "/swagger-ui",
  express.static(path.join(__dirname, "node_modules/swagger-ui-dist"))
);

//* error-handling
app.use(errorMiddleware);

//* server-setup
app.listen(config.port, () => {
  console.log(`Application is running on http://localhost:${config.port}`);
});
