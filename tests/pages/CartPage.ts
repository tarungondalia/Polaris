import { expect, Locator, Page } from '@playwright/test';
import { appUrl } from '../support/config';

export class CartPage {
  constructor(private readonly page: Page) {}

  async goto() {
    const navCart = this.page.locator('[data-test="nav-cart"]');
    if (await navCart.isVisible()) {
      await navCart.click();
    } else {
      await this.page.goto(appUrl('/checkout'));
    }
    await expect(this.page).toHaveURL(/\/checkout/);
  }

  cartQuantityBadge(): Locator {
    return this.page.locator('[data-test="cart-quantity"]');
  }

  productTitles(): Locator {
    return this.page.locator('[data-test="product-title"]');
  }

  productQuantities(): Locator {
    return this.page.locator('[data-test="product-quantity"]');
  }

  linePrices(): Locator {
    return this.page.locator('[data-test="line-price"]');
  }

  cartTotal(): Locator {
    return this.page.locator('[data-test="cart-total"]');
  }

  emptyMessage(): Locator {
    return this.page.locator('p').filter({ hasText: /cart.*empty/i });
  }

  proceedToLogin(): Locator {
    return this.page.locator('[data-test="proceed-1"]');
  }

  async removeFirstItem() {
    const row = this.page.locator('table tbody tr').first();
    await row.locator('.btn.btn-danger').click();
  }

  async expectHasItems() {
    await expect(this.productTitles().first()).toBeVisible({ timeout: 10000 });
  }
}
