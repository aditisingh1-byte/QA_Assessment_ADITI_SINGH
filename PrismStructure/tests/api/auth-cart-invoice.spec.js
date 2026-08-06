const { test, expect } = require('@playwright/test');
const { env } = require('../../src/config/env.config');
const { registerUser, loginUser } = require('../../src/api/auth.api');
const { getProducts } = require('../../src/api/products.api');
const { createCart, addProductToCart, getCart } = require('../../src/api/cart.api');
const { createInvoice } = require('../../src/api/invoices.api');
const { buildUserRegistrationPayload, buildInvoicePayload } = require('../../src/testdata/data.builders');
const { registerAndLogin, createEmptyCart } = require('../../src/helpers/api.helper');
const { getFirstInStockProductId } = require('../../src/helpers/products.helper');

const apiBase = () => env.apiBaseUrl;

test.describe('Toolshop API lifecycle', () => {
  test('@smoke TC-API-001 register new user with valid payload', async ({ request }) => {
    const payload = buildUserRegistrationPayload();
    const response = await registerUser(request, apiBase(), payload);
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.email).toBe(payload.email);
    expect(body.id).toBeTruthy();
  });

  test('@smoke TC-API-002 login returns bearer access token', async ({ request }) => {
    const payload = buildUserRegistrationPayload();
    const registerResponse = await registerUser(request, apiBase(), payload);
    expect(registerResponse.ok()).toBeTruthy();

    const loginResponse = await loginUser(
      request,
      apiBase(),
      payload.email,
      payload.password,
    );
    expect(loginResponse.status()).toBe(200);
    const loginBody = await loginResponse.json();
    expect(loginBody.access_token).toBeTruthy();
    expect(typeof loginBody.access_token).toBe('string');
  });

  test('@smoke TC-API-003 create cart with bearer token', async ({ request }) => {
    const { token } = await registerAndLogin(request, apiBase());
    const response = await createCart(request, apiBase(), token);
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.id || body.cart_id).toBeTruthy();
  });

  test('@regression TC-API-004 retrieve products list when authenticated', async ({ request }) => {
    const { token } = await registerAndLogin(request, apiBase());
    const response = await getProducts(request, apiBase(), token, 1);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);
    expect(body.data[0].id).toBeTruthy();
  });

  test('@regression TC-API-005 add in-stock product to cart', async ({ request }) => {
    const { token } = await registerAndLogin(request, apiBase());
    const { cartId } = await createEmptyCart(request, token, apiBase());
    const productId = await getFirstInStockProductId(request, apiBase(), token);

    const response = await addProductToCart(request, apiBase(), token, cartId, productId, 1);
    expect(response.ok()).toBeTruthy();
  });

  test('@regression TC-API-006 get cart reflects added line item', async ({ request }) => {
    const { token } = await registerAndLogin(request, apiBase());
    const { cartId } = await createEmptyCart(request, token, apiBase());
    const productId = await getFirstInStockProductId(request, apiBase(), token);
    await addProductToCart(request, apiBase(), token, cartId, productId, 2);

    const response = await getCart(request, apiBase(), token, cartId);
    expect(response.status()).toBe(200);
    const body = await response.json();
    const lines = body.cart_items || body.items || body.data || [];
    expect(lines.length).toBeGreaterThan(0);
    const line = lines.find((item) => (item.product_id || item.product?.id) === productId);
    expect(line).toBeTruthy();
  });

  test('@regression TC-API-007 generate COD invoice with assessment billing data', async ({
    request,
  }) => {
    const { token } = await registerAndLogin(request, apiBase());
    const { cartId } = await createEmptyCart(request, token, apiBase());
    const productId = await getFirstInStockProductId(request, apiBase(), token);
    await addProductToCart(request, apiBase(), token, cartId, productId, 1);

    const invoicePayload = buildInvoicePayload(cartId);
    const response = await createInvoice(request, apiBase(), token, invoicePayload);
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.invoice_number || body.id).toBeTruthy();
  });

  test('@regression TC-API-008 reject invoice when billing country and postal mismatch', async ({
    request,
  }) => {
    const { token } = await registerAndLogin(request, apiBase());
    const { cartId } = await createEmptyCart(request, token, apiBase());
    const productId = await getFirstInStockProductId(request, apiBase(), token);
    await addProductToCart(request, apiBase(), token, cartId, productId, 1);

    const invalidPayload = buildInvoicePayload(cartId, {
      billing_country: 'US',
      billing_postal_code: '1234AA',
    });
    const response = await createInvoice(request, apiBase(), token, invalidPayload);
    expect(response.status()).toBe(422);
  });
});
