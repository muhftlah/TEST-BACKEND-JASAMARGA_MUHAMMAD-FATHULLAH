const employeeService = require("../services/employeeService");

// CREATE
exports.createEmployee = async (req, res) => {
  try {
    const result = await employeeService.createEmployee(req.body);
    res.status(201).json({
      message: "Employee created",
      id: result.id,
    });
  } catch (err) {
    console.error("Create Employee Error:", err);
    if (err.name === "SequelizeValidationError") {
      return res.status(400).json({ 
        message: "Validation error", 
        errors: err.errors.map(e => ({ field: e.path, message: e.message })) 
      });
    }
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ 
        message: "Unique constraint error", 
        errors: err.errors.map(e => ({ field: e.path, message: e.message })) 
      });
    }
    res.status(500).json({ error: err.message });
  }
};

// GET ALL
exports.getAllEmployee = async (req, res) => {
  try {
    const data = await employeeService.getAllEmployee();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ONE
exports.getEmployeeById = async (req, res) => {
  try {
    const data = await employeeService.getEmployeeById(req.params.id);
    res.json(data);
  } catch (err) {
    if (err.message === "NOT_FOUND") {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateEmployee = async (req, res) => {
  try {
    const success = await employeeService.updateEmployee(req.params.id, req.body);
    res.json({ message: "Update success", success });
  } catch (err) {
    if (err.message === "NOT_FOUND") {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.deleteEmployee = async (req, res) => {
  try {
    await employeeService.deleteEmployee(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    if (err.message === "NOT_FOUND") {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(500).json({ error: err.message });
  }
};

exports.getReport = async (req, res) => {
  try {
    const data = await employeeService.getEmployeeReport();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getReportById = async (req, res) => {
  try {
    const data = await employeeService.getEmployeeReportById(req.params.id);
    if (!data) return res.status(404).json({ message: "Employee not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
