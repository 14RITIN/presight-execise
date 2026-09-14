import fs from 'node:fs';
import path from 'node:path';
import Database from 'better-sqlite3';

const databasePath = path.resolve(__dirname, '../../data/app.db');

fs.mkdirSync(path.dirname(databasePath), {
  recursive: true,
});

export const db = new Database(databasePath);

db.pragma('foreign_keys = ON');