import { BasePage } from "./basePage/basePage";
import { NodeSelectors } from "../config/selectors/nodeSelectors";
import { expect } from 'playwright/test';


export class NodePage extends BasePage {
  async clickNavButton() {
    const { nodeNavigation } = NodeSelectors;

    const nodeTab = this.page.getByRole( nodeNavigation.role, {name: nodeNavigation.name});
    await nodeTab.click();
  }

  async initiateCreateNodes (){
    const { createNewNode  } = NodeSelectors;

    const createNewNodeButton = this.page.getByRole(createNewNode.role, {name:createNewNode.name});
   
    await this.page.waitForResponse(response => response.url().includes('/chain/all') && response.status() === 200);

    await createNewNodeButton.waitFor();
    await createNewNodeButton.click();
  }

  async selectNodeDetails(){
    const { selectProtocol, selectNetwork } = NodeSelectors;


    const selectProtocolDropdown = this.page.locator(selectProtocol)
    const selectNetworkDropdown = this.page.locator(selectNetwork);

    await selectProtocolDropdown.selectOption("Ethereum");
    await selectNetworkDropdown.selectOption("Mainnet");
  }

  async finishCreateNode(){
    const { createNode  } = NodeSelectors;

    const createNodeButton = this.page.getByRole(createNode.role, {name:createNode.name});

    await createNodeButton.click();

    await this.page.waitForResponse(response => response.url().includes('/project/nodes') && response.status() === 201);
  }



  async openEthNode() {
    const { ethNodeButton, attribute} = NodeSelectors;

    const ethNodeElement = this.page.getByRole(ethNodeButton.role, {name: ethNodeButton.name});
    await ethNodeElement.waitFor();
    await ethNodeElement.click({ force: true });

    expect(await ethNodeElement.getAttribute(attribute)).toBe("true");
  }

  async copyNodes() {
    const { region, individualNodes } = NodeSelectors;

    const nodeRegion = this.page.getByRole(region);
    await nodeRegion.waitFor();

    const inputs = await nodeRegion.getByRole(individualNodes).all();

    const values = await Promise.all(
      inputs.map(async (input) => {
        const value = await input.inputValue();
        return value ;
      }),
    );
    return values;

  }
}

