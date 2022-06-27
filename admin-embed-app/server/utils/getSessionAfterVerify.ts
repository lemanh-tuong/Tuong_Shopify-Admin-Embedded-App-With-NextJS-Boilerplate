import { IRouterContext } from 'koa-router';

interface GetSessionTokenAfterVerify {
  ctx: IRouterContext;
}

export const getSessionTokenAfterVerify = ({ ctx }: GetSessionTokenAfterVerify) => {
  return {
    accessToken: ctx.request.header['Shop-AccessToken'] as string,
    shopDomain: ctx.request.header['Shop-Domain'] as string,
  };
};
