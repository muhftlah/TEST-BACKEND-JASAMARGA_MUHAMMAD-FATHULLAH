const express = require("express");
const router = express.Router();
const controller = require("../controllers/employeeEducationController");

router.post("/", controller.createEducation);
router.get("/", controller.getAllEducations);
router.get("/employee/:employeeId", controller.getEducationsByEmployeeId);
router.get("/:id", controller.getEducationById);
router.put("/:id", controller.updateEducation);
router.delete("/:id", controller.deleteEducation);

module.exports = router;
