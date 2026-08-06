const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

class AccountPage extends BasePage {
  constructor(page) {
    super(page);
  }

  async openProfile() {
    const profileResponse = this.page.waitForResponse(
      (response) => response.url().includes('/users/') && response.request().method() === 'GET',
    );
    await this.goto('/account/profile');
    await profileResponse.catch(() => {});
    await this.page.waitForLoadState('networkidle');
  }

  async openInvoices() {
    await this.goto('/account/invoices');
    await this.page.waitForLoadState('networkidle');
  }

  async expectLoggedInUser(firstName) {
    await expect(
      this.page.getByRole('menubar', { name: /Main menu/i }).getByRole('button', { name: new RegExp(firstName, 'i') }),
    ).toBeVisible({ timeout: 30_000 });
  }

  async expectProfileFirstName(firstName) {
    await expect(this.page.getByTestId('first-name')).toHaveValue(firstName, { timeout: 60_000 });
  }

  async expectInvoiceListed() {
    await this.page
      .locator('[data-test^="invoice-"], table tbody tr')
      .first()
      .waitFor({ state: 'visible', timeout: 60_000 });
  }
}

module.exports = { AccountPage };
