const { test, expect } = require('@playwright/test');
const { env } = require('../../src/config/env.config');
const { HomePage } = require('../../src/pages/HomePage');
const { LoginPage } = require('../../src/pages/LoginPage');
const { RegisterPage } = require('../../src/pages/RegisterPage');
const { ProductPage } = require('../../src/pages/ProductPage');
const { CartPage } = require('../../src/pages/CartPage');
const { CheckoutPage } = require('../../src/pages/CheckoutPage');
const { AccountPage } = require('../../src/pages/AccountPage');

test.setTimeout(120_000);

function requireDemoCredentials() {
  if (!env.demoUserEmail || !env.demoUserPassword) {
    throw new Error('Set DEMO_USER_EMAIL and DEMO_USER_PASSWORD in PrismStructure/.env');
  }
  return { email: env.demoUserEmail, password: env.demoUserPassword };
}

test.describe('Toolshop UI flows', () => {
  test('@smoke TC-UI-001 home page displays product catalog', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();
    await home.expectCatalogVisible();
    await expect(page.getByTestId('product-name').first()).toBeVisible();
  });

  test('@smoke TC-UI-002 valid user can log in', async ({ page }) => {
    const { email, password } = requireDemoCredentials();
    const login = new LoginPage(page);
    await login.login(email, password);
    await expect(page).not.toHaveURL(/auth\/login/);
  });

  test('@smoke TC-UI-003 add in-stock product to cart', async ({ page }) => {
    const { email, password } = requireDemoCredentials();
    const login = new LoginPage(page);
    const home = new HomePage(page);
    const product = new ProductPage(page);

    await login.login(email, password);
    await home.open();
    await home.openFirstInStockProduct();
    await product.addToCartAndWait();
    await expect(page.getByRole('menuitem', { name: /cart/i })).toContainText('1');
  });

  test('@regression TC-UI-004 register login and verify profile email', async ({ page }) => {
    const register = new RegisterPage(page);
    const account = new AccountPage(page);
    const user = register.buildUiUser();

    await register.register(user);
    const login = new LoginPage(page);
    await login.login(user.email, user.password);
    await account.openProfile();
    await account.expectProfileFirstName(user.firstName);
  });

  test('@regression TC-UI-005 API COD invoice then UI My Invoices lists order', async ({
    page,
    request,
  }) => {
    test.setTimeout(180_000);
    const { env } = require('../../src/config/env.config');
    const { registerAndLogin, createEmptyCart } = require('../../src/helpers/api.helper');
    const { getFirstInStockProductId } = require('../../src/helpers/products.helper');
    const { addProductToCart } = require('../../src/api/cart.api');
    const { createInvoice } = require('../../src/api/invoices.api');
    const { buildInvoicePayload } = require('../../src/testdata/data.builders');

    const { token, registrationPayload } = await registerAndLogin(request, env.apiBaseUrl);
    const { cartId } = await createEmptyCart(request, token, env.apiBaseUrl);
    const productId = await getFirstInStockProductId(request, env.apiBaseUrl, token);
    await addProductToCart(request, env.apiBaseUrl, token, cartId, productId, 1);
    const invoiceResponse = await createInvoice(
      request,
      env.apiBaseUrl,
      token,
      buildInvoicePayload(cartId),
    );
    expect(invoiceResponse.status()).toBe(201);

    const login = new LoginPage(page);
    const account = new AccountPage(page);
    await login.login(registrationPayload.email, registrationPayload.password);
    await account.openInvoices();
    await account.expectInvoiceListed();
  });

  test('@regression TC-UI-006 invalid login shows error and stays on login', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await login.email.fill('invalid.user@example.com');
    await login.password.fill('WrongPass1!');
    await login.submit.click();
    await expect(page).toHaveURL(/auth\/login/);
    await expect(page.getByText(/invalid email or password|incorrect|credentials/i)).toBeVisible();
  });

  test('@regression TC-UI-007 search returns matching products', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();
    await home.search('Pliers');
    await expect(page.getByTestId('product-name').filter({ hasText: /pliers/i }).first()).toBeVisible();
  });

  test('@regression TC-UI-008 update quantity on product detail before add to cart', async ({
    page,
  }) => {
    const { email, password } = requireDemoCredentials();
    const login = new LoginPage(page);
    const home = new HomePage(page);
    const product = new ProductPage(page);

    await login.login(email, password);
    await home.open();
    await home.openFirstInStockProduct();
    await product.setQuantity(2);
    await expect(product.quantity).toHaveValue('2');
  });
});
