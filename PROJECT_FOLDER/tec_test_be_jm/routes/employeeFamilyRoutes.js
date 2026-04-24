const express = require("express");
const router = express.Router();
const controller = require("../controllers/employeeFamilyController");

router.post("/", controller.createFamily);
router.get("/", controller.getAllFamilies);
router.get("/employee/:employeeId", controller.getFamiliesByEmployeeId);
router.get("/:id", controller.getFamilyById);
router.put("/:id", controller.updateFamily);
router.delete("/:id", controller.deleteFamily);

module.exports = router;
