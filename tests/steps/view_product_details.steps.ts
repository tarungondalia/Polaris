import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { ProductListPage } from '../pages/ProductListPage';
import { getPage } from '../support/worldUtils';
import { CustomWorld } from '../support/world';

When('I open the first product', async function (this: CustomWorld) {
  const page = getPage(this);
  const listPage = new ProductListPage(page);
  await listPage.openFirstProduct();
});

When('I open an out of stock product', async function (this: CustomWorld) {
  const page = getPage(this);
  const listPage = new ProductListPage(page);
  await listPage.openFirstOutOfStockProduct();
});

Then('I see product details with name description price and image', async function (this: CustomWorld) {
  const page = getPage(this);
  const detailPage = new ProductDetailPage(page);
  await detailPage.expectLoaded();
  await expect(detailPage.productDescription()).toBeVisible();
  await expect(detailPage.unitPrice()).toBeVisible();
  await expect(detailPage.productImage()).toBeVisible();
});

Then('the add to cart button is enabled', async function (this: CustomWorld) {
  const page = getPage(this);
  const detailPage = new ProductDetailPage(page);
  await expect(detailPage.addToCartButton()).toBeEnabled();
});

Then('the add to cart button is disabled', async function (this: CustomWorld) {
  const page = getPage(this);
  const detailPage = new ProductDetailPage(page);
  await expect(detailPage.addToCartButton()).toBeDisabled();
});
