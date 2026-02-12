import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ProductListPage } from '../pages/ProductListPage';
import { CustomWorld } from '../support/world';
import { getPage } from '../support/worldUtils';

When('I search for the first product name', async function (this: CustomWorld) {
  const page = getPage(this);
  const listPage = new ProductListPage(page);
  this.productFirstName = await listPage.getFirstProductName();
  await listPage.searchFor(this.productFirstName);
});

When('I search for {string}', async function (this: CustomWorld, query: string) {
  const page = getPage(this);
  const listPage = new ProductListPage(page);
  await listPage.searchFor(query);
});

Then('I should see search results for that product', async function (this: CustomWorld) {
  const page = getPage(this);
  const listPage = new ProductListPage(page);
  if (!this.productFirstName) {
    throw new Error('Expected first product name to be stored');
  }
  await expect(page.locator('[data-test="search-term"]')).toHaveText(this.productFirstName);
  const firstResultName = await listPage.getFirstProductName();
  expect(firstResultName).toContain(this.productFirstName);
});

Then('I should see a no results message', async function (this: CustomWorld) {
  const page = getPage(this);
  await expect(page.locator('[data-test="no-results"]')).toBeVisible();
});
