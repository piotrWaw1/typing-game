import { test, expect } from '@playwright/test';

test('unauthenticated user redirect to login', async ({ page }) => {
  await page.goto('http://localhost:3000/menu');
  await expect(page).toHaveURL('http://localhost:3000/auth/login', {
    timeout: 10000,
  });
});
