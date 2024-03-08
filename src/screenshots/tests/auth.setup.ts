import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
    await page.goto('https://local.fusionauth.io/admin');
    await page.getByPlaceholder('Email').fill('admin@fusionauth.io');
    await page.getByPlaceholder('Password').fill('password');
    await page.getByRole('button').click();
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL('https://local.fusionauth.io/admin/');
  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});
