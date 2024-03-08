import { test, expect } from '@playwright/test';

const baseAdminURL = 'https://local.fusionauth.io/admin/';
const baseImagePath = '../../astro/public/img/docs/';
const browserWidth = 1280;

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

    await page.screenshot({ animations: 'disabled', path: baseImagePath+'get-started/core-concepts/application-oauth-device-url.png', clip: {x: 0,y: 400, width: browserWidth, height:200} });
});

test('core-concepts-applications-list', async ({ page }) => {

    // need to wait until page loads
    await page.goto(baseAdminURL+'/application', {
      waitUntil: "networkidle"
    });
    await page.screenshot({ animations: 'disabled', path: baseImagePath+'get-started/core-concepts/applications.png', clip: {x: 0,y: 0, width: browserWidth, height:600} });
  
});

test('core-concepts-applications-edit-cleanspeak', async ({ page }) => {

    // need to wait until page loads
    await page.goto(baseAdminURL+'/application/edit?applicationId=85a03867-dccf-4882-adde-1a79aeec50df&tenantId=30663132-6464-6665-3032-326466613934#cleanspeak-configuration', {
      waitUntil: "networkidle"
    });
    await page.screenshot({ animations: 'disabled', path: baseImagePath+'get-started/core-concepts/application-cleanspeak.png', fullPage: true });
  
});

test('core-concepts-applications-edit-jwt-disabled', async ({ page }) => {

    // need to wait until page loads
    await page.goto(baseAdminURL+'/application/edit?applicationId=85a03867-dccf-4882-adde-1a79aeec50df&tenantId=30663132-6464-6665-3032-326466613934#jwt-settings', {
      waitUntil: "networkidle"
    });
    await page.screenshot({ animations: 'disabled', path: baseImagePath+'get-started/core-concepts/application-jwt-disabled.png'});
  
});

test('core-concepts-applications-edit-email', async ({ page }) => {

    // need to wait until page loads
    await page.goto(baseAdminURL+'/application/edit?applicationId=85a03867-dccf-4882-adde-1a79aeec50df&tenantId=30663132-6464-6665-3032-326466613934#email-settings', {
      waitUntil: "networkidle"
    });
    await page.screenshot({ animations: 'disabled', path: baseImagePath+'get-started/core-concepts/application-email.png', fullPage: true });
  
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

    await page.screenshot({ animations: 'disabled', path: baseImagePath+'get-started/core-concepts/application-oauth.png', fullPage: true });
  
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

  
    await page.screenshot({ animations: 'disabled', path: baseImagePath+'get-started/core-concepts/create-application.png', fullPage: true });
});
