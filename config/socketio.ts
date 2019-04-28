import * as socket from 'socket.io'
import * as Koa from 'koa'
import * as http from 'http'

export const createScoket = (app:Koa)=>{
    let server = http.createServer(app.callback())
    const io = socket(server)
    io.on('connect',(ck)=>{
        console.log("yes connnection at master")
    })

    const nsp = io.of('/judge')

    nsp.on('connect',(ck:socket.Socket)=>{
        console.log("yes connnection")
    })

    return server
}
