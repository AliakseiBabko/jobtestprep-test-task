import { test, expect } from '@playwright/test';
import { LoginPage } from '../data/page-objects/login-page';

test('Login with valid credentials', { tag: ['@ui'] }, async ({ page }) => {

  // initialize the page object
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  
  // log into the app
  await loginPage.login();

  // check that the login was successful
  const successMessage = page.locator('h1.post-title');
  await successMessage.waitFor({ state: 'visible'});
  await expect(successMessage).toContainText('Logged In Successfully');
});

test('Login with invalid username', { tag: ['@ui'] }, async ({ page }) => {

  // initialize the page object
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  
  // log into the app with incorrect user
  await loginPage.login('incorrectUser');

  // check that the error message is displayed
  await expect(loginPage.errorMessage).toContainText('Your username is invalid!');
});
