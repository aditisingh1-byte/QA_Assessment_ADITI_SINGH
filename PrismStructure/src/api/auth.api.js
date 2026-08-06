/**
 * @param {import('@playwright/test').APIRequestContext} request
 * @param {string} baseURL
 */
async function registerUser(request, baseURL, payload) {
  const response = await request.post(`${baseURL}/users/register`, { data: payload });
  return response;
}

/**
 * @param {import('@playwright/test').APIRequestContext} request
 * @param {string} baseURL
 */
async function loginUser(request, baseURL, email, password) {
  const response = await request.post(`${baseURL}/users/login`, {
    data: { email, password },
  });
  return response;
}

module.exports = { registerUser, loginUser };
