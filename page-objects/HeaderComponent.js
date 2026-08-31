class HeaderComponent {
  constructor(page) {
    this.page = page;
  }

  loggedInAs(name) {
    return this.page.getByText(`Logged in as ${name}`);
  }
}

module.exports = { HeaderComponent };