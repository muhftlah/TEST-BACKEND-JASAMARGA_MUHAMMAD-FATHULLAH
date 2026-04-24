const express = require("express");
const router = express.Router();
const controller = require("../controllers/employeeController");

router.post("/", controller.createEmployee);
router.get("/", controller.getAllEmployee);

// Report harus SEBELUM /:id agar tidak tertangkap sebagai id
router.get("/report", controller.getReport);
router.get("/report/:id", controller.getReportById);

router.get("/:id", controller.getEmployeeById);
router.put("/:id", controller.updateEmployee);
router.delete("/:id", controller.deleteEmployee);

module.exports = router;
