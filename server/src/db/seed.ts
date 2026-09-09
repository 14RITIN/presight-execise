import { faker } from '@faker-js/faker';

import { db } from './database';

const SEED = 12345;
const USER_COUNT = 10000;

const hobbies = [
  'Reading',
  'Running',
  'Cycling',
  'Photography',
  'Gaming',
  'Cooking',
  'Swimming',
  'Hiking',
  'Travel',
  'Football',
  'Music',
  'Yoga',
  'Drawing',
  'Gardening',
  'Chess',
  'Fishing',
  'Basketball',
  'Tennis',
  'Camping',
  'Dancing',
];

const nationalities = [
  'Indian',
  'Emirati',
  'British',
  'American',
  'Canadian',
  'Australian',
  'German',
  'French',
  'Italian',
  'Spanish',
  'Brazilian',
  'Japanese',
  'Chinese',
  'South Korean',
  'South African',
];

faker.seed(SEED);

const seed = db.transaction(() => {
  db.prepare('DELETE FROM user_hobbies').run();
  db.prepare('DELETE FROM hobbies').run();
  db.prepare('DELETE FROM users').run();

  db.prepare("DELETE FROM sqlite_sequence WHERE name = 'users'").run();
  db.prepare("DELETE FROM sqlite_sequence WHERE name = 'hobbies'").run();

  const insertHobby = db.prepare(`
    INSERT INTO hobbies (name)
    VALUES (?)
  `);

  const hobbyIds = hobbies.map((hobby) => {
    const result = insertHobby.run(hobby);
    return Number(result.lastInsertRowid);
  });

  const insertUser = db.prepare(`
    INSERT INTO users (
      avatar,
      first_name,
      last_name,
      age,
      nationality
    )
    VALUES (?, ?, ?, ?, ?)
  `);

  const insertUserHobby = db.prepare(`
    INSERT INTO user_hobbies (user_id, hobby_id)
    VALUES (?, ?)
  `);

  for (let i = 0; i < USER_COUNT; i += 1) {
    const result = insertUser.run(
      faker.image.avatar(),
      faker.person.firstName(),
      faker.person.lastName(),
      faker.number.int({ min: 18, max: 80 }),
      faker.helpers.arrayElement(nationalities),
    );

    const userId = Number(result.lastInsertRowid);

    const selectedHobbies = faker.helpers.arrayElements(
      hobbyIds,
      faker.number.int({ min: 0, max: 10 }),
    );

    for (const hobbyId of selectedHobbies) {
      insertUserHobby.run(userId, hobbyId);
    }
  }
});

seed();

console.log(`Database seeded successfully.`);
console.log(`Users: ${USER_COUNT}`);
console.log(`Seed: ${SEED}`);