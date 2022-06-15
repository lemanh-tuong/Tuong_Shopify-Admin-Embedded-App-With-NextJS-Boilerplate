import koaBody from 'koa-body';

export const handleKoaBodyParser = () => {
  return koaBody({
    encoding: 'utf-8',
    multipart: true,
    urlencoded: true,
    json: true,
  });
};
