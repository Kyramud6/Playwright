export class InventoryPage {
    constructor(page) {
        this.page = page;
        this.inventoryItems = page.locator('.inventory_item');
        this.AddtoCart = page.locator('.inventory_item').first();
        this.CartBadge = page.locator('.shopping_cart_badge');
        this.cartIcon = page.locator('.shopping_cart_link');
    }
    async getProduct() {
        return await this.inventoryItems.count();
    }
    async addItemtoCart() {
        await this.AddtoCart.click();
    }
    async getCartCount(){
        if (await this.CartBadge.isVisible()){
            return parseInt(await this.CartBadge.textContent());
        }
        return 0;
    }
    async gotoCart() {
        await this.cartIcon.click();
    }
}