export class CartPage {
    constructor(page) {
        this.page = page;
        this.CartItems = page.locator('.cart-item');
        this.removeButton = page.locator('button:has-text("Remove")');
        this.continueShop = page.locator('#continue-shopping');        
    }

    async getCartItemCount() {
        return await this.CartItems.count();
    }

    async removeItem() {
        await this.removeButton.first().click();
    }

    async goBacktoProduct() {
        await this.continueShop.click();
    }
}