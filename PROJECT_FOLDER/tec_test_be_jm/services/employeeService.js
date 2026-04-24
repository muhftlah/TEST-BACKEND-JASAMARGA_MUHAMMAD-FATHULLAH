const sequelize = require("../config/database");
const {
  Employee,
  EmployeeProfile,
  EmployeeFamily,
  EmployeeEducation,
} = require("../models");

exports.createEmployee = async (payload) => {
  const t = await sequelize.transaction();
  try {
    const { profile, families, educations, ...employeeData } = payload;
    const employee = await Employee.create(employeeData, { transaction: t });
    if (profile) {
      await EmployeeProfile.create(
        { ...profile, employee_id: employee.id },
        { transaction: t }
      );
    }

    if (families?.length) {
      const familyData = families.map(f => ({
        ...f,
        employee_id: employee.id,
      }));
      await EmployeeFamily.bulkCreate(familyData, { transaction: t });
    }

    if (educations?.length) {
      const eduData = educations.map(e => ({
        ...e,
        employee_id: employee.id,
      }));
      await EmployeeEducation.bulkCreate(eduData, { transaction: t });
    }

    await t.commit();
    return employee;

  } catch (err) {
    await t.rollback();
    throw err;
  }
};

exports.getAllEmployee = async () => {
  return await Employee.findAll({
    include: [
      { model: EmployeeProfile, as: "profile" },
      { model: EmployeeFamily, as: "families" },
      { model: EmployeeEducation, as: "educations" },
    ],
  });
};

exports.getEmployeeById = async (id) => {
  const data = await Employee.findByPk(id, {
    include: [
      { model: EmployeeProfile, as: "profile" },
      { model: EmployeeFamily, as: "families" },
      { model: EmployeeEducation, as: "educations" },
    ],
  });
  if (!data) throw new Error("NOT_FOUND");
  return data;
};

exports.updateEmployee = async (id, payload) => {
  const t = await sequelize.transaction();
  try {
    const { profile, families, educations, ...employeeData } = payload;
    const employee = await Employee.findByPk(id, { transaction: t });
    if (!employee) throw new Error("NOT_FOUND");
    await employee.update(employeeData, { transaction: t });
    if (profile) {
      const existing = await EmployeeProfile.findOne({
        where: { employee_id: id },
        transaction: t,
      });
      if (existing) {
        await existing.update(profile, { transaction: t });
      } else {
        await EmployeeProfile.create(
          { ...profile, employee_id: id },
          { transaction: t }
        );
      }
    }
    if (families) {
      await EmployeeFamily.destroy({
        where: { employee_id: id },
        transaction: t,
      });
      const familyData = families.map(f => ({
        ...f,
        employee_id: id,
      }));
      await EmployeeFamily.bulkCreate(familyData, { transaction: t });
    }
    if (educations) {
      await EmployeeEducation.destroy({
        where: { employee_id: id },
        transaction: t,
      });
      const eduData = educations.map(e => ({
        ...e,
        employee_id: id,
      }));
      await EmployeeEducation.bulkCreate(eduData, { transaction: t });
    }
    await t.commit();
    return true;
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

exports.deleteEmployee = async (id) => {
  const t = await sequelize.transaction();
  try {
    const employee = await Employee.findByPk(id, { transaction: t });
    if (!employee) throw new Error("NOT_FOUND");
    await EmployeeEducation.destroy({ where: { employee_id: id }, transaction: t });
    await EmployeeFamily.destroy({ where: { employee_id: id }, transaction: t });
    await EmployeeProfile.destroy({ where: { employee_id: id }, transaction: t });
    await employee.destroy({ transaction: t });
    await t.commit();
    return true;
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

exports.getEmployeeReport = async () => {
  const [results] = await sequelize.query(`
    SELECT
        ep.employee_id,
        e.nik,
        e.name,
        e.is_active,
        ep.gender,
        ep.date_of_birth AS age,
        ee.name AS school_name,
        ee.level,
        fs.family_summary
      FROM employees e
      LEFT JOIN employee_profiles ep 
        ON e.id = ep.employee_id
      LEFT JOIN employee_educations ee
        ON e.id = ee.employee_id
      LEFT JOIN (
        SELECT
          employee_id,
          json_object_agg(relation_status, total) AS family_summary
        FROM (
          SELECT
            employee_id,
            relation_status,
            COUNT(*) AS total
          FROM employee_families
          GROUP BY employee_id, relation_status
        ) t
        GROUP BY employee_id
      ) fs 
        ON e.id = fs.employee_id
  `);

  return results;
};

exports.getEmployeeReportById = async (id) => {
  const results = await sequelize.query(`
    SELECT
        ep.employee_id,
        e.nik,
        e.name,
        e.is_active,
        ep.gender,
        ep.date_of_birth AS age,
        ee.name AS school_name,
        ee.level,
        fs.family_summary
      FROM employees e
      LEFT JOIN employee_profiles ep 
        ON e.id = ep.employee_id
      LEFT JOIN employee_educations ee
        ON e.id = ee.employee_id
      LEFT JOIN (
        SELECT
          employee_id,
          json_object_agg(relation_status, total) AS family_summary
        FROM (
          SELECT
            employee_id,
            relation_status,
            COUNT(*) AS total
          FROM employee_families
          GROUP BY employee_id, relation_status
        ) t
        GROUP BY employee_id
      ) fs 
        ON e.id = fs.employee_id
      WHERE e.id = :id
  `, {
    replacements: { id },
    type: sequelize.QueryTypes.SELECT,
  });

  return results?.[0] ?? null;
};

