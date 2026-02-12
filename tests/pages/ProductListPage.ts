import { expect, Locator, Page } from '@playwright/test';
import { appUrl, getBaseUrl } from '../support/config';

export class ProductListPage {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto(appUrl('/'));
  }

  productCards(): Locator {
    return this.page.locator('a[data-test^="product-"]');
  }

  async productCardIds(limit = 5): Promise<string[]> {
    const cards = this.productCards();
    const count = await cards.count();
    const sampleCount = Math.min(count, limit);
    const ids: string[] = [];
    for (let i = 0; i < sampleCount; i++) {
      const dataTest = await cards.nth(i).getAttribute('data-test');
      if (dataTest) {
        ids.push(dataTest.replace('product-', '').trim());
      }
    }
    return ids;
  }

  productName(card: Locator): Locator {
    return card.locator('[data-test="product-name"]');
  }

  productPrice(card: Locator): Locator {
    return card.locator('[data-test="product-price"]').first();
  }

  productImage(card: Locator): Locator {
    return card.locator('img');
  }

  productLink(card: Locator): Locator {
    return card;
  }

  paginationNext(): Locator {
    return this.page.locator('.pagination a[aria-label="Next"]');
  }

  paginationPrev(): Locator {
    return this.page.locator('.pagination a[aria-label="Previous"]');
  }

  async activePageNumber(): Promise<number> {
    const active = this.page.locator('.pagination .page-item.active .page-link');
    if (await active.count()) {
      const text = (await active.first().innerText()).trim();
      const page = Number(text);
      return Number.isFinite(page) ? page : 1;
    }
    return 1;
  }

  async waitForProducts() {
    await expect(this.productCards().first()).toBeVisible();
  }

  async searchFor(text: string) {
    await this.page.locator('[data-test="search-query"]').fill(text);
    await this.page.locator('[data-test="search-submit"]').click();
  }

  async resetSearch() {
    await this.page.locator('[data-test="search-reset"]').click();
  }

  categoryCheckboxes(): Locator {
    return this.page.locator('[data-test^="category-"]');
  }

  async selectedCategoryIds(): Promise<string[]> {
    const checked = this.page.locator('[data-test^="category-"]:checked');
    const count = await checked.count();
    const ids: string[] = [];
    for (let i = 0; i < count; i++) {
      const dataTest = await checked.nth(i).getAttribute('data-test');
      if (dataTest) {
        ids.push(dataTest.replace('category-', '').trim());
      }
    }
    return ids;
  }

  categoryCheckboxById(categoryId: string): Locator {
    return this.page.locator(`[data-test="category-${categoryId}"]`);
  }

  async selectFirstCategory(): Promise<string> {
    const checkbox = this.categoryCheckboxes().first();
    await expect(checkbox).toBeVisible();
    const dataTest = (await checkbox.getAttribute('data-test')) || '';
    await checkbox.check();
    return dataTest.replace('category-', '');
  }

  async clearFirstCategorySelection() {
    const checkbox = this.categoryCheckboxes().first();
    await checkbox.uncheck();
  }

  async isCategoryChecked(categoryId: string): Promise<boolean> {
    return this.categoryCheckboxById(categoryId).isChecked();
  }

  async getFirstProductName(): Promise<string> {
    const firstCard = this.productCards().first();
    await expect(firstCard).toBeVisible();
    const name = await this.productName(firstCard).innerText();
    return name.trim();
  }

  async goToNextPage() {
    const next = this.paginationNext();
    await expect(next).toBeVisible();
    await next.click();
    await this.page.waitForLoadState('networkidle');
    await this.waitForProducts();
  }

  async openFirstProduct() {
    const firstCard = this.productCards().first();
    await expect(firstCard).toBeVisible();
    await firstCard.click();
  }

  async openFirstInStockProduct() {
    await this.waitForProducts();
    const inStockCard = this.page
      .locator('a[data-test^="product-"]:not(:has([data-test="out-of-stock"]))')
      .first();
    await expect(inStockCard).toBeVisible();
    const href = await inStockCard.getAttribute('href');
    if (href) {
      const base = getBaseUrl().replace(/\/$/, '');
      if (href.startsWith('http')) {
        await this.page.goto(href);
        return;
      }
      if (href.startsWith('/')) {
        await this.page.goto(`${base}${href}`);
        return;
      }
      if (href.startsWith('#')) {
        await this.page.goto(`${base}/${href}`);
        return;
      }
    }
    await inStockCard.click({ force: true });
  }

  async openFirstOutOfStockProduct() {
    const outOfStockCard = this.page.locator('a[data-test^="product-"]:has([data-test="out-of-stock"])').first();
    await expect(outOfStockCard).toBeVisible();
    await outOfStockCard.click();
  }

  async isPrevDisabled(): Promise<boolean> {
    const prevItem = this.page.locator('.pagination .page-item').first();
    return (await prevItem.getAttribute('class'))?.includes('disabled') ?? false;
  }
}