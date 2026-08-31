class LoginPage {
  constructor(page) {
    this.page = page;
    this.signupNameInput = page.locator('input[data-qa="signup-name"]');
    this.signupEmailInput = page.locator('input[data-qa="signup-email"]');
    this.signupButton = page.locator('button[data-qa="signup-button"]');
    this.emailInput = page.locator('input[data-qa="login-email"]');
    this.passwordInput = page.locator('input[data-qa="login-password"]');
    this.loginButton = page.locator('button[data-qa="login-button"]');
    
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
  
    async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

module.exports = { LoginPage };