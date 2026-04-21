import { test, expect } from '@playwright/test';

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

        await loginInput.fill('testuser');

        await expect(signInButton).toBeDisabled();
    });

    test('button should stay disabled when password is invalid', async ({ page }) => {
        const loginInput = page.getByPlaceholder('Login');
        const passwordInput = page.getByPlaceholder('Password');
        const signInButton = page.getByRole('button', { name: 'Sign in' });

        await loginInput.fill('testuser');
        await passwordInput.fill('123');

        await expect(signInButton).toBeDisabled();
    });
});