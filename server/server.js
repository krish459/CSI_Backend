require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bp = require("body-parser");
const db = require("./db");
const app = express();
const passport = require("passport");
const port = process.env.PORT || 8000;
const fileUpload = require('express-fileupload')

// npm install swagger-ui-express swagger-jsdoc 
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Finance App",
      version: "1.0.0",
    },
    servers: [
      {
        // url: "http://localhost:5000/",
        url: "https://csibackend-production.up.railway.app/", 
      },
    ],
  },
  apis: ["./server.js", "./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use(express.json());
app.use(cors());
app.use(bp.json());
app.use(passport.initialize());

require("./middlewares/passport")(passport);

// user router middleware
app.use(fileUpload({
  useTempFiles: true
}))
app.use("/api/users", require("./routes/userRoute"));
app.use("/api/items", require("./routes/itemRoute"));
app.use("/api/transactions", require("./routes/transactionRoute"));
app.use("/api/accounts", require("./routes/accountRoute"));
app.use("/api/pps", require("./routes/plannedRoute"));


/**
 * @swagger
 * /:
 *  get:
 *    summary: This api is used to check if get method is working or not
 *    description: This api is used to check if get method is working or not
 *    responses:
 *         200:
 *             description: To test Get method
 *
 */

app.get("/", (req, res) => {
  res.send("Server working !!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


