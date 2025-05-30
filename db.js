import Database from 'better-sqlite3';

const db = new Database('notes.db');

db.prepare(`
  CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL
  )
`).run();

const count = db.prepare('SELECT COUNT(*) as count FROM notes').get().count;
if (count === 0) {
  const insert = db.prepare('INSERT INTO notes (title, content) VALUES (?, ?)');
  insert.run('Első jegyzet', 'Ez az első jegyzet tartalma.');
  insert.run('Második jegyzet', 'Ez a második jegyzet.');
  insert.run('Jegyzet a boltlistáról', 'Kenyér, tej, vaj.');
  insert.run('Meeting jegyzet', 'Tervek a Q3-ra, határidők és feladatok.');
}

export default db;

