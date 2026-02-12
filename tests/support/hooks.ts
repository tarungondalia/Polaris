import { After, Before, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, request } from '@playwright/test';
import { CustomWorld } from './world';
import { getApiUrl } from './config';

setDefaultTimeout(30 * 1000);

Before(async function (this: CustomWorld) {
  const headless = process.env.HEADLESS !== 'false';
  this.browser = await chromium.launch({ headless });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
  this.apiContext = await request.newContext({ baseURL: getApiUrl() });
});

After(async function (this: CustomWorld) {
  await this.page?.close();
  await this.context?.close();
  await this.browser?.close();
  await this.apiContext?.dispose();
});
