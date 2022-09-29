import { graphql, startApp, webhook } from 'server/controller/shopify';
import { handleIframeProtection } from 'server/middlewares/handleIframeProtection';
import { verifyRequest } from '@shopify/koa-shopify-auth';
import Router from 'koa-router';

export const shopify = new Router({});

shopify.post('/graphql', verifyRequest({ returnHeader: true }), graphql); // Static content is clear: ;
shopify.post('/webhooks', webhook); // Static content is clear: ;
shopify.get('(.*)', handleIframeProtection, startApp);
