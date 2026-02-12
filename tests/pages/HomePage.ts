import { expect, Page } from '@playwright/test';
import { appUrl } from '../support/config';

export class HomePage {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto(appUrl('/'));
  }

  async expectTitleContains(text: string) {
    await expect(this.page).toHaveTitle(new RegExp(text, 'i'));
  }
}
