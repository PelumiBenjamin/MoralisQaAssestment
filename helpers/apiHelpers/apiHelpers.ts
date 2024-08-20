import { apiDefaultHeaders } from '../../config/apiDefaultHeaders';
import { BaseUrls } from '../../config/url';
import { getApiKey } from '../../helpers/getApiKeyDetails';
import { request, APIRequestContext } from '@playwright/test';

export class ApiHelper {
  private apiContext: APIRequestContext;

  async initContext() {
    this.apiContext = await request.newContext({
      ignoreHTTPSErrors: true,
    });
  }

  async disposeContext() {
    await this.apiContext.dispose();
  }


  async getNfts(chain: string = 'eth', format: string = 'decimal') {
    const { APIKEY } = getApiKey();
    return await this.apiContext.get(
      `${BaseUrls.nfts}?chain=${chain}&format=${format}&media_items=false`,
      { headers: { 'X-API-Key': APIKEY } }
    );
  }


  async fetchLatestBlockNumber() {
    const response = await this.apiContext.post(BaseUrls.nodeEndpoint, {
      data: {
        jsonrpc: '2.0',
        method: 'eth_blockNumber',
        id: 1,
      },
      headers: apiDefaultHeaders,
    });
    return response.json();
  }

  async fetchBlockDetails(blockNumberHex: string) {
    const response = await this.apiContext.post(BaseUrls.nodeEndpoint, {
      data: {
        jsonrpc: '2.0',
        method: 'eth_getBlockByNumber',
        params: [blockNumberHex, false], // Only transaction hashes needed
        id: 1,
      },
      headers: apiDefaultHeaders,
    });
    return response.json();
  }

  async fetchTransactionDetails(transactionHash: string) {
    const response = await this.apiContext.post(BaseUrls.nodeEndpoint, {
      data: {
        jsonrpc: '2.0',
        method: 'eth_getTransactionByHash',
        params: [transactionHash],
        id: 1,
      },
      headers: apiDefaultHeaders,
    });
    return response.json();
  }

  async postNfts() {
    const { APIKEY } = getApiKey();
    return this.apiContext.post(`${BaseUrls.nfts}?chain=eth&format=decimal&media_items=false`, {
      headers: { 'X-API-Key': APIKEY, ...apiDefaultHeaders },
    });
  }

  async getNftsWithTokenAddress(tokenAddress: string) {
    const { APIKEY } = getApiKey();
    return this.apiContext.get(`${BaseUrls.nfts}?token_address=${tokenAddress}&chain=eth&format=decimal&media_items=false`, {
      headers: { 'X-API-Key': APIKEY, ...apiDefaultHeaders },
    });
  }

}
