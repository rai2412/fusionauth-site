import { test, expect } from '@playwright/test';

const outlineCSS = '{ padding: 10px; border: 3px red solid; } ';

/*
test('getapplications', async ({ page }) => {

    // need to wait until page loads
    await page.goto('https://local.fusionauth.io/admin/application', {
      waitUntil: "networkidle"
    });

    //var css = ' a[href="/ajax/application/view/3c219e58-ed0e-4b18-ad48-f4f92793ae32"]' + cssStr;
    var css = ' tr:nth-child(2) td.action '+ outlineCSS;

    await page.screenshot({ fullPage: true, path: 'screenshot.png', style: css });
});

atest('showidps', async ({ page }) => {

    // need to wait until page loads
    await page.goto('https://local.fusionauth.io/admin/identity-provider/', {
      waitUntil: "networkidle"
    });

    await page.locator('button.gray').click();
    var css = '.buttons div.menu'+ outlineCSS;

    await page.screenshot({ fullPage: true, path: 'screenshot-idps.png', style: css });
});

atest('showoidcidp', async ({ page }) => {

    // need to wait until page loads
    await page.goto('https://local.fusionauth.io/admin/identity-provider/add/OpenIDConnect', {
      waitUntil: "networkidle"
    });

    var css = '';

    await page.screenshot({ animations: 'allow', fullPage: true, path: 'screenshot-idps-special.png', style: css });
});

*/

test('coreconceptappliationdevicegrant', async ({ page }) => {

    // need to wait until page loads
    await page.goto('https://local.fusionauth.io/admin/application/edit?applicationId=85a03867-dccf-4882-adde-1a79aeec50df&tenantId=30663132-6464-6665-3032-326466613934', {
      waitUntil: "networkidle"
    });

  
   // Check the checkbox
    var cb = await page.getByText('Device', { exact: true });
    cb.check();
    await expect(cb).toBeChecked();

    var deviceURL = await page.locator('#application_oauthConfiguration_deviceVerificationURL-form-row');
    await expect(deviceURL).toBeVisible();
  

    // var css = '#application_oauthConfiguration_deviceVerificationURL-form-row'+ outlineCSS;
    var css = '';

    //await page.screenshot({ path: 'screenshot-device-grant.png', style: css });
    //await page.screenshot({ path: 'screenshot-device-grant.png', style: css });
    //await page.screenshot({ path: 'screenshot-device-grant.png', style: css });
    //await page.screenshot({ path: 'screenshot-device-grant.png', style: css });
    await page.screenshot({ animations: 'disabled' ,path: 'screenshot-device-grant.png', style: css, clip: {x: 0,y: 400, width:1280, height:200} });
});
