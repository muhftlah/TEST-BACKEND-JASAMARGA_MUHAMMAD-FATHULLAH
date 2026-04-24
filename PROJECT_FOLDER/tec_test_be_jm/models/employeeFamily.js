const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const EmployeeFamily = sequelize.define("employee_families", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  employee_id: { type: DataTypes.INTEGER, allowNull: false },
  name: DataTypes.STRING,
  identifier: DataTypes.STRING,
  job: DataTypes.STRING,
  place_of_birth: DataTypes.STRING,
  date_of_birth: DataTypes.DATEONLY,
  religion: DataTypes.STRING,
  is_life: DataTypes.BOOLEAN,
  is_divorced: DataTypes.BOOLEAN,
  relation_status: DataTypes.STRING,
  created_by: { type: DataTypes.STRING, defaultValue: "admin" },
  updated_by: { type: DataTypes.STRING },
}, {
  tableName: "employee_families",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
  hooks: {
    beforeUpdate: (instance) => {
      instance.updated_at = new Date();
      if (!instance.changed('updated_by') || !instance.updated_by) {
        instance.updated_by = "admin";
      }
    }
  }
});

module.exports = EmployeeFamily;
