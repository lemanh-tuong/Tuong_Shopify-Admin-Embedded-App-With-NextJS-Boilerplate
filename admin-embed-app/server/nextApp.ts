import next from 'next';
import dotenv from 'dotenv';

dotenv.config();

const dev = process.env.NODE_ENV !== 'production';

export const nextApp = next({
  dev,
});
