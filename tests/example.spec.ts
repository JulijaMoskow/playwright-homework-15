import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'Get started' }).click();
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('check page elements', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  const discordLink = page.getByRole('link', { name: 'Discord', exact: true });
  await discordLink.scrollIntoViewIfNeeded();
  await expect(discordLink).toBeVisible();

  const githubLink = page.getByRole('link', { name: 'GitHub', exact: true });
  await githubLink.scrollIntoViewIfNeeded();
  await expect(githubLink).toBeVisible();

  const themeToggle = page.getByLabel(/switch.*dark|switch.*light|theme/i);
  await expect(themeToggle.first()).toBeVisible();
});