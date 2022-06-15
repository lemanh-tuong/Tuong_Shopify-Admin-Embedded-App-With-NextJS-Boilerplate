module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint'],
  '**/*.ts?(x)': () => 'npm run build-types',
  '*.json': ['prettier --write'],
};
