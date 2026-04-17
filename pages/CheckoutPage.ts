import type { Page, Locator } from '@playwright/test' ;

export class CheckoutPage {
    page : Page;

    firstNameInput: Locator;
    lastNameInput: Locator;
    postalCodeInput: Locator;
    continueButton: Locator;
    checkoutButton: Locator;
    backToHomeButton: Locator;

    constructor (page: Page) {
        this.page = page;
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.checkoutButton = page.locator('[data-test="finish"]');
        this.backToHomeButton = page.locator('[data-test="back-to-products"]');
    }

    async fillintheform(firstName: string, lastName: string, postalCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async completepurchase(firstName: string, lastName: string, postalCode: string) {
        await this.fillintheform(firstName, lastName, postalCode);
        await this.continueButton.click();
        await this.checkoutButton.click();
        
    }
    async backToHome() {
    await this.backToHomeButton.click();
    }

}