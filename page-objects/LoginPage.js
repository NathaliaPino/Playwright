class LoginPage {
  constructor(page) {
    this.page = page;
    this.signupNameInput = page.locator('input[data-qa="signup-name"]');
    this.signupEmailInput = page.locator('input[data-qa="signup-email"]');
    this.signupButton = page.locator('button[data-qa="signup-button"]');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async fillSignupNameAndEmail(name, email) {
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
  }

  async submitSignup() {
    await this.signupButton.click();
  }
}

module.exports = { LoginPage };