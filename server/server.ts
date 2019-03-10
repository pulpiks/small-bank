
import Koa from 'koa'
import Router from 'koa-router'
import cors from "koa2-cors"
import routes from "./routes";
const app = new Koa();
const router = new Router();

const isProduction = process.env.NODE_ENV === "production";

routes(router);

const port = process.env.PORT || 8080;

app.proxy = true;

if (!isProduction) {
  app.use(cors({ credentials: true }));
} else {
  const handlerCors = cors();
  app.use(async (ctx, next) => {
    // if (ctx.url.indexOf("/form") === 0) {
    //   return void (await handlerCors(ctx, next));
    // }
    await next();
  });
}

app.use(async (ctx, next) => {
    try {
        await next()
    } catch (err) {
        ctx.status = err.status || 500
        ctx.body = err.message
        console.error(err)
        ctx.app.emit('error', err, ctx)
    }
})

app
  .use(router.routes())
  .use(router.allowedMethods());

app.on('error', err => {
    console.log('Captured error ', err);
});

app.listen(port);