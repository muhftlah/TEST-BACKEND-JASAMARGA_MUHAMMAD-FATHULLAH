const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
require("./models");
const employeeRoutes = require("./routes/employeeRoutes");

const app = express();
app.use(bodyParser.json());

app.use("/employees", employeeRoutes);

sequelize.sync()
  .then(() => {
    console.log("Database connected...");
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch(err => console.log(err));
