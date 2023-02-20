import Router,{IMiddleware, IRouterParamContext} from 'koa-router';
import combineRouters from '../../utils/combineRoutes';
import  Koa from 'koa';
import supertest from 'supertest';

describe('combineRouters', () => {
  test('should return a middleware function that combines all router middlewares', () => {
    const app = new Koa()
    const router1 = new Router();
    const router2 = new Router();
    const router3 = new Router();

    router1.get('/foo', ctx => {
      ctx.body = {
        message: "Hello World"
      };
    });

    router2.post('/bar', ctx => {
      ctx.body = 'bar';
    });

    router3.put('/baz', ctx => {
      ctx.body = 'baz';
    });


    app.use(combineRouters([router1, router2, router3])())

    const req = supertest(app)
   
  const server = app.listen(3000, () => {
    const address = server.address();
    console.log(`Server listening on ${address}:${address}`);
  });
    // expect(combineRouters).toHaveBeenCalledWith([router1, router2, router3])
    req.get('/foo')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/) 

  });
});
