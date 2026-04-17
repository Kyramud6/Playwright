import {test, expect} from '@playwright/test';
import { LoginPage }  from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';
import fs from 'fs';
import { get } from 'http';

const data = JSON.parse(fs.readFileSync('./testdata/data.json','utf-8'));
const getUser = (type : string) => {
    const user = data.login.find((u:any) => u.type === type);
    if (!user) {
        throw new Error(`User with type ${type} not found in test data`);
    }
    return user;
};


test.describe('Full Flow Test', () => {

    test('Complete purchase flow' , async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        const user = getUser('valid');
        await loginPage.goto();
        await loginPage.login(user.username, user.password);

        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

        const item = data.product[0];

        await inventoryPage.addToCart(item.productname);
        expect(await inventoryPage.getCartCount()).toBe(1);

        await inventoryPage.goToCart();
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');

        expect(await cartPage.getCartItemCount()).toBe(1);

        await cartPage.goToCheckout();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');

        await checkoutPage.completepurchase('John', 'Doe', '12345');
        await checkoutPage.backToHome();
    });

    
    
});