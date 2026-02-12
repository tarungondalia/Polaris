import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { testUser, invalidUser } from '../support/testData';
import { CustomWorld } from '../support/world';
import { getPage } from '../support/worldUtils';

Given('I am logged in as a customer', async function (this: CustomWorld) {
  const page = getPage(this);
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(testUser.email, testUser.password);
});

Given('I am on the login page', async function (this: CustomWorld) {
  const page = getPage(this);
  const loginPage = new LoginPage(page);
  await loginPage.goto();
});

When('I log in with valid credentials', async function (this: CustomWorld) {
  const page = getPage(this);
  const loginPage = new LoginPage(page);
  await loginPage.login(testUser.email, testUser.password);
});

When('I log in with invalid credentials', async function (this: CustomWorld) {
  const page = getPage(this);
  const loginPage = new LoginPage(page);
  await loginPage.login(invalidUser.email, invalidUser.password);
});

Then('I should see my account page', async function (this: CustomWorld) {
  const page = getPage(this);
  await expect(page.locator('[data-test="page-title"]')).toBeVisible();
});

Then('I should see a login error message', async function (this: CustomWorld) {
  const page = getPage(this);
  const loginPage = new LoginPage(page);
  await expect(loginPage.errorMessage()).toBeVisible();
});
