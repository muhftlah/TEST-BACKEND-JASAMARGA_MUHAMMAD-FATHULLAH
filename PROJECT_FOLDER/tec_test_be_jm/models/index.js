const Employee = require("./employee");
const EmployeeProfile = require("./employeeProfile");
const EmployeeFamily = require("./employeeFamily");
const EmployeeEducation = require("./employeeEducation");

Employee.hasOne(EmployeeProfile, {
  foreignKey: "employee_id",
  as: "profile",
});
EmployeeProfile.belongsTo(Employee, {
  foreignKey: "employee_id",
  as: "employee",
});

Employee.hasMany(EmployeeFamily, {
  foreignKey: "employee_id",
  as: "families",
});
EmployeeFamily.belongsTo(Employee, {
  foreignKey: "employee_id",
  as: "employee",
});

Employee.hasMany(EmployeeEducation, {
  foreignKey: "employee_id",
  as: "educations",
});
EmployeeEducation.belongsTo(Employee, {
  foreignKey: "employee_id",
  as: "employee",
});

module.exports = {
  Employee,
  EmployeeProfile,
  EmployeeFamily,
  EmployeeEducation,
};
