import { expect, Locator, Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private readonly page: Page) {}

  proceedFromCart(): Locator {
    return this.page.locator('[data-test="proceed-1"]');
  }

  proceedFromLogin(): Locator {
    return this.page.locator('[data-test="proceed-2"]');
  }

  proceedFromAddress(): Locator {
    return this.page.locator('[data-test="proceed-3"]');
  }

  paymentMethod(): Locator {
    return this.page.locator('[data-test="payment-method"]');
  }

  finishButton(): Locator {
    return this.page.locator('[data-test="finish"]');
  }

  orderConfirmation(): Locator {
    return this.page.locator('#order-confirmation');
  }

  async fillAddress(address: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  }) {
    await this.page.locator('[data-test="street"]').fill(address.street);
    await this.page.locator('[data-test="city"]').fill(address.city);
    await this.page.locator('[data-test="state"]').fill(address.state);
    await this.page.locator('[data-test="country"]').fill(address.country);
    await this.page.locator('[data-test="postal_code"]').fill(address.postalCode);
  }

  async fillCreditCard(card: {
    number: string;
    expiration: string;
    cvv: string;
    name: string;
  }) {
    await this.paymentMethod().selectOption('credit-card');
    await this.page.locator('[data-test="credit_card_number"]').fill(card.number);
    await this.page.locator('[data-test="expiration_date"]').fill(card.expiration);
    await this.page.locator('[data-test="cvv"]').fill(card.cvv);
    await this.page.locator('[data-test="card_holder_name"]').fill(card.name);
  }

  async expectOnPayment() {
    await expect(this.paymentMethod()).toBeVisible();
  }
}
