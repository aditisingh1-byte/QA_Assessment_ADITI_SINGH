const { BasePage } = require('./BasePage');

class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.navCart = page.getByTestId('nav-cart');
  }

  async open() {
    await this.goto('/cart');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async goToCheckout() {
    const cartLink = this.page.getByRole('menuitem', { name: /cart/i }).getByRole('link');
    await cartLink.click();
    await this.page.waitForURL(/checkout/, { timeout: 60_000 });
  }
}

module.exports = { CartPage };
