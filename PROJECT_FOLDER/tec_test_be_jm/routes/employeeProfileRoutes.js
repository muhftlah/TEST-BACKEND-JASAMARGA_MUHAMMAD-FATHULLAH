const express = require("express");
const router = express.Router();
const controller = require("../controllers/employeeProfileController");

router.post("/", controller.createProfile);
router.get("/", controller.getAllProfiles);
router.get("/employee/:employeeId", controller.getProfileByEmployeeId);
router.get("/:id", controller.getProfileById);
router.put("/:id", controller.updateProfile);
router.delete("/:id", controller.deleteProfile);

module.exports = router;
