import { When } from '@cucumber/cucumber';
import { expect, Page } from '@playwright/test';
import { testUser } from '../support/testData';
import { CustomWorld } from '../support/world';
import { getPage } from '../support/worldUtils';

const MAIN_URL = 'https://practicesoftwaretesting.com';
const BUGGY_URL = 'https://with-bugs.practicesoftwaretesting.com';

const SCREENSHOT_DIR = 'reports/bug-screenshots';

async function safeClick(page: Page, selector: string) {
  const locator = page.locator(selector);
  if (await locator.count()) {
    await locator.first().click({ force: true });
  }
}

async function safeFill(page: Page, selector: string, value: string) {
  const locator = page.locator(selector);
  if (await locator.count()) {
    await locator.first().fill(value);
  }
}

async function gotoWithFallback(page: Page, baseUrl: string, path: string) {
  const cleanBase = baseUrl.replace(/\/$/, '');
  const urls = [`${cleanBase}${path}`, `${cleanBase}/#${path}`];
  for (const url of urls) {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    return;
  }
}

async function loginIfPossible(page: Page, baseUrl: string) {
  await gotoWithFallback(page, baseUrl, '/auth/login');
  await safeFill(page, '[data-test="email"]', testUser.email);
  await safeFill(page, '[data-test="password"]', testUser.password);
  await safeClick(page, '[data-test="login-submit"]');
}

async function capture(page: Page, bugId: string, suffix: string) {
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: `${SCREENSHOT_DIR}/${bugId}-${suffix}.png`,
    fullPage: true,
  });
}

async function assertExpectedBug(page: Page, bugId: string) {
  switch (bugId) {
    case 'BUG-001':
      await expect(page.locator('a[data-test^="product-"]').first()).toBeVisible();
      await expect(page.locator('a[data-test^="product-"] img').first()).toBeVisible();
      await expect(page.locator('a[data-test^="product-"] [data-test="product-name"]').first()).toBeVisible();
      break;
    case 'BUG-002':
      await expect(page.getByText(/toolshop/i)).toBeVisible();
      break;
    case 'BUG-003':
      await expect(page.locator('[data-test="eco-badge"]').first()).toBeVisible();
      break;
    case 'BUG-004':
      await expect(page.locator('[data-test="no-results"]')).toBeVisible();
      break;
    case 'BUG-005':
      await expect(page.locator('[data-test="language-select"]')).toBeVisible();
      break;
    case 'BUG-006':
      await expect(page.locator('[data-test="street"]')).toBeVisible();
      await expect(page.locator('[data-test="postal_code"]')).toBeVisible();
      break;
    case 'BUG-007':
      await expect(page.locator('[data-test="nav-contact"]')).toHaveText(/contact/i);
      break;
    case 'BUG-008':
      await expect(page.getByRole('menuitem', { name: /undefined/i })).toHaveCount(0);
      break;
    case 'BUG-009':
      await expect(page.locator('[data-test="search-submit"]')).toBeVisible();
      break;
    case 'BUG-010':
      await expect(page.locator('[data-test="email"]')).toBeVisible();
      await expect(page.locator('[data-test="password"]')).toBeVisible();
      break;
    case 'BUG-011':
      await expect(page.locator('[data-test="email"]')).toHaveAttribute('placeholder', /your email/i);
      break;
    case 'BUG-012':
      await expect(page.locator('[data-test="postal_code"]')).toBeVisible();
      await expect(page.locator('#new_password')).toBeVisible();
      await expect(page.locator('#new_password_confirmation')).toBeVisible();
      break;
    case 'BUG-013':
      await expect(page.locator('[data-test="nav-menu"]')).toBeVisible();
      break;
    case 'BUG-014':
      await expect(page).toHaveURL(/\/#?\/$/);
      break;
    case 'BUG-015':
      await expect(page.locator('input[formcontrolname="first_name"]')).toBeVisible();
      await expect(page.locator('input[formcontrolname="last_name"]')).toBeVisible();
      await expect(page.locator('input[formcontrolname="email"]')).toBeVisible();
      break;
    case 'BUG-016':
      await expect(page.getByText(/only files with the txt extension/i)).toBeVisible();
      break;
    default:
      break;
  }
}

async function captureBug(page: Page, bugId: string, baseUrl: string) {
  switch (bugId) {
    case 'BUG-001':
    case 'BUG-002':
    case 'BUG-003':
    case 'BUG-005':
    case 'BUG-007':
    case 'BUG-008':
    case 'BUG-009':
      await gotoWithFallback(page, baseUrl, '/');
      if (bugId === 'BUG-008') {
        await safeClick(page, '[data-test="nav-categories"]');
      }
      break;
    case 'BUG-004':
      await gotoWithFallback(page, baseUrl, '/');
      await safeFill(page, '[data-test="search-query"]', 'no-such-product-xyz');
      await safeClick(page, '[data-test="search-submit"]');
      break;
    case 'BUG-006':
      await loginIfPossible(page, baseUrl);
      await gotoWithFallback(page, baseUrl, '/');
      await safeClick(page, 'a[data-test^="product-"]');
      await safeClick(page, '[data-test="add-to-cart"]');
      await safeClick(page, '[data-test="nav-cart"]');
      await safeClick(page, '[data-test="proceed-1"]');
      await safeClick(page, '[data-test="proceed-2"]');
      break;
    case 'BUG-010':
      await gotoWithFallback(page, baseUrl, '/');
      await safeClick(page, '[data-test="nav-sign-in"]');
      break;
    case 'BUG-011':
      await gotoWithFallback(page, baseUrl, '/');
      await safeClick(page, '[data-test="nav-sign-in"]');
      await safeClick(page, 'a[href*="forgot-password"]');
      break;
    case 'BUG-012':
    case 'BUG-013':
    case 'BUG-014':
    case 'BUG-015':
    case 'BUG-016':
      await loginIfPossible(page, baseUrl);
      if (bugId === 'BUG-012') {
        await safeClick(page, '[data-test="nav-menu"]');
        await safeClick(page, '[data-test="nav-my-profile"]');
      } else if (bugId === 'BUG-014') {
        await safeClick(page, '[data-test="nav-home"]');
      } else if (bugId === 'BUG-015' || bugId === 'BUG-016') {
        await safeClick(page, '[data-test="nav-contact"]');
      } else {
        await safeClick(page, '[data-test="nav-menu"]');
      }
      break;
    default:
      await gotoWithFallback(page, baseUrl, '/');
  }
}

When('I capture bug {string} screenshots on both sites', async function (this: CustomWorld, bugId: string) {
  const page = getPage(this);
  await captureBug(page, bugId, BUGGY_URL);
  await assertExpectedBug(page, bugId);
  await capture(page, bugId, 'buggy');
  await captureBug(page, bugId, MAIN_URL);
  await capture(page, bugId, 'main');
});
