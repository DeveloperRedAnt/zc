module.exports = {
  // Use npx to ensure Biome is available
  '**/*.{js,jsx,ts,tsx}': [
    'npx @biomejs/biome format --write .',
    'npx @biomejs/biome check --apply-unsafe',
  ],
};
