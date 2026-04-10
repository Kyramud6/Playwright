import type { Page } from '@playwright/test';

export class InventoryPage {
    page: Page;

    inventoryItems;
    cartBadge;
    cartIcon;

    constructor(page: Page) {
        this.page = page;
        this.inventoryItems = page.locator('.inventory-item');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.cartIcon = page.locator('.shopping_cart_link');
    }

    async getProductCount(): Promise<number> {
        return await this.inventoryItems.count();
    }

    async addToCart(productName: string) {
        const button = this.page.locator(
            `[data-test*="add-to-cart-${productName}"]`
        );
        await button.click();
    }

    async getCartCount(): Promise<number> {
        const count = await this.cartBadge.count();

        if (count === 0) return 0;

        const text = await this.cartBadge.textContent();
        return text ? parseInt(text) : 0;
    }

    async goToCart() {
        await this.cartIcon.click();
    }
}