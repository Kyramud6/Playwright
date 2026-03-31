export class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = '#user-name';
        this.passwordInput = '#password';
        this.Loginbutton = '#login-button';
    }

    async goto() {
        await this.page.goto("https://www.saucedemo.com/");
        }

    async login(username, password) {
        await this.page.fill(this.usernameInput, username);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.Loginbutton);
    }

    async Errormessage() {
        const error = this.page.locator('.error-message-container');
        return await error.textContext();
    }
}