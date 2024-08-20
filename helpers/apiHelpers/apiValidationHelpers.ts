import { expect } from '@playwright/test';


export function validateBlockDetails(blockDetails, expectedBlockNumberHex) {
    expect(blockDetails.number).toEqual(expectedBlockNumberHex);
    expect(blockDetails.miner).toMatch(/^0x[a-fA-F0-9]{40}$/);
    expect(blockDetails.transactions.length).toBeGreaterThan(0);
  }
  
  export function validateTransactionDetails(transactionDetails, expectedTransactionHash) {
    expect(transactionDetails.hash).toEqual(expectedTransactionHash);
    expect(transactionDetails).toHaveProperty('gas');
    expect(parseInt(transactionDetails.gas, 16)).toBeGreaterThan(0);
    expect(transactionDetails).toHaveProperty('from');
    expect(transactionDetails).toHaveProperty('to');
    expect(transactionDetails).toHaveProperty('value');
  }
  
  export function validateInvalidParameterResponse(response, expectedCode, expectedMessage) {
    expect(response).toHaveProperty('error');
    expect(response.error).toHaveProperty('code', expectedCode);
    expect(response.error).toHaveProperty('message', expectedMessage);
  }

  export const validateNftMetadata = (nft: any) => {
    expect(nft).toHaveProperty('amount');
    expect(typeof nft.amount).toBe('string');
    expect(nft).toHaveProperty('token_id');
    expect(typeof nft.token_id).toBe('string');
    expect(nft).toHaveProperty('token_address');
    expect(typeof nft.token_address).toBe('string');
    expect(nft.token_address).toMatch(/^0x[a-fA-F0-9]{40}$/);
    expect(nft).toHaveProperty('contract_type');
    expect(typeof nft.contract_type).toBe('string');
    expect(nft.contract_type).toMatch(/ERC\d{3}/);
    expect(nft.metadata).not.toBeNull();
    expect(typeof nft.metadata).toBe('string');
  };
  
  export const validateNftOwnerAndContractType = (nft: any) => {
    expect(nft).toHaveProperty('owner_of');
    expect(typeof nft.owner_of).toBe('string');
    expect(nft.owner_of).toMatch(/^0x[a-fA-F0-9]{40}$/);
    expect(nft).toHaveProperty('contract_type');
    expect(typeof nft.contract_type).toBe('string');
    expect(nft.contract_type).toBe('ERC721');
  };
  
  export const validatePagination = (responseData: any) => {
    expect(responseData).toHaveProperty('page');
    expect(typeof responseData.page).toBe('number');
    expect(responseData.page).toBeGreaterThan(0);
    expect(responseData).toHaveProperty('page_size');
    expect(typeof responseData.page_size).toBe('number');
    expect(responseData.page_size).toBeGreaterThan(0);
    expect(responseData.result.length).toBeGreaterThan(0);
  };


export function validateBlockNumbers(nft: any) {
  expect(nft).toHaveProperty('block_number');
  expect(typeof nft.block_number).toBe('string');
  expect(nft.block_number).toMatch(/^\d+$/);
  expect(parseInt(nft.block_number, 10)).toBeGreaterThan(0);
  
  if (nft.block_number_minted !== null) {
    expect(nft).toHaveProperty('block_number_minted');
    expect(typeof nft.block_number_minted).toBe('string');
  } else {
    expect(nft.block_number_minted).toBeNull();
  }
}

export function validateNftImageAndLogo(nft: any) {
  expect(nft).toHaveProperty('collection_logo');
  expect(typeof nft.collection_logo).toBe('string');
  expect(nft.collection_logo).toMatch(/^https:\/\/.+$/); 

  const metadata = JSON.parse(nft.metadata);
  expect(metadata).toHaveProperty('image');
  expect(typeof metadata.image).toBe('string');
  expect(metadata.image).toMatch(/^https:\/\/.+$/); 

  expect(metadata).toHaveProperty('external_url');
  expect(typeof metadata.external_url).toBe('string');
  expect(metadata.external_url).toMatch(/^https:\/\/.+$/); 
}

export function validateInvalidTokenAddress(responseData: any, invalidTokenAddress: string) {
  expect(responseData).toHaveProperty('result');
  
  if (!responseData.result || responseData.result.length === 0) {
    expect(responseData.result.length).toEqual(0); 
  } else {
    expect(responseData.result[0].token_address).not.toEqual(invalidTokenAddress);
    expect(typeof responseData.result[0].token_address).toBe('string');
  }
}

export function validatePostMethodNotAllowed(response: any, responseData: any) {
  const contentType = response.headers()['content-type'];

  if (contentType.includes('text/html')) {
    expect(response.status()).toBe(404); 
  } else {
    expect(response.status()).toBe(404); 
    expect(responseData).toHaveProperty('message');
    expect(typeof responseData.message).toBe('string');
  }
}

  
  