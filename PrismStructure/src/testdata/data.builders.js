const checkoutData = require('./checkout.data.json');

function uniqueStamp() {
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

function buildUserRegistrationPayload(overrides = {}) {
  const stamp = uniqueStamp();
  return {
    first_name: 'Auto',
    last_name: `U${stamp}`.slice(0, 20),
    email: `auto.${stamp}@example.com`,
    password: checkoutData.defaultPassword,
    dob: '1990-06-15',
    phone: '5550100999',
    street: '100 Test Lane',
    city: 'Testville',
    state: 'Florida',
    country: 'US',
    postal_code: '33101',
    ...overrides,
  };
}

function buildInvoicePayload(cartId, overrides = {}) {
  return {
    ...checkoutData.invoiceDefaults,
    cart_id: cartId,
    ...overrides,
  };
}

module.exports = {
  buildUserRegistrationPayload,
  buildInvoicePayload,
  uniqueStamp,
};
