const { getProducts } = require('../api/products.api');

/**
 * @param {import('@playwright/test').APIRequestContext} request
 * @param {string} baseURL
 * @param {string} token
 */
async function getFirstInStockProductId(request, baseURL, token) {
  const response = await getProducts(request, baseURL, token, 1);
  if (!response.ok()) {
    throw new Error(`GET products failed: ${response.status()} ${await response.text()}`);
  }
  const body = await response.json();
  const product = (body.data || []).find((p) => p.in_stock === true);
  if (!product) {
    throw new Error('No in-stock product found on page 1');
  }
  return product.id;
}

module.exports = { getFirstInStockProductId };
