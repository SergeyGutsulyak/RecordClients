// src/database/index.ts
import { db } from './db';

export const getDBConnection = async () => {
  return db;
};