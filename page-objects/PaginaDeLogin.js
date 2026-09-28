class LoginPage {
  constructor(page) {
    this.page = page;
    this.signupNameInput = page.locator('input[data-qa="signup-name"]');
    this.signupEmailInput = page.locator('input[data-qa="signup-email"]');
    this.signupButton = page.locator('button[data-qa="signup-button"]');
    this.emailInput = page.locator('input[data-qa="login-email"]');
    this.passwordInput = page.locator('input[data-qa="login-password"]');
    this.loginButton = page.locator('button[data-qa="login-button"]');
    this.loginErrorMessage = page.getByText('Your email or password is incorrect!');
    // loginErrorMessage é lido nos Then dos cenários W03 e W10 (login.steps.js)
    
  }

  // Método usado em: W01, W02, W03, W06, W08, W10  (w02 e w06 usam indiretamente)
  async goto() {
    await this.page.goto('/login');
  }


  // Método usado em: W01 e W08 e indiretamente em W02 e W06
  async fillSignupNameAndEmail(name, email) {
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
  }


  // Método usado em: W01 e W08 e Indiretamente em W02 e W06
  async submitSignup() {
    await this.signupButton.click();
  }

  // Método usado em: W02, W03, W06, W10 
    async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

module.exports = { LoginPage };