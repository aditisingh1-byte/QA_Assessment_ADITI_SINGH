// @ts-check
const { defineConfig, devices } = require('@playwright/test');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const uiBaseURL = process.env.UI_BASE_URL || 'https://practicesoftwaretesting.com';
const apiBaseURL = process.env.API_BASE_URL || 'https://api.practicesoftwaretesting.com';

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'reports/html', open: 'never' }],
    ['json', { outputFile: 'reports/test-results.json' }],
  ],
  use: {
    baseURL: uiBaseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    testIdAttribute: 'data-test',
  },
  projects: [
    {
      name: 'api',
      testMatch: /tests\/api\/.*\.spec\.js/,
      use: {
        baseURL: apiBaseURL,
      },
    },
    {
      name: 'ui',
      testMatch: /tests\/ui\/.*\.spec\.js/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: uiBaseURL,
      },
    },
    {
      name: 'scaffold',
      testMatch: /tests\/scaffold\.spec\.js/,
    },
  ],
});
