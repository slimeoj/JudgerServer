import * as Koa from 'koa'
import * as logger from 'koa-logger'

export const createServer = (): Koa => {

    const app: Koa = new Koa()

    app.use(logger())

    app.use((ctx: Koa.Context, next: Function) => {
        ctx.body = "hello world!";
    })

    return app;
}
