import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { HomePage } from '../../pages/homePage';
import { getLoginDetails } from '../../helpers/getLoginDetails';



test.describe('Home Page Tests', () => {
    let loginPage: LoginPage;
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        await loginPage.navigate();
    });

    test('Verify API Key has a value ', async({page}) =>{
        const {USERNAME, PASSWORD} = getLoginDetails()
        await loginPage.login(USERNAME,PASSWORD);
        await page.waitForResponse(response => response.url().includes('/auth/login') && response.status() === 201);
        const value = await homePage.getApiKey()
        expect(value).toBeDefined()
        expect(value).not.toBe('');
        expect(value.length).toBeGreaterThan(20);
    })

});