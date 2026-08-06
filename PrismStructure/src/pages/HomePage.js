const { BasePage } = require('./BasePage');
const { expect } = require('@playwright/test');

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.productName = page.getByTestId('product-name');
    this.searchQuery = page.getByTestId('search-query');
    this.searchSubmit = page.getByTestId('search-submit');
  }

  async open() {
    await this.goto('/');
    await this.page.locator('[data-test^="product-"]').first().waitFor({ state: 'visible', timeout: 60_000 });
  }

  async expectCatalogVisible() {
    await this.page.locator('[data-test^="product-"]').first().waitFor({ state: 'visible' });
    await this.productName.first().waitFor({ state: 'visible' });
  }

  productCardById(productId) {
    return this.page.getByTestId(`product-${productId}`);
  }

  async openFirstInStockProduct() {
    const cards = this.page.locator('[data-test^="product-"]');
    const count = await cards.count();
    for (let i = 0; i < count; i += 1) {
      await cards.nth(i).click();
      await this.page.waitForLoadState('domcontentloaded');
      const addToCart = this.page.getByTestId('add-to-cart');
      const outOfStock = this.page.getByTestId('out-of-stock');
      if ((await outOfStock.count()) > 0) {
        await this.page.goBack({ waitUntil: 'domcontentloaded' });
        await cards.first().waitFor({ state: 'visible' });
        continue;
      }
      try {
        await addToCart.waitFor({ state: 'visible', timeout: 10_000 });
        await expect(addToCart).toBeEnabled({ timeout: 15_000 });
        return;
      } catch {
        await this.page.goBack({ waitUntil: 'domcontentloaded' });
        await cards.first().waitFor({ state: 'visible' });
      }
    }
    throw new Error('No in-stock product with enabled add-to-cart found on catalog');
  }

  async search(keyword) {
    await this.searchQuery.fill(keyword);
    await this.searchSubmit.click();
    await this.page.waitForLoadState('networkidle');
  }
}

module.exports = { HomePage };
