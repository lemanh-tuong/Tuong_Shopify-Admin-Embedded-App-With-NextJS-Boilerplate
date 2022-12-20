import '@babel/polyfill';
import Shopify from '@shopify/shopify-api';
import 'core-js';
import Koa from 'koa';
import { nextApp } from './nextApp';
import { API_VERSION, HOST, PORT, SCOPES, SHOPIFY_API_KEY, SHOPIFY_API_SECRET } from './env';
import { handleOfflineAccessToken, handleOnlineAccessToken } from './middlewares';
import { routes } from './routers';
import { sessionStorage } from './storage/sessionStorage';

Shopify.Context.initialize({
  API_KEY: SHOPIFY_API_KEY,
  API_SECRET_KEY: SHOPIFY_API_SECRET,
  SCOPES: SCOPES,
  HOST_NAME: HOST.replace(/https:\/\//, ''),
  API_VERSION: API_VERSION,
  IS_EMBEDDED_APP: true,
  SESSION_STORAGE: new Shopify.Session.CustomSessionStorage(sessionStorage.storeCallback, sessionStorage.loadCallback, sessionStorage.deleteCallback),
});

nextApp.prepare().then(() => {
  const server = new Koa();
  server.keys = [Shopify.Context.API_SECRET_KEY];
  server.use(handleOfflineAccessToken);
  server.use(handleOnlineAccessToken);
  routes(server);
  server.listen(PORT, () => {
    console.log(`Server is running ${PORT}`);
  });
});

process.on('uncaughtException', (error, origin) => {
  console.log('----- Uncaught exception -----');
  console.log(error);
  console.log('----- Exception origin -----');
  console.log(origin);
});

process.on('unhandledRejection', (reason, promise) => {
  console.log('----- Unhandled Rejection at -----');
  console.log(promise);
  console.log('----- Reason -----');
  console.log(reason);
});
