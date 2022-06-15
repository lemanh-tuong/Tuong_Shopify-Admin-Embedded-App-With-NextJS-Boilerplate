import { initializationApp } from 'server/controller/myApi';
import { handleKoaBodyParser } from 'server/middlewares/handleKoaBodyParser';
import Router from 'koa-router';

export const myApi = new Router({
  prefix: '/api',
});

/**
 * Vì những api liên quan đến shopify ("/webhooks", "/graphql", ...) bằng 1 cách nào đó sẽ không chạy nếu sử dụng koa body parser -> Khi đó sẽ bị treo đến khi request timeout
 */
myApi.get('/initialization', handleKoaBodyParser(), initializationApp);
