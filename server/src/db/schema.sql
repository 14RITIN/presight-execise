CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  avatar TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  age INTEGER NOT NULL CHECK (age >= 0),
  nationality TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS hobbies (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS user_hobbies (
  user_id INTEGER NOT NULL,
  hobby_id INTEGER NOT NULL,

  PRIMARY KEY (user_id, hobby_id),

  FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,

  FOREIGN KEY (hobby_id)
    REFERENCES hobbies(id)
    ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_users_first_name
ON users(first_name);

CREATE INDEX IF NOT EXISTS idx_users_last_name
ON users(last_name);

CREATE INDEX IF NOT EXISTS idx_users_nationality
ON users(nationality);

CREATE INDEX IF NOT EXISTS idx_users_age
ON users(age);

CREATE INDEX IF NOT EXISTS idx_user_hobbies_hobby_id
ON user_hobbies(hobby_id);