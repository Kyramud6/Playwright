import type { Page } from '@playwright/test';

export class CartPage {
    page: Page;

    cartItems;
    continueButton;

    constructor(page: Page) {
        this.page = page;
        this.cartItems = page.locator('.cart_item');
        this.continueButton = page.locator('#continue-shopping');
    }

    async getCartItemCount(): Promise<number> {
        return await this.cartItems.count();
    }

    async removeItem(productName: string) {
        const removeButton = this.page.locator(
            `[data-test*="remove-${productName}"]`
        );
        await removeButton.first().click();
    }

    async goBackToProducts() {
        await this.continueButton.click();
    }
}