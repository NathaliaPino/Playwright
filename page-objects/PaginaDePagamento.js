class PaginaDePagamento {
  constructor(page) {
    this.page = page;
    this.nameOnCardInput = page.locator('input[data-qa="name-on-card"]');
    this.cardNumberInput = page.locator('input[data-qa="card-number"]');
    this.cvcInput = page.locator('input[data-qa="cvc"]');
    this.expiryMonthInput = page.locator('input[data-qa="expiry-month"]');
    this.expiryYearInput = page.locator('input[data-qa="expiry-year"]');
    this.payButton = page.locator('button[data-qa="pay-button"]');
    this.confirmationMessage = page.getByText('Congratulations! Your order has been confirmed!');
  }

  async fillPaymentDetails(payment) {
    await this.nameOnCardInput.fill(payment.name);
    await this.cardNumberInput.fill(payment.cardNumber);
    await this.cvcInput.fill(payment.cvc);
    await this.expiryMonthInput.fill(payment.expiryMonth);
    await this.expiryYearInput.fill(payment.expiryYear);
    await this.payButton.click();
  }
}

module.exports = { PaginaDePagamento };