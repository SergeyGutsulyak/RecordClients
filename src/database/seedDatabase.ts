// src/database/seedDatabase.ts
import { SQLiteDatabase } from 'expo-sqlite';
import { mockAppointments } from './fixtures/AppointmentFixtures';

let seeded = false;

export const seedDatabase = async (db: SQLiteDatabase) => {
  if (seeded) return;

  try {
    // Проверяем, есть ли записи
    const countResult = await db.getFirstAsync<{ count: number }>(
      'SELECT COUNT(*) AS count FROM appointments'
    );

    const existingCount = countResult?.count ?? 0;

    if (existingCount === 0) {
      for (const appt of mockAppointments) {
        const id = `appt_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

        await db.runAsync(
          'INSERT INTO appointments (id, title, date, start, duration, clientId, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [id, appt.title, appt.date, appt.start, appt.duration, appt.clientId, appt.status]
        );
      }
    }

    seeded = true;
  } catch (e) {
    console.error('Ошибка при заполнении БД:', e);
  }
};