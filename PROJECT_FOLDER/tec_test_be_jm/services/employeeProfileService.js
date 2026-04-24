const { EmployeeProfile, Employee } = require("../models");

// CREATE or UPDATE (upsert)
exports.createProfile = async (payload) => {
  const { employee_id } = payload;
  const employee = await Employee.findByPk(employee_id);
  if (!employee) throw new Error("EMPLOYEE_NOT_FOUND");

  const existing = await EmployeeProfile.findOne({ where: { employee_id } });
  if (existing) {
    await existing.update(payload);
    return { action: "updated", data: existing };
  }

  const created = await EmployeeProfile.create(payload);
  return { action: "created", data: created };
};

// GET ALL
exports.getAllProfiles = async () => {
  return await EmployeeProfile.findAll({
    include: [{ model: Employee, as: "employee" }],
  });
};

// GET ONE BY ID
exports.getProfileById = async (id) => {
  const data = await EmployeeProfile.findByPk(id, {
    include: [{ model: Employee, as: "employee" }],
  });
  if (!data) throw new Error("NOT_FOUND");
  return data;
};

// GET BY EMPLOYEE ID
exports.getProfileByEmployeeId = async (employeeId) => {
  const data = await EmployeeProfile.findOne({
    where: { employee_id: employeeId },
    include: [{ model: Employee, as: "employee" }],
  });
  if (!data) throw new Error("NOT_FOUND");
  return data;
};

// UPDATE
exports.updateProfile = async (id, payload) => {
  const profile = await EmployeeProfile.findByPk(id);
  if (!profile) throw new Error("NOT_FOUND");
  await profile.update(payload);
  return profile;
};

// DELETE
exports.deleteProfile = async (id) => {
  const profile = await EmployeeProfile.findByPk(id);
  if (!profile) throw new Error("NOT_FOUND");
  await profile.destroy();
  return true;
};
