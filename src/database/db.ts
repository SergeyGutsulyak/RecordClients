// src/database/db.ts
import { SQLiteDatabase } from 'expo-sqlite';
import * as SQLite from 'expo-sqlite';

import { Appointment } from '../types/Appointment';
import { seedDatabase } from './seedDatabase';
import {groupAppointmentsByDay, formatMinutesToTime} from '../utils/calendar'
import { getWeekDates } from '../utils/calendar';

let db: SQLiteDatabase;

export const getDB = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('calendar.db');
    await initializeDatabase(db);
    await seedDatabase(db);
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

export const getAllAppointments = async (db: SQLiteDatabase): Promise<Appointment[]> => {
  try {
    const result = await db.getAllAsync<Appointment>(
      'SELECT * FROM appointments'
    );
    return result;
  } catch (e) {
    console.error('Ошибка при получении всех записей:', e);
    return [];
  }
};

export const getAppointmentsForDay = async (
  db: SQLiteDatabase,
  date: string
): Promise<Appointment[]> => {
  try {
    const result = await db.getAllAsync<Appointment>(
      'SELECT * FROM appointments WHERE date = ?', [date]
    );
    return result;
  } catch (e) {
    console.error(`Ошибка при получении записей за ${date}:`, e);
    return [];
  }
};

export const getAppointmentsForWeek = async (date: Date): Promise<Appointment[]> => {
  const days = getWeekDates(date); // получаем дни недели
  const dates = days.map(d => d.dateStr); // преобразуем в строки
  const db = await getDB();
  const placeholders = dates.map(() => '?').join(', ');
  const query = `SELECT * FROM appointments WHERE date IN (${placeholders})`;

  try {
    const result = await db.getAllAsync<Appointment>(query, dates);
    return result;
  } catch (e) {
    console.error('Ошибка при загрузке записей:', e);
    return [];
  }
  // Группируем по дням
  // return groupAppointmentsByDay(results);
};

export const addNewAppointment = async (
  db: SQLiteDatabase,
  date: string,
  startMinute: number
): Promise<Appointment | null> => {
  try {
    const id = `appt_${Date.now()}`;
    const start = formatMinutesToTime(startMinute);
    const duration = 30;
    const title = 'Новая запись';
    const status = 'pending';
    const clientId = null;
    const type = 'стрижка';

    await db.runAsync(
      'INSERT INTO appointments (id, title, type, date, start, duration, clientId, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [id, title, type, date, start, duration, clientId, status]
    );

    return {
      id,
      title,
      type,
      date,
      start,
      duration,
      clientId,
      status,
    };
  } catch (e) {
    console.error('Ошибка при добавлении новой записи:', e);
    return null;
  }
};

export const updateAppointmentStart = async (
  db: SQLiteDatabase,
  appointmentId: string,
  newStart: string
): Promise<void> => {
  try {
    await db.runAsync(
      'UPDATE appointments SET start = ? WHERE id = ?',
      [newStart, appointmentId]
    );
    console.log(`Запись ${appointmentId} обновлена на ${newStart}`);
  } catch (e) {
    console.error(`Ошибка при обновлении записи ${appointmentId}:`, e);
  }
};