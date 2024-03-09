import { test, expect } from '@playwright/test';

const baseAdminURL = 'https://local.fusionauth.io/admin/';
const baseImagePath = '../../astro/public/img/docs/';
const browserWidth = 1280;
const defaultBrowserHeight = 1200;
const outlineCSS = '{ padding: 10px; border: 3px red solid; } ';

function calculateClip(boxToGetBottomOf) {
  const bottomY = (boxToGetBottomOf?.y + boxToGetBottomOf?.height )|| defaultBrowserHeight;
  return {height: bottomY, width: browserWidth, x: 0, y: 0 }
}

   // const box = await page.locator('main.page-body').boundingBox();
    // clip: calculateClip(box)

test('core-concepts-applications-device-grant', async ({ page }) => {

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

    // TODO change this to dynamically calculate height, not hardcode it
    await page.screenshot({ animations: 'disabled', path: baseImagePath+'get-started/core-concepts/application-oauth-device-url.png', clip: {x: 0,y: 400, width: browserWidth, height:200} });
});

test('core-concepts-applications-list', async ({ page }) => {

    // need to wait until page loads
    await page.goto(baseAdminURL+'/application', {
      waitUntil: "networkidle"
    });
    const box = await page.locator('main.page-body').boundingBox();
    await page.screenshot({ animations: 'disabled', path: baseImagePath+'get-started/core-concepts/applications.png', 
      clip: calculateClip(box) });
  
});

test('core-concepts-applications-edit-cleanspeak', async ({ page }) => {

    // need to wait until page loads
    await page.goto(baseAdminURL+'/application/edit?applicationId=85a03867-dccf-4882-adde-1a79aeec50df&tenantId=30663132-6464-6665-3032-326466613934#cleanspeak-configuration', {
      waitUntil: "networkidle"
    });
    const box = await page.locator('main.page-body').boundingBox();
    await page.screenshot({ animations: 'disabled', path: baseImagePath+'get-started/core-concepts/application-cleanspeak.png', clip: calculateClip(box) });
  
});

test('core-concepts-applications-edit-jwt', async ({ page }) => {

    // need to wait until page loads
    await page.goto(baseAdminURL+'/application/edit?applicationId=85a03867-dccf-4882-adde-1a79aeec50df&tenantId=30663132-6464-6665-3032-326466613934#jwt-settings', {
      waitUntil: "networkidle"
    });
    const box = await page.locator('main.page-body').boundingBox();
    await page.screenshot({ animations: 'disabled', path: baseImagePath+'get-started/core-concepts/application-jwt-disabled.png', clip: calculateClip(box) });

    // enable it, take another screenshot
    var cb = await page.locator('#application_jwtConfiguration_enabled');
    cb.check();
    await expect(cb).toBeChecked();

    var css = ' #application_jwtConfiguration_enabled-form-row '+ outlineCSS;

    const usagePolicy = await page.getByText('Usage policy', { exact: true });
    await expect(usagePolicy).toBeVisible();
    const boxEnabled = await page.locator('main.page-body').boundingBox();

    // TODO not sure why this doesn't get the whole page.
    await page.screenshot({ animations: 'disabled', path: baseImagePath+'get-started/core-concepts/application-jwt-enabled-configuration.png', style: css, clip: calculateClip(boxEnabled) });
  
  
});

test('core-concepts-applications-edit-email', async ({ page}) => {
  await page.goto(baseAdminURL+'/application/edit?applicationId=85a03867-dccf-4882-adde-1a79aeec50df&tenantId=30663132-6464-6665-3032-326466613934#email-settings', {
    waitUntil: "networkidle"
  });

  // clip region from tabs down to email verification settings
  const box = await page.locator('main.page-body').boundingBox();

  await page.screenshot({ 
    animations: 'disabled', 
    path: baseImagePath+'get-started/core-concepts/application-email.png',
    clip: calculateClip(box)
 });

});

test('core-concepts-applications-edit-oauth', async ({ page }) => {

    // need to wait until page loads
    await page.goto(baseAdminURL+'/application/edit?applicationId=85a03867-dccf-4882-adde-1a79aeec50df&tenantId=30663132-6464-6665-3032-326466613934#oauth-configuration', {
      waitUntil: "networkidle"
    });


/* 
enabling these causes the navigation to be messed up by the fullPage setting
    var cb = await page.getByText('Authorization Code', { exact: true });
    cb.check();
    await expect(cb).toBeChecked();

    cb = await page.getByText('Refresh token', { exact: true });
    cb.check();
    await expect(cb).toBeChecked();
*/

    const box = await page.locator('main.page-body').boundingBox();
    await page.screenshot({ animations: 'disabled', path: baseImagePath+'get-started/core-concepts/application-oauth.png',
    clip: calculateClip(box) });
  
});

test('core-concepts-applications-add', async ({ page }) => {

    // need to wait until page loads
    await page.goto(baseAdminURL+'/application/add', {
      waitUntil: "networkidle"
    });

    // add configuration
    await page.getByLabel('Name*').fill('Pied Piper');

    await page.locator('#role-add-button').click();
    var newRoleTextBox = await page.locator('input[name="application.roles[0].name"]');
    await expect(newRoleTextBox).toBeVisible();
    newRoleTextBox.fill("CEO");

/* can't seem to check the checkbox, get 

      - attempting click action
      -   waiting for element to be visible, enabled and stable
      -   element is visible, enabled and stable
      -   scrolling into view if needed
      -   done scrolling
      -   <span class="box"></span> intercepts pointer events
error

    var cb = await page.locator('input[name="application.roles[0].isSuperRole"] + span')
    await expect(cb).toBeVisible();

//page.locator('input[type="checkbox"]');


//name="application.roles[0].isSuperRole"]');
    cb.click();
*/

    await page.locator('#role-add-button').click();
    newRoleTextBox = await page.locator('input[name="application.roles[1].name"]');
    await expect(newRoleTextBox).toBeVisible();
    newRoleTextBox.fill("developer");

    await page.locator('#role-add-button').click();
    newRoleTextBox = await page.locator('input[name="application.roles[2].name"]');
    await expect(newRoleTextBox).toBeVisible();
    newRoleTextBox.fill("intern");

    // addRoleButton.click();
    // addRoleButton.click();

    const box = await page.locator('main.page-body').boundingBox();
    await page.screenshot({ animations: 'disabled', path: baseImagePath+'get-started/core-concepts/create-application.png',
    clip: calculateClip(box) });
});
