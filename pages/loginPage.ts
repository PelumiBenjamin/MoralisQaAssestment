import { BasePage } from "./basePage/basePage";
import { LoginSelectors } from "../config/selectors/loginSelectors";
import { BaseUrls } from "../config/url";


export class LoginPage extends BasePage {

  async navigate() {
    await this.page.goto(BaseUrls.login);
    await this.page.waitForSelector(LoginSelectors.emailLabel);
  }

  async login(username: string, password: string) {
    const { emailInput, passwordInput, loginButton, captchaText, acceptAllButton } = LoginSelectors;

    const acceptButton = this.page.locator(acceptAllButton);
    const emailInputField = this.page.getByRole(emailInput.role, { name: emailInput.name });
    const passwordInputFIeld = this.page.getByRole(passwordInput.role, { name: passwordInput.name });
    const login= this.page.getByRole(loginButton.role, { name: loginButton.name });

    if (await acceptButton.isVisible()) {
      await acceptButton.click();
    }

    await emailInputField.fill(username);
    await passwordInputFIeld.fill(password);
    await login.click();

    const captcha = this.page.locator(captchaText);
    if (await captcha.isVisible()) {
      await this.page.waitForTimeout(7000);
      await login.click();
      await this.page.waitForFunction(
        () => window.location.href === BaseUrls.home,
      );
    }
  }
}
