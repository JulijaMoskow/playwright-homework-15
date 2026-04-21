import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('Auth negative tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/signin');
    });

    test('button should be disabled when both fields are empty', async ({ page }) => {
        const signInButton = page.getByRole('button', { name: 'Sign in' });

        await signInButton.click();
        await expect(page).toHaveURL(/signin/);
    });

    test('button should stay disabled when only login is filled', async ({ page }) => {
        const loginInput = page.getByPlaceholder('Login');
        const signInButton = page.getByRole('button', { name: 'Sign in' });

        const randomUsername = faker.internet.username();

        await loginInput.fill(randomUsername);

        await expect(signInButton).toBeDisabled();
    });

    test('button should stay disabled when password is invalid', async ({ page }) => {
        const loginInput = page.getByPlaceholder('Login');
        const passwordInput = page.getByPlaceholder('Password');
        const signInButton = page.getByRole('button', { name: 'Sign in' });

        const randomUsername = faker.internet.username();
        const randomPassword = faker.internet.password({ length: 3 });

        await loginInput.fill(randomUsername);
        await passwordInput.fill(randomPassword);

        await expect(signInButton).toBeDisabled();
    });
});