import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber';
import { APIRequestContext, Browser, BrowserContext, Page } from '@playwright/test';

export class CustomWorld extends World {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  apiContext?: APIRequestContext;
  productFirstName?: string;
  initialProductName?: string;
  cartQuantity?: number;
  selectedCategoryId?: string;
  selectedCategoryIds?: string[];
  lineTotalBefore?: number;
  apiResponse?: import('@playwright/test').APIResponse;
  uiProductName?: string;
  uiProductPrice?: number;
  apiProductName?: string;
  apiProductPrice?: number;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);
