#!/bin/sh
set -e

IS_NEW_DATABASE=false

if [ ! -f /app/data/app.db ]; then
  IS_NEW_DATABASE=true
fi

npm run db:init

if [ "$IS_NEW_DATABASE" = "true" ]; then
  echo "New database detected. Seeding..."
  npm run db:seed
fi

exec npm start