const { BasePage } = require('./BasePage');

class ProductPage extends BasePage {
  constructor(page) {
    super(page);
    this.addToCart = page.getByTestId('add-to-cart');
    this.increaseQuantity = page.getByTestId('increase-quantity');
    this.quantity = page.getByTestId('quantity');
  }

  async addToCartAndWait() {
    await this.addToCart.click();
    await this.page
      .getByText(/product added to shopping cart/i)
      .waitFor({ state: 'visible', timeout: 30_000 })
      .catch(() => this.page.waitForTimeout(1500));
  }

  async setQuantity(targetQty) {
    const current = Number(await this.quantity.inputValue());
    const delta = targetQty - current;
    const button = delta > 0 ? this.increaseQuantity : this.page.getByTestId('decrease-quantity');
    for (let i = 0; i < Math.abs(delta); i += 1) {
      await button.click();
    }
  }
}

module.exports = { ProductPage };
