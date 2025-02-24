import { test, expect } from '@playwright/test';


test('Invalid login for Canvas', async ({ page }) => {
  //Launch Instructure browser
  await page.goto('https://www.instructure.com/');
  //navigate to Log In and then Canvas
  await page.getByRole('link', { name: 'Log In' }).click();
  await page.getByRole('link', { name: 'Canvas', exact: true }).click();
  //select Canvas Network
  await page.getByRole('tab', { name: 'Canvas Network', exact: true  }).click();
  //enter invalid credentials
  await page
  .getByText('Email Address')
  .fill('invalid@gmail.com');
  
  await page
  .getByText('Password')
  .fill('Test123');

  await page.getByRole('button', { name: 'Login' }).click();  

  //assert an error message is displayed
  await expect(page).toHaveURL('https://learn.canvas.net/login/canvas');
  const errorMessage = 
  'Please verify your username or password and try again. Trouble logging in? ';
  await expect(
    page.locator('#flash_message_holder')
    .getByText(errorMessage)
    .getByText('Check out our Login FAQs')
    )
    .toBeVisible();
});
