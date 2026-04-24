const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
require("./models");
const employeeRoutes = require("./routes/employeeRoutes");
const employeeProfileRoutes = require("./routes/employeeProfileRoutes");
const employeeFamilyRoutes = require("./routes/employeeFamilyRoutes");
const employeeEducationRoutes = require("./routes/employeeEducationRoutes");

const app = express();
app.use(bodyParser.json());

app.use("/employees", employeeRoutes);
app.use("/employee-profiles", employeeProfileRoutes);
app.use("/employee-families", employeeFamilyRoutes);
app.use("/employee-educations", employeeEducationRoutes);

sequelize.sync()
  .then(() => {
    console.log("Database connected...");
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch(err => console.log(err));
