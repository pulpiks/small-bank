// server/index.js
const Koa = require('koa')
const Router = require('koa-router')
const router = new Router()
import routes from '../routes'
// const login = require('./account')

routes(router);

export default () => {
    const app = new Koa()

    app
        .use(router.routes())
        .use(router.allowedMethods())

    const server = app.listen(process.env.PORT || 5000)
    // return server
    return {
        server,
        app
    }
}
