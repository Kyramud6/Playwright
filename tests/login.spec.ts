import {test , expect} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import fs from 'fs';

const invalidlogin = JSON.parse(fs.readFileSync('./testdata/invalidlogin.json', 'utf-8'));

test ('valid login' , async ({page}) => {
    const loginpage = new LoginPage(page);

    await loginpage.goto();
    await loginpage.login('visual_user', 'secret_sauce');

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
    await expect(page).toHaveTitle('Products')
});

test ('not valid login', async ({page}) => {
    const loginpage = new LoginPage(page);

    await loginpage.goto();
    await loginpage.login('randomguy', 'secret_sauce');
    await expect(page.locator('.error-message-container')).toBeVisible();
});

// run the test in group by using test.describe
test.describe('Invalid login tests', () => {
    for (const creds of invalidlogin) {
        test(`login with username: '${creds.username}' password: '${creds.password}'` , async ({page}) => {
            const loginpage = new LoginPage(page);

            await loginpage.goto();
            await loginpage.login(creds.username, creds.password);

            if (creds.type == 'valid') {
                await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

            } else {
                await expect(page.locator('.error-message-container')).toBeVisible();
            }            
        });
    }
});
