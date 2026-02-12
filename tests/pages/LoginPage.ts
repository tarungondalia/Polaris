import { expect, Locator, Page } from '@playwright/test';
import { appUrl, getBaseUrl } from '../support/config';

export class LoginPage {
  constructor(private readonly page: Page) {}

  async goto() {
    const base = getBaseUrl().replace(/\/$/, '');
    const loginUrls = [appUrl('/auth/login'), `${base}/auth/login`];
    for (const url of loginUrls) {
      await this.page.goto(url, { waitUntil: 'domcontentloaded' });
      const visible = await this.email().isVisible();
      if (visible) {
        return;
      }
    }
    await this.page.waitForSelector('[data-test="email"]', { timeout: 15000 });
  }

  email(): Locator {
    return this.page.locator('[data-test="email"]');
  }

  password(): Locator {
    return this.page.locator('[data-test="password"]');
  }

  submit(): Locator {
    return this.page.locator('[data-test="login-submit"]');
  }

  errorMessage(): Locator {
    return this.page.locator('[data-test="login-error"]');
  }

  async login(email: string, password: string) {
    await this.expectOnLogin();
    await this.email().fill(email);
    await this.password().fill(password);
    await this.submit().click();
  }

  async expectOnLogin() {
    await expect(this.email()).toBeVisible();
  }
}
