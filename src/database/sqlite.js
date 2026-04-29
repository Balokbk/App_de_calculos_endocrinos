// Aqui fica a logica de CRUD usando o SQLite, coisa bem básica

import { Platform } from 'react-native';

let SQLite;

if (Platform.OS !== 'web') {
  SQLite = require('expo-sqlite');
}

const db = Platform.OS !== 'web'
  ? SQLite.openDatabaseSync('app.db')
  : null;

export function initDB() {
  // Esse drop apenas serve para testes!
  db.execSync(`DROP TABLE IF EXISTS calculations;`);
  
  db.execSync(`
    CREATE TABLE IF NOT EXISTS calculations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT NOT NULL,
        title TEXT,
        data TEXT NOT NULL,
        result TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

export function saveCalculation({ type, title, data, result }) {
    if (!db) return;
  db.runSync(
    `INSERT INTO calculations (type, title, data, result)
     VALUES (?, ?, ?, ?)`,
    [
      type,
      title || '',
      JSON.stringify(data),
      result
    ]
  );
}

export function getAllCalculations() {
  if (!db) return [];
  return db.getAllSync(
    `SELECT * FROM calculations ORDER BY created_at DESC`
  );
}

export function getCalculationsByType(type) {
  if (!db) return [];
  return db.getAllSync(
    `SELECT * FROM calculations WHERE type = ? ORDER BY created_at DESC`,
    [type]
  );
}

export function updateCalculationTitle(id, title) {
  if (!db) return;
  db.runSync(
    `UPDATE calculations SET title = ? WHERE id = ?`,
    [title, id]
  )
}

export function deleteCalculation(id) {
    if (!db) return;
  db.runSync(
    `DELETE FROM calculations WHERE id = ?`,
    [id]
  );
}