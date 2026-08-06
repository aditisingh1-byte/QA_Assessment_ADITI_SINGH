/**
 * @param {import('@playwright/test').APIRequestContext} request
 * @param {string} baseURL
 * @param {string} token
 */
async function getProducts(request, baseURL, token, page = 1) {
  return request.get(`${baseURL}/products`, {
    params: { page: String(page) },
    headers: { Authorization: `Bearer ${token}` },
  });
}

module.exports = { getProducts };
