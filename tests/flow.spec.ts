import {test, expect} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test('full flow: add -> cart -> remove -> back', async ({page}) => {
    const loginpage = new LoginPage(page);
    const inventorypage = new InventoryPage(page);
    const cartpage = new CartPage(page);

    //1. Login 
    await loginpage.goto();
    await loginpage.login('standard_user','secret_sauce');

    // 2. Verify Inventory Page
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    // 3. Product exists or not
    const productCount = await inventorypage.getProduct();
    expect(productCount).toBeGreaterThan(0);

    // 4. Add item to cart
    await inventorypage.addItemtoCart();
    const cartCount = await inventorypage.getCartCount();
    expect(cartCount).toBe(0);

    // 5. Go to cart page
    await inventorypage.gotoCart();

    // 6. Verify item in cart
    const cartItem = await cartpage.getCartItemCount();
    expect(cartItem).toBe(1);

    // 7. Remove Cart item
    await cartpage.removeItem();
    const updatedcartItem = await cartpage.getCartItemCount();

    // 8. Go back to product page
    await cartpage.goBacktoProduct();

    // 9. Verify Back on inventory page
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});