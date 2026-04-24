const familyService = require("../services/employeeFamilyService");

// CREATE
exports.createFamily = async (req, res) => {
  try {
    const result = await familyService.createFamily(req.body);
    res.status(201).json({ message: "Family member created", data: result });
  } catch (err) {
    if (err.message === "EMPLOYEE_NOT_FOUND")
      return res.status(404).json({ message: "Employee not found" });
    res.status(500).json({ error: err.message });
  }
};

// GET ALL
exports.getAllFamilies = async (req, res) => {
  try {
    const data = await familyService.getAllFamilies();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ONE BY ID
exports.getFamilyById = async (req, res) => {
  try {
    const data = await familyService.getFamilyById(req.params.id);
    res.json(data);
  } catch (err) {
    if (err.message === "NOT_FOUND")
      return res.status(404).json({ message: "Family member not found" });
    res.status(500).json({ error: err.message });
  }
};

// GET BY EMPLOYEE ID
exports.getFamiliesByEmployeeId = async (req, res) => {
  try {
    const data = await familyService.getFamiliesByEmployeeId(req.params.employeeId);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateFamily = async (req, res) => {
  try {
    const result = await familyService.updateFamily(req.params.id, req.body);
    res.json({ message: "Family member updated", data: result });
  } catch (err) {
    if (err.message === "NOT_FOUND")
      return res.status(404).json({ message: "Family member not found" });
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.deleteFamily = async (req, res) => {
  try {
    await familyService.deleteFamily(req.params.id);
    res.json({ message: "Family member deleted successfully" });
  } catch (err) {
    if (err.message === "NOT_FOUND")
      return res.status(404).json({ message: "Family member not found" });
    res.status(500).json({ error: err.message });
  }
};
