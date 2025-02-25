import { test, expect } from '@playwright/test';
import LoginPage from '../pages/login-page.ts';
import userData from '../data/user-data.ts';
import url from '../Utilis/url.ts';

let loginPage: LoginPage;
test.beforeEach(async ({ page }) => {
  await page.goto(url.baseURL);
  loginPage = new LoginPage(page);
});

test('Invalid login for Canvas', async ({ page }) => {
  const invalidEmail = userData.invalidEmail;
  const invalidPassword = userData.invalidPassword;
  await loginPage.doLogin(invalidEmail, invalidPassword);
  await loginPage.checkInvalidCredentials();
});
