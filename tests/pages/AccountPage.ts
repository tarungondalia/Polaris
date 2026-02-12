import { expect, Locator, Page } from '@playwright/test';
import { appUrl, getBaseUrl } from '../support/config';

export class AccountPage {
  constructor(private readonly page: Page) {}

  async gotoInvoices() {
    const base = getBaseUrl().replace(/\/$/, '');
    const urls = [appUrl('/account/invoices'), `${base}/account/invoices`];
    for (const url of urls) {
      await this.page.goto(url, { waitUntil: 'domcontentloaded' });
      if (await this.pageTitle().isVisible()) {
        return;
      }
      if ((await this.invoiceRows().count()) > 0) {
        return;
      }
    }
  }

  pageTitle(): Locator {
    return this.page.locator('[data-test="page-title"]');
  }

  invoiceRows(): Locator {
    return this.page.locator('table tbody tr');
  }

  async openFirstInvoice() {
    const firstRow = this.invoiceRows().first();
    await expect(firstRow).toBeVisible();
    await firstRow.locator('a.btn.btn-primary').click();
  }

  invoiceNumber(): Locator {
    return this.page.locator('[data-test="invoice-number"]');
  }

  invoiceDate(): Locator {
    return this.page.locator('[data-test="invoice-date"]');
  }

  invoiceTotal(): Locator {
    return this.page.locator('[data-test="total"]').first();
  }
}
