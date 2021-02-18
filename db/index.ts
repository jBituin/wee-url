import monk from 'monk';
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/wee-url';
export const db = monk(MONGODB_URI);
