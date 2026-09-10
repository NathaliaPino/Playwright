class SignupPage {
  constructor(page) {
    this.page = page;
    this.passwordInput = page.locator('#password');
    this.daysSelect = page.locator('#days');
    this.monthsSelect = page.locator('#months');
    this.yearsSelect = page.locator('#years');
    this.firstNameInput = page.locator('#first_name');
    this.lastNameInput = page.locator('#last_name');
    this.companyInput = page.locator('#company');
    this.address1Input = page.locator('#address1');
    this.address2Input = page.locator('#address2');
    this.countrySelect = page.locator('#country');
    this.stateInput = page.locator('#state');
    this.cityInput = page.locator('#city');
    this.zipcodeInput = page.locator('#zipcode');
    this.mobileNumberInput = page.locator('#mobile_number');
    this.createAccountButton = page.locator('button[data-qa="create-account"]');
    this.accountCreatedMessage = page.locator('h2[data-qa="account-created"]');
    this.continueButton = page.locator('a[data-qa="continue-button"]');
  }

  async fillAccountInformation(user) {
    if (user.password) await this.passwordInput.fill(user.password);
    if (user.dateOfBirth) {
      await this.daysSelect.selectOption(user.dateOfBirth.day);
      await this.monthsSelect.selectOption(user.dateOfBirth.month);
      await this.yearsSelect.selectOption(user.dateOfBirth.year);
    }
    if (user.firstName) await this.firstNameInput.fill(user.firstName);
    if (user.lastName) await this.lastNameInput.fill(user.lastName);
    if (user.company) await this.companyInput.fill(user.company);
    if (user.address1) await this.address1Input.fill(user.address1);
    if (user.address2) await this.address2Input.fill(user.address2);
    if (user.country) await this.countrySelect.selectOption(user.country);
    if (user.state) await this.stateInput.fill(user.state);
    if (user.city) await this.cityInput.fill(user.city);
    if (user.zipcode) await this.zipcodeInput.fill(user.zipcode);
    if (user.mobileNumber) await this.mobileNumberInput.fill(user.mobileNumber);
  }

  async submit() {
    await this.createAccountButton.click();
  }

  async continueToHome() {
    await this.continueButton.click();
  }
}

module.exports = { SignupPage };