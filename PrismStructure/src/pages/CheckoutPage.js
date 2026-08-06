const { BasePage } = require('./BasePage');
const checkoutData = require('../testdata/checkout.data.json');

class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);
    this.country = page.getByTestId('country');
    this.postalCode = page.getByTestId('postal_code');
    this.houseNumber = page.getByTestId('house_number');
    this.paymentMethod = page.getByTestId('payment-method');
    this.proceedButton = page.getByRole('button', { name: /^Proceed$/i });
  }

  async fillBillingIfNeeded() {
    const billing = checkoutData.uiBillingAddress;
    await this.country.waitFor({ state: 'attached', timeout: 60_000 });
    await this.country.selectOption(billing.country, { force: true });
    await this.postalCode.fill(billing.postal_code, { force: true });
    await this.houseNumber.fill(billing.house_number, { force: true });
    await this.page.waitForTimeout(2500);
  }

  async clickProceedIfVisible() {
    for (let attempt = 0; attempt < 45; attempt += 1) {
      if (
        (await this.proceedButton.isVisible().catch(() => false)) &&
        (await this.proceedButton.isEnabled().catch(() => false))
      ) {
        await this.proceedButton.click();
        return;
      }
      await this.page.waitForTimeout(1000);
    }
  }

  async selectCashOnDelivery() {
    await this.paymentMethod.waitFor({ state: 'attached', timeout: 30_000 });
    await this.paymentMethod.selectOption('cash-on-delivery', { force: true });
  }

  async completeCodCheckout() {
    await this.page.getByRole('button', { name: 'Proceed to checkout' }).click();
    await this.clickProceedIfVisible();
    await this.fillBillingIfNeeded();
    await this.clickProceedIfVisible();
    await this.selectCashOnDelivery();
    await this.clickProceedIfVisible();

    const confirm = this.page.getByRole('button', { name: /^Confirm$/i });
    await confirm.waitFor({ state: 'visible', timeout: 60_000 });
    await confirm.click();
    await this.page.getByText(/payment was successful/i).waitFor({ state: 'visible', timeout: 60_000 });
    await confirm.click();
  }
}

module.exports = { CheckoutPage };
