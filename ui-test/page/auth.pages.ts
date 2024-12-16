import { expect, Locator, Page } from '@playwright/test';

export class AuthPage {
    readonly page: Page;
    readonly registerLink: Locator;
    readonly usernameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly signUpButton: Locator;
    readonly loginButton: Locator;
    readonly usernameLoginInput: Locator;
    readonly passwordLoginInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.registerLink = page.getByRole('link', { name: 'Register' });
        this.usernameInput = page.getByLabel('Username');
        this.emailInput = page.getByLabel('Email address');
        this.passwordInput = page.getByLabel('Password');
        this.signUpButton = page.getByRole('button', { name: 'Sign Up' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.usernameLoginInput = page.locator('input[name="username"]');
        this.passwordLoginInput = page.locator('input[name="password"]');
    }

    async gotoLoginPage() {
        await this.page.goto('http://localhost:4200/login');
    }

    async register(username: string, email: string, password: string) {
        await this.registerLink.click();
        await this.usernameInput.fill(username);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.signUpButton.click();
    }

    async login(username: string, password: string) {
        await this.usernameLoginInput.fill(username);
        await this.passwordLoginInput.fill(password);

        this.page.once('dialog', async (dialog) => {
            console.log(`Dialog message: ${dialog.message()}`);
            await dialog.accept();
        });
        await this.loginButton.click();
    }

    async verifyURL(expectedURL: string) {
        await expect(this.page).toHaveURL(expectedURL);
    }
}
