import { type Page, type Locator , expect } from '@playwright/test';
import messages from '../Utilis/messages';

class LoginPage {
  readonly page: Page;
  readonly loginMenu: Locator;
  readonly canvasButton: Locator;
  readonly canvasNetworkButton: Locator;
  readonly messagePanel: Locator;
  readonly password: Locator;
  readonly email: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginMenu = page.getByRole('link', { name: 'Log in' });
    this.canvasButton = page.getByRole('link', { name: 'Canvas', exact: true });
    this.canvasNetworkButton = page.getByRole('tab', { name: 'Canvas Network', exact: true });
    this.messagePanel = page.locator('#flash_message_holder');
    this.password = page.getByText('Password')
    this.email = page.getByText('Email Address');
    this.loginButton = page.getByRole('button', { name: 'Login' });

  }

  async fillEmail(email: string) {
    await this.email.fill(email);
  }

  async fillPassword(password: string) {
    await this.password.fill(password);
  }

  async doLogin(email: string, password: string) {
    await this.loginMenu.click();
    await this.canvasButton.click();
    await this.canvasNetworkButton.click();
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.loginButton.click();
  }

  async checkInvalidCredentials() {
    await expect(this.messagePanel).toHaveText(messages.login.invalid);
  }
}

export default LoginPage;
