import compose from 'koa-compose';
import Router, { IMiddleware } from 'koa-router';
/**
 * Compose multiple instances of koa-router
 * into a single `use`-able middleware.
 *
 * @param  routers
 * @return Function
 */

type Middleware = IMiddleware<any>;

export default function combineRouters(routers: Array<Router>) {
  return () => {
    if (!Array.isArray(routers)) {
      routers = [...arguments];
    }
    const middleware: Middleware[] = [];

    routers.forEach((router) => {
      middleware.push(router.routes());
      middleware.push(router.allowedMethods());
    });

    const composed = compose(middleware);

    return composed;
  };
}
