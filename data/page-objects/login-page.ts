import { type Locator, type Page } from '@playwright/test';
import { userData } from '../test-data/user_data';

export class LoginPage {
  readonly page: Page;
  readonly getLoginField: Locator;
  readonly getPasswordField: Locator;
  readonly getSubmitBtn: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getLoginField = page.locator('#username');
    this.getPasswordField = page.locator('#password');
    this.getSubmitBtn = page.locator('#submit');
    this.errorMessage = page.locator('#error');
  }

  async goto() {
    await this.page.goto(userData.loginTestUrl);
  }

  async login(username = process.env.LOGIN, password = process.env.PASSWORD) {
    await this.getLoginField.fill(`${username}`);
    await this.getPasswordField.fill(`${password}`);
    await this.getSubmitBtn.click();
  }
}