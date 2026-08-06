/**
 * @param {import('@playwright/test').APIRequestContext} request
 * @param {string} baseURL
 * @param {string} token
 */
async function createCart(request, baseURL, token) {
  return request.post(`${baseURL}/carts`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

/**
 * @param {import('@playwright/test').APIRequestContext} request
 * @param {string} baseURL
 * @param {string} token
 * @param {string} cartId
 * @param {string} productId
 * @param {number} quantity
 */
async function addProductToCart(request, baseURL, token, cartId, productId, quantity = 1) {
  return request.post(`${baseURL}/carts/${cartId}`, {
    headers: { Authorization: `Bearer ${token}` },
    data: { product_id: productId, quantity },
  });
}

/**
 * @param {import('@playwright/test').APIRequestContext} request
 * @param {string} baseURL
 * @param {string} token
 * @param {string} cartId
 */
async function getCart(request, baseURL, token, cartId) {
  return request.get(`${baseURL}/carts/${cartId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

module.exports = { createCart, addProductToCart, getCart };
