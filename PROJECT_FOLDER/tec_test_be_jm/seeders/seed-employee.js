'use strict';

const now = new Date();

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('employees', [
      {
        id: 1,
        nik: '11012',
        name: 'Budi',
        is_active: true,
        start_date: new Date('2022-12-12'),
        end_date: new Date('2029-12-12'),
        created_at: now,
        updated_at: now,
      },
      {
        id: 2,
        nik: '11013',
        name: 'Jarot',
        is_active: true,
        start_date: new Date('2021-09-01'),
        end_date: new Date('2028-09-01'),
        created_at: now,
        updated_at: now,
      },
    ]);

    await queryInterface.bulkInsert('employee_profiles', [
      {
        id: 1,
        employee_id: 1,
        place_of_birth: 'Jakarta',
        date_of_birth: new Date('1997-05-02'),
        gender: 'Laki-Laki',
        is_married: true,
        prof_pict: null,
        created_at: now,
        updated_at: now,
      },
      {
        id: 2,
        employee_id: 2,
        place_of_birth: 'Sukabumi',
        date_of_birth: new Date('1996-05-02'),
        gender: 'Laki-Laki',
        is_married: true,
        prof_pict: null,
        created_at: now,
        updated_at: now,
      }
    ]);

    await queryInterface.bulkInsert('employee_families', [
      {
        id: 1,
        employee_id: 1,
        name: 'Marni',
        identifier: '32100594109960002',
        job: 'Ibu Rumah Tangga',
        relation_status: 'Istri',
        place_of_birth: 'Denpasar',
        date_of_birth: new Date('1995-10-17'),
        religion: 'Islam',
        is_life: true,
        is_divorced: false,
        created_at: now,
        updated_at: now,
      },
      {
        id: 2,
        employee_id: 1,
        name: 'Clara',
        identifier: '32100594109960004',
        job: 'Pelajar',
        place_of_birth: 'Bangkalan',
        date_of_birth: new Date('2008-10-17'),
        religion: 'Islam',
        is_life: true,
        is_divorced: false,
        relation_status: 'Anak',
        created_at: now,
        updated_at: now,
      },
      {
        id: 3,
        employee_id: 1,
        name: 'Stephanie',
        identifier: '32100594109960005',
        job: 'Pelajar',
        place_of_birth: 'Bangkalan',
        date_of_birth: new Date('2008-10-17'),
        religion: 'Islam',
        is_life: true,
        is_divorced: false,
        relation_status: 'Anak',
        created_at: now,
        updated_at: now,
      }
    ]);

    await queryInterface.bulkInsert('employee_educations', [
      {
        id: 1,
        employee_id: 1,
        name: 'SMK 7 Jakarta',
        level: 'SMA',
        description: 'Sekolah Menengah Atas 7 Jakarta',
        created_at: now,
        updated_at: now,
      },
      {
        id: 2,
        employee_id: 2,
        name: 'Universitas Negeri Jakarta',
        level: 'Strata 1',
        description: 'Sarjana',
        created_at: now,
        updated_at: now,
      },
    ]);

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('employee_educations', null, {});
    await queryInterface.bulkDelete('employee_families', null, {});
    await queryInterface.bulkDelete('employee_profiles', null, {});
    await queryInterface.bulkDelete('employees', null, {});
  }
};
