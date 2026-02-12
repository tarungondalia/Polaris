import { Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { AccountPage } from '../pages/AccountPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { LoginPage } from '../pages/LoginPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { ProductListPage } from '../pages/ProductListPage';
import { CustomWorld } from '../support/world';
import { getPage } from '../support/worldUtils';
import { testAddress, testCard, testUser } from '../support/testData';

When('I open my order history', async function (this: CustomWorld) {
  const page = getPage(this);
  const accountPage = new AccountPage(page);
  await accountPage.gotoInvoices();
  const hasOrders = (await accountPage.invoiceRows().count()) > 0;
  if (!hasOrders) {
    const listPage = new ProductListPage(page);
    await listPage.goto();
    await listPage.openFirstInStockProduct();

    const detailPage = new ProductDetailPage(page);
    await detailPage.expectLoaded();
    await expect(detailPage.addToCartButton()).toBeEnabled();
    await detailPage.addToCartButton().click();
    await expect(page.locator('[data-test="cart-quantity"]')).toHaveText(/[1-9]/);

    const cartPage = new CartPage(page);
    await cartPage.goto();
    await expect(cartPage.proceedToLogin()).toBeVisible();
    await expect(cartPage.proceedToLogin()).toBeEnabled();
    await cartPage.proceedToLogin().click();

    const checkout = new CheckoutPage(page);
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
    await checkout.fillCreditCard(testCard);
    await expect(checkout.finishButton()).toBeEnabled();
    await checkout.finishButton().click();
    await expect
      .poll(
        async () =>
          (await checkout.orderConfirmation().isVisible()) ||
          (await page.locator('[data-test="payment-success-message"]').isVisible()),
        { timeout: 20000 }
      )
      .toBe(true);

    await accountPage.gotoInvoices();
  }
});

Then('I should see a list of orders', async function (this: CustomWorld) {
  const page = getPage(this);
  const accountPage = new AccountPage(page);
  const title = accountPage.pageTitle();
  const firstRow = accountPage.invoiceRows().first();
  await expect
    .poll(async () => (await title.isVisible()) || (await firstRow.isVisible()), { timeout: 15000 })
    .toBe(true);
  await expect(firstRow).toBeVisible();
});

Then('I can open the first order details', async function (this: CustomWorld) {
  const page = getPage(this);
  const accountPage = new AccountPage(page);
  await accountPage.openFirstInvoice();
  await expect(accountPage.invoiceNumber()).toBeVisible();
  await expect(accountPage.invoiceDate()).toBeVisible();
  await expect(accountPage.invoiceTotal()).toBeVisible();
});

When('I open order history directly', async function (this: CustomWorld) {
  const page = getPage(this);
  const accountPage = new AccountPage(page);
  await accountPage.gotoInvoices();
});

Then('I should be prompted to log in', async function (this: CustomWorld) {
  const page = getPage(this);
  const loginPage = new LoginPage(page);
  await loginPage.expectOnLogin();
});
