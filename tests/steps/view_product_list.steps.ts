import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { ProductListPage } from '../pages/ProductListPage';
import { getPage } from '../support/worldUtils';

Given('I open the tool shop page', async function (this: CustomWorld) {
  const page = getPage(this);
  const listPage = new ProductListPage(page);
  await listPage.goto();
  await listPage.waitForProducts();
});

Then('I see products with names, images, prices, and links', async function (this: CustomWorld) {
  const page = getPage(this);
  const listPage = new ProductListPage(page);

  const cards = listPage.productCards();
  const count = await cards.count();
  expect(count).toBeGreaterThan(0);

  const sampleCount = Math.min(count, 3);
  for (let i = 0; i < sampleCount; i++) {
    const card = cards.nth(i);

    const name = listPage.productName(card);
    await expect(name).toBeVisible();
    expect((await name.innerText()).trim().length).toBeGreaterThan(0);

    const price = listPage.productPrice(card);
    await expect(price).toBeVisible();
    expect((await price.innerText()).trim().length).toBeGreaterThan(0);

    const image = listPage.productImage(card);
    await expect(image).toBeVisible();
    await expect(image).toHaveAttribute('src', /.+/);

  const link = listPage.productLink(card);
  await expect(link).toBeVisible();
  await expect(link).toHaveAttribute('data-test', /product-/);
  }
});

When('I navigate to the next product page', async function (this: CustomWorld) {
  const page = getPage(this);
  const listPage = new ProductListPage(page);

  
  this.productFirstName = await listPage.getFirstProductName();

  await listPage.goToNextPage();
});

Then('I should see a different set of products', async function (this: CustomWorld) {
  const page = getPage(this);
  const listPage = new ProductListPage(page);

  if (!this.productFirstName) {
    throw new Error('Expected previous product name to be stored');
  }

  const currentFirst = await listPage.getFirstProductName();
  expect(currentFirst).not.toEqual(this.productFirstName);
});

Then('the previous pagination control is disabled', async function (this: CustomWorld) {
  const page = getPage(this);
  const listPage = new ProductListPage(page);
  expect(await listPage.isPrevDisabled()).toBe(true);
});