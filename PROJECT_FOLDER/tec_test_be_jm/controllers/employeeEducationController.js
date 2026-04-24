const educationService = require("../services/employeeEducationService");

// CREATE
exports.createEducation = async (req, res) => {
  try {
    const result = await educationService.createEducation(req.body);
    res.status(201).json({ message: "Education record created", data: result });
  } catch (err) {
    if (err.message === "EMPLOYEE_NOT_FOUND")
      return res.status(404).json({ message: "Employee not found" });
    res.status(500).json({ error: err.message });
  }
};

// GET ALL
exports.getAllEducations = async (req, res) => {
  try {
    const data = await educationService.getAllEducations();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ONE BY ID
exports.getEducationById = async (req, res) => {
  try {
    const data = await educationService.getEducationById(req.params.id);
    res.json(data);
  } catch (err) {
    if (err.message === "NOT_FOUND")
      return res.status(404).json({ message: "Education record not found" });
    res.status(500).json({ error: err.message });
  }
};

// GET BY EMPLOYEE ID
exports.getEducationsByEmployeeId = async (req, res) => {
  try {
    const data = await educationService.getEducationsByEmployeeId(req.params.employeeId);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateEducation = async (req, res) => {
  try {
    const result = await educationService.updateEducation(req.params.id, req.body);
    res.json({ message: "Education record updated", data: result });
  } catch (err) {
    if (err.message === "NOT_FOUND")
      return res.status(404).json({ message: "Education record not found" });
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.deleteEducation = async (req, res) => {
  try {
    await educationService.deleteEducation(req.params.id);
    res.json({ message: "Education record deleted successfully" });
  } catch (err) {
    if (err.message === "NOT_FOUND")
      return res.status(404).json({ message: "Education record not found" });
    res.status(500).json({ error: err.message });
  }
};
