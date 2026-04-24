const { EmployeeFamily, Employee } = require("../models");

// CREATE
exports.createFamily = async (payload) => {
  const { employee_id } = payload;
  const employee = await Employee.findByPk(employee_id);
  if (!employee) throw new Error("EMPLOYEE_NOT_FOUND");
  return await EmployeeFamily.create(payload);
};

// GET ALL
exports.getAllFamilies = async () => {
  return await EmployeeFamily.findAll({
    include: [{ model: Employee, as: "employee" }],
  });
};

// GET ONE BY ID
exports.getFamilyById = async (id) => {
  const data = await EmployeeFamily.findByPk(id, {
    include: [{ model: Employee, as: "employee" }],
  });
  if (!data) throw new Error("NOT_FOUND");
  return data;
};

// GET BY EMPLOYEE ID
exports.getFamiliesByEmployeeId = async (employeeId) => {
  return await EmployeeFamily.findAll({
    where: { employee_id: employeeId },
    include: [{ model: Employee, as: "employee" }],
  });
};

// UPDATE
exports.updateFamily = async (id, payload) => {
  const family = await EmployeeFamily.findByPk(id);
  if (!family) throw new Error("NOT_FOUND");
  await family.update(payload);
  return family;
};

// DELETE
exports.deleteFamily = async (id) => {
  const family = await EmployeeFamily.findByPk(id);
  if (!family) throw new Error("NOT_FOUND");
  await family.destroy();
  return true;
};
