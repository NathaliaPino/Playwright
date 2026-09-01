class HeaderComponent {
  constructor(page) {
    this.page = page;
    this.logoutLink = page.locator('a[href="/logout"]');
  }

  loggedInAs(name) {
    return this.page.getByText(`Logged in as ${name}`);
  }

  async logout() {
    await this.logoutLink.click();
  }
}

module.exports = { HeaderComponent };