import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { NodePage } from '../../pages/nodePage';
import { getLoginDetails } from '../../helpers/getLoginDetails';


test.describe('Node Page Tests', () => {
    let loginPage: LoginPage;
    let nodePage: NodePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        nodePage = new NodePage(page);

        await loginPage.navigate();
    });

    test('Verify nodes can be created successfully', async() =>{
        const {USERNAME, PASSWORD} = getLoginDetails()
        await loginPage.login(USERNAME,PASSWORD);
        await nodePage.clickNavButton();
        await nodePage.initiateCreateNodes();
        await nodePage.selectNodeDetails();
        await nodePage.finishCreateNode();

    });

    test("Verify nodes copy functionality works ", async()=>{
        const {USERNAME, PASSWORD} = getLoginDetails()
        await loginPage.login(USERNAME,PASSWORD);
        await nodePage.clickNavButton();
        await nodePage.openEthNode();
        const values = await nodePage.copyNodes();
        expect(values).toBeDefined();
        values.forEach(value => {
            expect(value).toBeDefined();
            expect(value).not.toBe('');
            expect(typeof value).toBe('string');
        });
    });
    
});
