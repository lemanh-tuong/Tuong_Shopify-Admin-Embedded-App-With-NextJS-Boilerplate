import { nextjsClient as nextjsClientController } from 'server/controller/nextjsClient';
import Router from 'koa-router';

export const nextjsClient = new Router({
  prefix: '/_next',
});

nextjsClient.get('(/static/.*)', nextjsClientController); // Static content is clear: ;
nextjsClient.get('/webpack-hmr', nextjsClientController); // Webpack content is clear
