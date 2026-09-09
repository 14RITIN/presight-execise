import Database from 'better-sqlite3';
import path from 'node:path';

const databasePath = path.resolve(__dirname, '../../data/app.db');

export const db = new Database(databasePath);

db.pragma('foreign_keys = ON');