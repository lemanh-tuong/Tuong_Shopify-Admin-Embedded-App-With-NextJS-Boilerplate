import Koa from 'koa';
import { nextjsClient } from './nextjsClient';
import { myApi } from './myApi';
import { shopify } from './shopify';

export const routes = (server: Koa) => {
  server.use(nextjsClient.allowedMethods());
  server.use(nextjsClient.routes());
  server.use(myApi.allowedMethods());
  server.use(myApi.routes());
  server.use(shopify.allowedMethods());
  server.use(shopify.routes());
};
