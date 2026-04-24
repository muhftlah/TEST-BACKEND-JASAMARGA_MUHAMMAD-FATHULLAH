const { EmployeeEducation, Employee } = require("../models");

// CREATE
exports.createEducation = async (payload) => {
  const { employee_id } = payload;
  const employee = await Employee.findByPk(employee_id);
  if (!employee) throw new Error("EMPLOYEE_NOT_FOUND");
  return await EmployeeEducation.create(payload);
};

// GET ALL
exports.getAllEducations = async () => {
  return await EmployeeEducation.findAll({
    include: [{ model: Employee, as: "employee" }],
  });
};

// GET ONE BY ID
exports.getEducationById = async (id) => {
  const data = await EmployeeEducation.findByPk(id, {
    include: [{ model: Employee, as: "employee" }],
  });
  if (!data) throw new Error("NOT_FOUND");
  return data;
};

// GET BY EMPLOYEE ID
exports.getEducationsByEmployeeId = async (employeeId) => {
  return await EmployeeEducation.findAll({
    where: { employee_id: employeeId },
    include: [{ model: Employee, as: "employee" }],
  });
};

// UPDATE
exports.updateEducation = async (id, payload) => {
  const education = await EmployeeEducation.findByPk(id);
  if (!education) throw new Error("NOT_FOUND");
  await education.update(payload);
  return education;
};

// DELETE
exports.deleteEducation = async (id) => {
  const education = await EmployeeEducation.findByPk(id);
  if (!education) throw new Error("NOT_FOUND");
  await education.destroy();
  return true;
};
