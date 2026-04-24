const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Education = sequelize.define("employee_education", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  employee_id: { type: DataTypes.INTEGER, allowNull: false },
  name: DataTypes.STRING,
  level: DataTypes.STRING,
  description: DataTypes.TEXT,
  created_by: { type: DataTypes.STRING, defaultValue: "admin" },
  updated_by: { type: DataTypes.STRING },
}, {
  tableName: "employee_educations",
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

module.exports = Education;
