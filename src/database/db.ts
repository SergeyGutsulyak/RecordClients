import { SQLiteDatabase } from 'expo-sqlite';
import * as SQLite from 'expo-sqlite';

let db: SQLiteDatabase;

export const getDB = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('calendar.db');
    await initializeDatabase(db);
  }
  return db;
};

const initializeDatabase = async (db: SQLiteDatabase) => {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS clients (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      phone TEXT,
      email TEXT
    );
    CREATE TABLE IF NOT EXISTS appointments (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      date TEXT NOT NULL,
      start TEXT NOT NULL,
      duration INTEGER NOT NULL,
      clientId TEXT,
      status TEXT NOT NULL
    );
  `);
};