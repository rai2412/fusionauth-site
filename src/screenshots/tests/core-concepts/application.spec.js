import { test, expect } from '@playwright/test';

const baseAdminURL = 'https://local.fusionauth.io/admin/';
const baseImagePath = '../../astro/public/img/docs/';

test('core-concepts-device-grant', async ({ page }) => {

    // need to wait until page loads
    await page.goto(baseAdminURL+'/application/edit?applicationId=85a03867-dccf-4882-adde-1a79aeec50df&tenantId=30663132-6464-6665-3032-326466613934', {
      waitUntil: "networkidle"
    });
  
   // Check the checkbox
    var cb = await page.getByText('Device', { exact: true });
    cb.check();
    await expect(cb).toBeChecked();

    var deviceURL = await page.locator('#application_oauthConfiguration_deviceVerificationURL-form-row');
    await expect(deviceURL).toBeVisible();

    await page.screenshot({ animations: 'disabled', path: baseImagePath+'get-started/core-concepts/application-oauth-device-url.png', clip: {x: 0,y: 400, width:1280, height:200} });
});
