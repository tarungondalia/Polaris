import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ProductListPage } from '../pages/ProductListPage';
import { CustomWorld } from '../support/world';
import { getApiContext, getPage } from '../support/worldUtils';

Given('I remember the first product name', async function (this: CustomWorld) {
  const page = getPage(this);
  const listPage = new ProductListPage(page);
  this.initialProductName = await listPage.getFirstProductName();
});

When('I filter by the first category', async function (this: CustomWorld) {
  const page = getPage(this);
  const listPage = new ProductListPage(page);
  this.selectedCategoryId = await listPage.selectFirstCategory();
  await listPage.waitForProducts();
  this.selectedCategoryIds = await listPage.selectedCategoryIds();
});

When('I clear the category filter', async function (this: CustomWorld) {
  const page = getPage(this);
  const listPage = new ProductListPage(page);
  await listPage.clearFirstCategorySelection();
  await listPage.waitForProducts();
});

Then('the filtered results should match the selected category', async function (this: CustomWorld) {
  const page = getPage(this);
  const apiContext = getApiContext(this);
  const listPage = new ProductListPage(page);

  if (!this.selectedCategoryId) {
    throw new Error('Expected selected category id to be stored');
  }

  const selectedIds = await listPage.selectedCategoryIds();
  const idsParam = selectedIds.length ? selectedIds.join(',') : this.selectedCategoryId;
  const response = await apiContext.get(`/products?by_category=${idsParam}&page=0`);
  expect(response.ok()).toBeTruthy();
  const data = await response.json();
  const apiIds = new Set((data.data || []).map((item: { id: number }) => String(item.id)));

  const cardCount = await listPage.productCards().count();
  expect(cardCount).toBeGreaterThan(0);
  const uiIds = await listPage.productCardIds(5);

  for (const id of uiIds) {
    expect(apiIds.has(id)).toBe(true);
  }
});

Then('I should see the original first product again', async function (this: CustomWorld) {
  const page = getPage(this);
  const listPage = new ProductListPage(page);
  if (!this.initialProductName) {
    throw new Error('Expected initial product name to be stored');
  }
  const currentFirst = await listPage.getFirstProductName();
  expect(currentFirst).toEqual(this.initialProductName);
});
