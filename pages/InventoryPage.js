export class InventoryPage{
    constructor(page){
        this.page = page;
        this.inventoryitem = page.locator('.inventory-item');
        this.cartbadge = page.locator('.shopping_cart_badge');
        this.carticon = page.locator('.shopping_cart_link');
    }

    async getProductCount() {
        return await this.inventoryitem.count();
    }

    // Json Data and flexible button add to cart
    async addToCart(productname) {
        const button = this.page.locator(`[data-test*="add-to-cart-${productname}"]`);
        await button.click();
    }

    async getCartCount() {
        if (await this.cartbadge.isVisible()) {
            return parseInt(await this.cartbadge.textContent());
        }
        return 0;
    }
    async goToCart() {
        await this.carticon.click();
    }
}