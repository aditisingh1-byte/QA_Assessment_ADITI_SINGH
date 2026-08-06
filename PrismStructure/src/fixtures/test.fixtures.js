const playwright = require('@playwright/test');
const { env } = require('../config/env.config');

const test = playwright.test.extend({
  apiBaseURL: async ({}, use) => {
    await use(env.apiBaseUrl);
  },
  uiBaseURL: async ({}, use) => {
    await use(env.uiBaseUrl);
  },
});

const expect = playwright.expect;

module.exports = { test, expect };
