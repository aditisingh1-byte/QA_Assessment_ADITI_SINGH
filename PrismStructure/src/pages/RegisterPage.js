const { BasePage } = require('./BasePage');
const checkoutData = require('../testdata/checkout.data.json');
const { uniqueStamp } = require('../testdata/data.builders');

class RegisterPage extends BasePage {
  constructor(page) {
    super(page);
    this.firstName = page.getByTestId('first-name');
    this.lastName = page.getByTestId('last-name');
    this.email = page.getByTestId('email');
    this.password = page.getByTestId('password');
    this.dob = page.getByTestId('dob');
    this.phone = page.getByTestId('phone');
    this.street = page.getByTestId('street');
    this.city = page.getByTestId('city');
    this.state = page.getByTestId('state');
    this.country = page.getByTestId('country');
    this.postalCode = page.getByTestId('postal_code');
    this.houseNumber = page.getByTestId('house_number');
    this.submit = page.getByTestId('register-submit');
  }

  async open() {
    await this.goto('/auth/register');
    await this.page.waitForFunction(
      () => document.querySelector('[data-test="first-name"]'),
      null,
      { timeout: 60_000 },
    );
  }

  buildUiUser() {
    const stamp = uniqueStamp();
    return {
      firstName: 'Auto',
      lastName: `U${stamp}`.slice(0, 20),
      email: `ui.${stamp}@example.com`,
      password: checkoutData.defaultPassword,
      dob: '1990-06-15',
      phone: '5550101234',
      street: '100 Test Lane',
      city: 'Miami',
      state: 'Florida',
      country: 'US',
      postalCode: '33101',
      houseNumber: '10',
    };
  }

  async register(user) {
    await this.open();
    await this.firstName.fill(user.firstName);
    await this.lastName.fill(user.lastName);
    await this.email.fill(user.email);
    await this.password.fill(user.password);
    await this.dob.fill(user.dob);
    await this.phone.fill(user.phone);
    await this.street.fill(user.street);
    await this.city.fill(user.city);
    await this.state.fill(user.state);
    await this.country.selectOption(user.country);
    await this.postalCode.fill(user.postalCode);
    await this.houseNumber.fill(user.houseNumber);
    const registerResponse = this.page.waitForResponse(
      (response) =>
        response.url().includes('/users/register') && response.request().method() === 'POST',
    );
    await this.submit.click();
    const response = await registerResponse;
    if (response.status() !== 201) {
      throw new Error(`Register failed: ${response.status()} ${await response.text()}`);
    }
    await this.page.getByTestId('nav-home').waitFor({ state: 'visible', timeout: 60_000 });
    return user;
  }
}

module.exports = { RegisterPage };
