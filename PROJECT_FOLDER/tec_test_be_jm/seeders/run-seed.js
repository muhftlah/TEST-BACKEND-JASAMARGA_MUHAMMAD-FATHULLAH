'use strict';

const sequelize = require('../config/database');
const seed = require('./seed-employee');

async function waitForDb(retries = 10, delayMs = 3000) {
  for (let i = 1; i <= retries; i++) {
    try {
      await sequelize.authenticate();
      console.log('✅ Koneksi database berhasil.');
      return;
    } catch (err) {
      console.log(`⏳ Database belum siap (percobaan ${i}/${retries}): ${err.message}`);
      if (i === retries) throw new Error('❌ Database tidak dapat dijangkau setelah beberapa percobaan.');
      await new Promise(res => setTimeout(res, delayMs));
    }
  }
}

async function isAlreadySeeded() {
  const queryInterface = sequelize.getQueryInterface();
  try {
    const [rows] = await sequelize.query('SELECT COUNT(*) as count FROM employees');
    return parseInt(rows[0].count) > 0;
  } catch {
    return false;
  }
}

async function runSeed() {
  try {
    await waitForDb();

    const alreadySeeded = await isAlreadySeeded();
    if (alreadySeeded) {
      console.log('⚠️  Data sudah ada di database. Seeder dilewati.');
      console.log('💡 Jalankan "docker compose down -v" lalu "docker compose up -d --build" untuk reset data.');
      return;
    }

    const queryInterface = sequelize.getQueryInterface();
    console.log('⏳ Menjalankan seeder...');
    await seed.up(queryInterface, sequelize.constructor);
    console.log('✅ Seeder berhasil dijalankan!');
  } catch (error) {
    console.error('❌ Gagal menjalankan seeder:', error.message);
    if (error.errors) {
      error.errors.forEach(e => console.error('  -', e.message));
    }
    process.exit(1);
  } finally {
    await sequelize.close();
  }
}

runSeed();
