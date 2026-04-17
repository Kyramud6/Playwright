import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CartPage } from '../pages/CartPage.js';
import fs from 'fs';

const data = JSON.parse(fs.readFileSync('./testdata/data.json', 'utf-8'));

test.describe('Add to cart Flow', () => {

    test('Add and remove single product', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);

        await loginPage.goto();
        await loginPage.login('visual_user', 'secret_sauce');

        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.l');

        const item = data.product[0];

        await inventoryPage.addToCart(item.productname);
        expect(await inventoryPage.getCartCount()).toBe(1);

        await inventoryPage.goToCart();
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');

        expect(await cartPage.getCartItemCount()).toBe(1);

        await cartPage.removeItem(item.productname);
        expect(await inventoryPage.getCartCount()).toBe(0);

        await cartPage.goBackToProducts();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });


    test('Add multiple products and remove them', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);

        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');

        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

        for (const item of data.product) {
            await inventoryPage.addToCart(item.productname);
        }

        expect(await inventoryPage.getCartCount()).toBe(data.product.length);

        await inventoryPage.goToCart();
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');

        expect(await cartPage.getCartItemCount()).toBe(data.product.length);

        for (const item of data.product) {
            await cartPage.removeItem(item.productname);
        }

        expect(await inventoryPage.getCartCount()).toBe(0);

        await cartPage.goBackToProducts();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

});

