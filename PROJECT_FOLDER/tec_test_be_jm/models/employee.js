const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Employee = sequelize.define("employee", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nik: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
  start_date: { type: DataTypes.DATEONLY },
  end_date: { type: DataTypes.DATEONLY },
  created_by: { type: DataTypes.STRING, defaultValue: "admin" },
  updated_by: { type: DataTypes.STRING },
}, {
  tableName: "employees",
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

module.exports = Employee;
