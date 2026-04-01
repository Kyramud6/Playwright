export class CartPage {
    constructor(page) {
        this.page = page;
        this.cartitem = page.locator('.cart_item');
        this.removebutton = (productname)=> page.locator(`[data-test*="remove-${productname}"]`);
        this.continuebutton = page.locator('#continue-shopping');
    }

    async getCartItemCount() {
        return await this.cartitem.count();
    }

    async removeitem(productname) {
        await this.removebutton(productname).first().click();
    }

    async goBackToProducts() {
        await this.continuebutton.click();
    }
}