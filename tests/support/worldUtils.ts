import { APIRequestContext, Page } from '@playwright/test';
import { CustomWorld } from './world';

export const getPage = (world: CustomWorld): Page => {
  const page = world.page;
  if (!page) {
    throw new Error('Playwright page is not initialized');
  }
  return page;
};

export const getApiContext = (world: CustomWorld): APIRequestContext => {
  const apiContext = world.apiContext;
  if (!apiContext) {
    throw new Error('API context is not initialized');
  }
  return apiContext;
};
