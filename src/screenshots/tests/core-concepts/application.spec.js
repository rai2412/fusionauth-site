import { test, expect } from '@playwright/test';

const baseAdminURL = 'https://local.fusionauth.io/admin/';
const baseImagePath = '../../astro/public/img/docs/';
const browserWidth = 1280;
const outlineCSS = '{ padding: 10px; border: 3px red solid; } ';


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

test('core-concepts-applications-edit-jwt', async ({ page }) => {

    // need to wait until page loads
    await page.goto(baseAdminURL+'/application/edit?applicationId=85a03867-dccf-4882-adde-1a79aeec50df&tenantId=30663132-6464-6665-3032-326466613934#jwt-settings', {
      waitUntil: "networkidle"
    });
    await page.screenshot({ animations: 'disabled', path: baseImagePath+'get-started/core-concepts/application-jwt-disabled.png'});

    // enable it, take another screenshot
    var cb = await page.locator('#application_jwtConfiguration_enabled');
    cb.check();
    await expect(cb).toBeChecked();

    var css = ' #application_jwtConfiguration_enabled-form-row '+ outlineCSS;

    await page.screenshot({ animations: 'disabled', path: baseImagePath+'get-started/core-concepts/application-jwt-enabled-configuration.png', style: css});
  
  
});

test('core-concepts-applications-edit-email', async ({ playwright}) => {
  const browser = await playwright.webkit.launch();  
  // Create a new browser context.
  // want a huge viewport otherwise our nav gets all screwy (can't use fullPage: true)
  const context = await browser.newContext({viewport: {height: 7000, width: 1280}});
  // Create a new page in a pristine context.
  const page2 = await context.newPage();
    // need to wait until page loads
  await page2.goto(baseAdminURL+'/application/edit?applicationId=85a03867-dccf-4882-adde-1a79aeec50df&tenantId=30663132-6464-6665-3032-326466613934#email-settings', {
    waitUntil: "networkidle"
  });

    // clip region from tabs down to email verification settings
    const box = await page2.locator('main.page-body').boundingBox();
    const bottomY = (box?.y + box?.height )|| 1200;


  await page2.screenshot({ animations: 'disabled', path: baseImagePath+'get-started/core-concepts/application-email.png',
 clip:  {height: bottomY, width: 1280, x: 0, y: 0 }
 });
  
  // Gracefully close up everything
  await context.close();
  await browser.close();

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
