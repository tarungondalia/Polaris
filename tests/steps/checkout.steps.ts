import { Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CustomWorld } from '../support/world';
import { getPage } from '../support/worldUtils';
import { testAddress, testCard, testUser } from '../support/testData';

When('I proceed to the payment step', async function (this: CustomWorld) {
  const page = getPage(this);
  const cartPage = new CartPage(page);
  const checkout = new CheckoutPage(page);

  await expect(cartPage.proceedToLogin()).toBeVisible();
  await expect(cartPage.proceedToLogin()).toBeEnabled();
  await cartPage.proceedToLogin().click();

  const proceedLogin = checkout.proceedFromLogin();
  const proceedGuest = page.locator('[data-test="proceed-2-guest"]');
  const street = page.locator('[data-test="street"]');

  if (!(await street.isVisible())) {
    const loginEmail = page.locator('[data-test="email"]');
    const loginPassword = page.locator('[data-test="password"]');
    const loginSubmit = page.locator('[data-test="login-submit"]');
    if (await loginEmail.isVisible()) {
      await loginEmail.fill(testUser.email);
      await loginPassword.fill(testUser.password);
      await loginSubmit.click();
    }
    await expect
      .poll(
        async () =>
          (await proceedLogin.isEnabled()) ||
          (await proceedGuest.isEnabled()) ||
          (await street.isVisible()),
        { timeout: 15000 }
      )
      .toBe(true);
    if (!(await street.isVisible())) {
      if (await proceedLogin.isEnabled()) {
        await proceedLogin.click({ force: true });
      } else if (await proceedGuest.isEnabled()) {
        await proceedGuest.click({ force: true });
      }
    }
  }

  await expect(street).toBeVisible({ timeout: 15000 });
  await checkout.fillAddress(testAddress);
  await expect(checkout.proceedFromAddress()).toBeEnabled();
  await checkout.proceedFromAddress().click();
  await checkout.expectOnPayment();
});

When('I complete checkout with valid address and payment', async function (this: CustomWorld) {
  const page = getPage(this);
  const cartPage = new CartPage(page);
  const checkout = new CheckoutPage(page);

  await expect(cartPage.proceedToLogin()).toBeVisible();
  await expect(cartPage.proceedToLogin()).toBeEnabled();
  await cartPage.proceedToLogin().click();

  const proceedLogin = checkout.proceedFromLogin();
  const proceedGuest = page.locator('[data-test="proceed-2-guest"]');
  const street = page.locator('[data-test="street"]');
  if (!(await street.isVisible())) {
    const loginEmail = page.locator('[data-test="email"]');
    const loginPassword = page.locator('[data-test="password"]');
    const loginSubmit = page.locator('[data-test="login-submit"]');
    if (await loginEmail.isVisible()) {
      await loginEmail.fill(testUser.email);
      await loginPassword.fill(testUser.password);
      await loginSubmit.click();
    }
    await expect
      .poll(
        async () =>
          (await proceedLogin.isEnabled()) ||
          (await proceedGuest.isEnabled()) ||
          (await street.isVisible()),
        { timeout: 15000 }
      )
      .toBe(true);
    if (!(await street.isVisible())) {
      if (await proceedLogin.isEnabled()) {
        await proceedLogin.click({ force: true });
      } else if (await proceedGuest.isEnabled()) {
        await proceedGuest.click({ force: true });
      }
    }
  }

  await expect(street).toBeVisible({ timeout: 15000 });
  await checkout.fillAddress(testAddress);
  await expect(checkout.proceedFromAddress()).toBeEnabled();
  await checkout.proceedFromAddress().click();
  await checkout.expectOnPayment();
  await checkout.fillCreditCard(testCard);
  await expect(checkout.finishButton()).toBeEnabled();
  await checkout.finishButton().click();
});

Then('I should see an order confirmation', async function (this: CustomWorld) {
  const page = getPage(this);
  const checkout = new CheckoutPage(page);
  const confirmation = checkout.orderConfirmation();
  const paymentError = page.locator('[data-test="payment-error-message"]');
  const paymentSuccess = page.locator('[data-test="payment-success-message"]');
  await expect
    .poll(
      async () =>
        (await confirmation.isVisible()) ||
        (await paymentSuccess.isVisible()) ||
        (await paymentError.isVisible()),
      { timeout: 20000 }
    )
    .toBe(true);
  if (await paymentError.isVisible()) {
    const message = (await paymentError.innerText()).trim();
    throw new Error(`Payment failed: ${message}`);
  }
  if (await paymentSuccess.isVisible()) {
    return;
  }
  await expect(confirmation).toBeVisible();
});

Then('the finish button should be disabled', async function (this: CustomWorld) {
  const page = getPage(this);
  const checkout = new CheckoutPage(page);
  await expect(checkout.finishButton()).toBeDisabled();
});
