import { Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { ProductListPage } from '../pages/ProductListPage';
import { CustomWorld } from '../support/world';
import { getPage } from '../support/worldUtils';

When('I add the first product to the cart', async function (this: CustomWorld) {
  const page = getPage(this);
  const listPage = new ProductListPage(page);
  await listPage.openFirstInStockProduct();

  const detailPage = new ProductDetailPage(page);
  await detailPage.expectLoaded();
  this.productFirstName = await detailPage.productName().innerText();

  const cartBadge = page.locator('[data-test="cart-quantity"]');
  const badgeCount = await cartBadge.count();
  if (badgeCount === 0) {
    this.cartQuantity = 0;
  } else {
    const badgeText = (await cartBadge.first().innerText()).trim();
    this.cartQuantity = badgeText ? Number(badgeText) : 0;
  }

  page.once('dialog', async (dialog) => dialog.accept());
  await expect(detailPage.addToCartButton()).toBeEnabled();
  await detailPage.addToCartButton().click();
});

Then('the cart quantity should increase', async function (this: CustomWorld) {
  const page = getPage(this);
  const cartBadge = page.locator('[data-test="cart-quantity"]');
  await expect(cartBadge).toBeVisible();
  const badgeText = (await cartBadge.innerText()).trim();
  const current = badgeText ? Number(badgeText) : 0;
  expect(current).toBeGreaterThan(this.cartQuantity ?? 0);
});

Then('the cart should list the added product', async function (this: CustomWorld) {
  const page = getPage(this);
  const cartPage = new CartPage(page);
  await cartPage.goto();
  await cartPage.expectHasItems();

  if (!this.productFirstName) {
    throw new Error('Expected product name to be stored');
  }

  await expect(cartPage.productTitles().first()).toContainText(this.productFirstName);
});
