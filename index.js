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
const connectDB = require("./src/database");
connectDB().catch(err => console.error(err));

//* middleware
app.use(cors({
  origin: '*',  
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

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

app.get("/", swaggerUI.setup(swagger));

//* swagger-ui
app.use("/", swaggerUI.serve, swaggerUI.setup(swagger));
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
 