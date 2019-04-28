import * as socket from 'socket.io'
import * as Koa from 'koa'
import * as http from 'http'

export const createScoket = (app:Koa)=>{
    let server = http.createServer(app.callback())
    const io = socket(server)

    const nsp = io.of('/judge')


    nsp.on('connect',(ck:socket.Socket)=>{
        console.log("yes connnection")
        console.log(ck.id)
        ck.on('*',function(){
            console.log("hello")
        })
    })


    app.use((ctx: Koa.Context, next: Function) => {
        console.log(nsp.connected)
        ctx.body = Object.keys( nsp.connected).length;
    })


    return {server,nsp}
}
