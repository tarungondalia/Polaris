import { Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ProductListPage } from '../pages/ProductListPage';
import { CustomWorld } from '../support/world';
import { getApiContext, getPage } from '../support/worldUtils';

Then('the category filter should persist after refresh', async function (this: CustomWorld) {
  const page = getPage(this);
  const apiContext = getApiContext(this);
  const listPage = new ProductListPage(page);
  if (!this.selectedCategoryId && !this.selectedCategoryIds?.length) {
    throw new Error('Expected selected category id to be stored');
  }
  await page.reload();
  await listPage.waitForProducts();
  const storedIds = this.selectedCategoryIds?.length
    ? this.selectedCategoryIds
    : [this.selectedCategoryId as string];
  const idsParam = storedIds.join(',');
  const response = await apiContext.get(`/products?by_category=${idsParam}&page=0`);
  expect(response.ok()).toBeTruthy();
  const data = await response.json();
  const apiIds = new Set((data.data || []).map((item: { id: number }) => String(item.id)));
  const uiIds = await listPage.productCardIds(5);
  uiIds.forEach((id) => expect(apiIds.has(id)).toBe(true));
});

Then('pagination should keep the category filter applied', async function (this: CustomWorld) {
  const page = getPage(this);
  const apiContext = getApiContext(this);
  const listPage = new ProductListPage(page);
  if (!this.selectedCategoryId && !this.selectedCategoryIds?.length) {
    throw new Error('Expected selected category id to be stored');
  }
  await listPage.goToNextPage();
  const storedIds = this.selectedCategoryIds?.length
    ? this.selectedCategoryIds
    : [this.selectedCategoryId as string];
  const idsParam = storedIds.join(',');
  const pageNumber = await listPage.activePageNumber();
  const response = await apiContext.get(`/products?by_category=${idsParam}&page=${pageNumber}`);
  expect(response.ok()).toBeTruthy();
  const data = await response.json();
  const apiIds = new Set((data.data || []).map((item: { id: number }) => String(item.id)));
  const uiIds = await listPage.productCardIds(5);
  uiIds.forEach((id) => expect(apiIds.has(id)).toBe(true));
});
