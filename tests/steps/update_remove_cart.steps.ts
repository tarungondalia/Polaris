import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { ProductListPage } from '../pages/ProductListPage';
import { CustomWorld } from '../support/world';
import { getPage } from '../support/worldUtils';

const parsePrice = (text: string): number => {
  const normalized = text.replace(/[^0-9.]/g, '');
  return Number(normalized);
};

Given('I have a product in my cart', async function (this: CustomWorld) {
  const page = getPage(this);
  const listPage = new ProductListPage(page);
  await listPage.goto();
  await listPage.openFirstInStockProduct();

  const detailPage = new ProductDetailPage(page);
  await detailPage.expectLoaded();
  page.once('dialog', async (dialog) => dialog.accept());
  await expect(detailPage.addToCartButton()).toBeEnabled();
  await detailPage.addToCartButton().click();
  await expect(page.locator('[data-test="cart-quantity"]')).toHaveText(/[1-9]/);

  const cartPage = new CartPage(page);
  await cartPage.goto();
  await cartPage.expectHasItems();
});

When('I increase the cart quantity to {int}', async function (this: CustomWorld, quantity: number) {
  const page = getPage(this);
  const cartPage = new CartPage(page);
  const linePriceText = await cartPage.linePrices().first().innerText();
  this.lineTotalBefore = parsePrice(linePriceText);
  const quantityInput = cartPage.productQuantities().first();
  await quantityInput.fill(String(quantity));
  await quantityInput.blur();
});

Then('the cart line total should update', async function (this: CustomWorld) {
  const page = getPage(this);
  const cartPage = new CartPage(page);
  const linePriceText = await cartPage.linePrices().first().innerText();
  const current = parsePrice(linePriceText);
  expect(current).toBeGreaterThan(0);
  if (this.lineTotalBefore !== undefined) {
    expect(current).not.toEqual(this.lineTotalBefore);
  }
});

When('I remove the product from the cart', async function (this: CustomWorld) {
  const page = getPage(this);
  const cartPage = new CartPage(page);
  await cartPage.removeFirstItem();
});

Then('the cart should be empty', async function (this: CustomWorld) {
  const page = getPage(this);
  const cartPage = new CartPage(page);
  await expect(cartPage.emptyMessage()).toBeVisible();
});
