import {test , expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import fs from 'fs';
import { execPath } from 'process';

const data = JSON.parse(fs.readFileSync('./testdata/data.json', 'utf-8'));


test.describe('Add to cart Flow', () => {
    for (const item of data.product) {
        test(`Add and remove product: ${item.productname}`, async ({page}) => {
            const loginpage = new LoginPage(page);
            const inventorypage = new InventoryPage(page);
            const cartpage = new CartPage(page);

            // 1 Login
            await loginpage.goto();
            await loginpage.login('visual_user' , 'secret_sauce');
            await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

            // 2 Add to cart
            await inventorypage.addToCart(item.productname);
            const cartCount = await inventorypage.getCartCount();
            expect(cartCount).toBe(1);

            // 3 Go to cart page
            await inventorypage.goToCart();
            await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
            const cartItemCount = await cartpage.getCartItemCount();
            expect(cartItemCount).toBe(1);

            // 4 Remove Item
            await cartpage.removeitem(item.productname);
            const updateCartCount = await inventorypage.getCartCount();
            expect(updateCartCount).toBe(0);

            // 5 Back to Inventory Page
            await cartpage.goBackToProducts();
            await expect(page).toHaveURL ('https:www.saucedemo.com/inventory.html');
        });
    }
});

// Multi Cart Purchase Test Case
test('Add multiple product and remove them' , async ({page}) => {
    const loginpage = new LoginPage(page);
    const inventorypage = new InventoryPage(page);
    const cartpage = new CartPage(page);

    // 1 Login
    await loginpage.goto();
    await loginpage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    // 2 Add all product
    for (const item of data.product) {
        await inventorypage.addToCart(item.productname);
    }

    // 3 Verify Cart Count
    const CartCountItem = await inventorypage.getCartCount();
    expect(CartCountItem).toBe(data.product.length);

    // 4 Go back to cart page
    await inventorypage.goToCart();
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');

    const cartItemCounting = await cartpage.getCartItemCount();
    expect(cartItemCounting).toBe(data.product.length);

    // 5 Remove all product
    for (const item of data.product) {
        await cartpage.removeitem(item.productname);
    }
    const updateCartCount = await inventorypage.getCartCount();
    expect (updateCartCount).toBe(0);

    // 6 Back to inventory Page
    await cartpage.goBackToProducts();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});