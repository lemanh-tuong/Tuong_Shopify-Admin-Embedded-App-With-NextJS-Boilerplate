import { nextApp } from 'server/nextApp';
import { IMiddleware } from 'koa-router';

const handle = nextApp.getRequestHandler();

export const handleRequest: IMiddleware = async ctx => {
  await handle(ctx.req, ctx.res);
  ctx.respond = false;
  ctx.res.statusCode = 200;
};
