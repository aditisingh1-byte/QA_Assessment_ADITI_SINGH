const { BasePage } = require('./BasePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.email = page.getByTestId('email');
    this.password = page.getByTestId('password');
    this.submit = page.getByTestId('login-submit');
  }

  async open() {
    await this.goto('/auth/login');
    await this.page.waitForFunction(
      () => document.querySelector('[data-test="email"]'),
      null,
      { timeout: 60_000 },
    );
  }

  async login(email, password) {
    await this.open();
    const loginResponse = this.page.waitForResponse(
      (response) =>
        response.url().includes('/users/login') && response.request().method() === 'POST',
    );
    await this.email.fill(email);
    await this.password.fill(password);
    await this.submit.click();
    const response = await loginResponse;
    if (response.status() !== 200) {
      throw new Error(`Login failed with status ${response.status()}`);
    }
    await this.page.getByTestId('nav-home').waitFor({ state: 'visible', timeout: 60_000 });
  }
}

module.exports = { LoginPage };
