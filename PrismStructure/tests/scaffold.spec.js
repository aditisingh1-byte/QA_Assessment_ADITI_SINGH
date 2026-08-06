const { test, expect } = require('../src/fixtures/test.fixtures');
const { env } = require('../src/config/env.config');

test('@smoke framework loads Toolshop environment configuration', async () => {
  expect(env.uiBaseUrl).toMatch(/practicesoftwaretesting\.com/);
  expect(env.apiBaseUrl).toMatch(/api\.practicesoftwaretesting\.com/);
});
