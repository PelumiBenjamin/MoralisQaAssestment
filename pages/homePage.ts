import { BasePage } from "./basePage/basePage";
import { ApiSelectors } from "../config/selectors/apiSelectors";


export class HomePage extends BasePage {


    async getApiKey (){
    const { seeApi } = ApiSelectors;
    const clickCopyApi = this.page.getByRole(seeApi.role, {name: seeApi.name});

    await clickCopyApi.click()

    const value = await this.page.getByRole('region').getByRole('textbox').inputValue()

    return value;
    }

}
