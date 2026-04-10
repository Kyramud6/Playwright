import type { Page } from '@playwright/test';

export class LoginPage {
    page: Page;

    usernameInput: string;
    passwordInput: string;
    loginButton: string;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = '#user-name';
        this.passwordInput = '#password';
        this.loginButton = '#login-button';
    }

    async goto() {
        await this.page.goto("https://www.saucedemo.com/");
    }

    async login(username: string, password: string) {
        await this.page.fill(this.usernameInput, username);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.loginButton);
    }

    async errorMessage() {
        const error = this.page.locator('.error-message-container');
        return await error.textContent();
    }
}