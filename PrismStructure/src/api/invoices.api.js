/**
 * @param {import('@playwright/test').APIRequestContext} request
 * @param {string} baseURL
 * @param {string} token
 * @param {object} invoicePayload
 */
async function createInvoice(request, baseURL, token, invoicePayload) {
  return request.post(`${baseURL}/invoices`, {
    headers: { Authorization: `Bearer ${token}` },
    data: invoicePayload,
  });
}

module.exports = { createInvoice };
