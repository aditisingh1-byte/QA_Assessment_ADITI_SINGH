const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const env = {
  uiBaseUrl: process.env.UI_BASE_URL || 'https://practicesoftwaretesting.com',
  apiBaseUrl: process.env.API_BASE_URL || 'https://api.practicesoftwaretesting.com',
};

module.exports = { env };
