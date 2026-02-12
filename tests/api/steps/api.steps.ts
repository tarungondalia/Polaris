import { Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ProductListPage } from '../../pages/ProductListPage';
import { invalidUser, testUser } from '../../support/testData';
import { CustomWorld } from '../../support/world';
import { getApiContext, getPage } from '../../support/worldUtils';

type Product = { id: number; name: string; price: number };

async function fetchFirstProduct(apiContext: ReturnType<typeof getApiContext>) {
  const response = await apiContext.get('/products?page=0');
  expect(response.ok()).toBeTruthy();
  const data = await response.json();
  const first = (data.data || [])[0] as Product | undefined;
  if (!first) {
    throw new Error('Expected API to return at least one product');
  }
  return first;
}

When('I request the product list from the API', async function (this: CustomWorld) {
  const apiContext = getApiContext(this);
  this.apiResponse = await apiContext.get('/products?page=0');
});

Then('the API should return products', async function (this: CustomWorld) {
  if (!this.apiResponse) {
    throw new Error('Expected API response to be stored');
  }
  expect(this.apiResponse.ok()).toBeTruthy();
  const data = await this.apiResponse.json();
  expect(Array.isArray(data.data)).toBe(true);
  expect(data.data.length).toBeGreaterThan(0);
});

When('I request the first product details from the API', async function (this: CustomWorld) {
  const apiContext = getApiContext(this);
  const first = await fetchFirstProduct(apiContext);
  this.apiResponse = await apiContext.get(`/products/${first.id}`);
});

Then('the product details should include name and price', async function (this: CustomWorld) {
  if (!this.apiResponse) {
    throw new Error('Expected API response to be stored');
  }
  expect(this.apiResponse.ok()).toBeTruthy();
  const data = await this.apiResponse.json();
  expect(typeof data.name).toBe('string');
  expect(typeof data.price).toBe('number');
});

When('I log in via the API with valid credentials', async function (this: CustomWorld) {
  const apiContext = getApiContext(this);
  this.apiResponse = await apiContext.post('/users/login', {
    data: { email: testUser.email, password: testUser.password },
  });
});

Then('the API should return an access token', async function (this: CustomWorld) {
  if (!this.apiResponse) {
    throw new Error('Expected API response to be stored');
  }
  expect(this.apiResponse.ok()).toBeTruthy();
  const data = await this.apiResponse.json();
  expect(typeof data.access_token).toBe('string');
});

When('I log in via the API with invalid credentials', async function (this: CustomWorld) {
  const apiContext = getApiContext(this);
  this.apiResponse = await apiContext.post('/users/login', {
    data: { email: invalidUser.email, password: invalidUser.password },
  });
});

Then('the API should return an unauthorized error', async function (this: CustomWorld) {
  if (!this.apiResponse) {
    throw new Error('Expected API response to be stored');
  }
  expect(this.apiResponse.ok()).toBeFalsy();
  expect(this.apiResponse.status()).toBe(401);
});

When('I compare the first UI product to the API', async function (this: CustomWorld) {
  const page = getPage(this);
  const apiContext = getApiContext(this);
  const listPage = new ProductListPage(page);

  await listPage.waitForProducts();
  const uiName = (await listPage.getFirstProductName()).trim();
  const uiPriceText = (await listPage.productPrice(listPage.productCards().first()).innerText()).trim();
  const uiPrice = Number(uiPriceText.replace(/[^0-9.]/g, ''));

  const apiProduct = await fetchFirstProduct(apiContext);
  this.uiProductName = uiName;
  this.uiProductPrice = uiPrice;
  this.apiProductName = apiProduct.name;
  this.apiProductPrice = apiProduct.price;
});

Then('the product name and price should match', async function (this: CustomWorld) {
  expect(this.uiProductName).toBeTruthy();
  expect(this.apiProductName).toBeTruthy();
  expect(this.uiProductName).toEqual(this.apiProductName);
  if (this.uiProductPrice === undefined || this.apiProductPrice === undefined) {
    throw new Error('Expected UI and API prices to be stored');
  }
  expect(this.uiProductPrice).toBeCloseTo(this.apiProductPrice, 2);
});
