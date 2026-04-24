const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const EmployeeProfile = sequelize.define("employee_profiles", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  employee_id: { type: DataTypes.INTEGER, allowNull: false },
  place_of_birth: DataTypes.STRING,
  date_of_birth: DataTypes.DATEONLY,
  gender: DataTypes.STRING,
  is_married: DataTypes.BOOLEAN,
  prof_pict: DataTypes.STRING,
  created_by: { type: DataTypes.STRING, defaultValue: "admin" },
  updated_by: { type: DataTypes.STRING },
}, {
  tableName: "employee_profiles",
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

module.exports = EmployeeProfile;
