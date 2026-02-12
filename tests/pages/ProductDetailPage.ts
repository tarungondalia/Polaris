import { expect, Locator, Page } from '@playwright/test';

export class ProductDetailPage {
  constructor(private readonly page: Page) {}

  productName(): Locator {
    return this.page.locator('[data-test="product-name"]');
  }

  productDescription(): Locator {
    return this.page.locator('[data-test="product-description"]');
  }

  unitPrice(): Locator {
    const unit = this.page.locator('[data-test="unit-price"]');
    const offer = this.page.locator('[data-test="offer-price"]');
    return unit.or(offer);
  }

  productImage(): Locator {
    return this.page.locator('.figure img').first();
  }

  addToCartButton(): Locator {
    return this.page.locator('[data-test="add-to-cart"]');
  }

  quantityInput(): Locator {
    return this.page.locator('[data-test="quantity"]');
  }

  async expectLoaded() {
    await expect(this.productName()).toBeVisible();
  }
}
