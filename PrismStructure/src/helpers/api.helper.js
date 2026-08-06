const { env } = require('../config/env.config');
const { registerUser, loginUser } = require('../api/auth.api');
const { createCart } = require('../api/cart.api');
const { buildUserRegistrationPayload } = require('../testdata/data.builders');

/**
 * Register, login, and return { token, user, registrationPayload }.
 * @param {import('@playwright/test').APIRequestContext} request
 */
async function registerAndLogin(request, baseURL = env.apiBaseUrl) {
  const registrationPayload = buildUserRegistrationPayload();
  const registerResponse = await registerUser(request, baseURL, registrationPayload);
  if (!registerResponse.ok()) {
    throw new Error(`Register failed: ${registerResponse.status()} ${await registerResponse.text()}`);
  }

  const loginResponse = await loginUser(
    request,
    baseURL,
    registrationPayload.email,
    registrationPayload.password,
  );
  if (!loginResponse.ok()) {
    throw new Error(`Login failed: ${loginResponse.status()} ${await loginResponse.text()}`);
  }

  const loginBody = await loginResponse.json();
  const token = loginBody.access_token;
  if (!token) {
    throw new Error('Login response missing access_token');
  }

  return { token, registrationPayload, user: await registerResponse.json() };
}

/**
 * @param {import('@playwright/test').APIRequestContext} request
 */
async function createEmptyCart(request, token, baseURL = env.apiBaseUrl) {
  const response = await createCart(request, baseURL, token);
  if (!response.ok()) {
    throw new Error(`Create cart failed: ${response.status()} ${await response.text()}`);
  }
  const body = await response.json();
  const cartId = body.id || body.cart_id;
  if (!cartId) {
    throw new Error('Create cart response missing cart id');
  }
  return { cartId, body };
}

module.exports = { registerAndLogin, createEmptyCart };
