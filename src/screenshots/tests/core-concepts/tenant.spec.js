import { test, expect } from '@playwright/test';

const baseAdminURL = 'https://local.fusionauth.io/admin';
const baseImagePath = '../../astro/public/img/docs/';
const browserWidth = 1280;

test('core-concepts-tenant-configuration-smtp-settings', async ({ page }) => {

    // need to wait until page loads
    await page.goto(baseAdminURL+'/tenant/edit/30663132-6464-6665-3032-326466613934', {
      waitUntil: "networkidle"
    });

    // click on Email tab
    await page.getByRole('link', { name: 'Email', exact: true }).click();


    // clip region from tabs down to email verification settings
    const box = await page.locator('ul.tabs').boundingBox();
    const topY = box?.y || 0;

    const nextBox = await page.getByText('Email verification settings').boundingBox();
    const bottomY = nextBox?.y || 1200;

    await page.screenshot({ animations: 'disabled', path: baseImagePath+'get-started/core-concepts/tenant-configuration-smtp-settings.png', clip:  {height: bottomY - topY, width: 1600, x: 0, y: topY }});
});

