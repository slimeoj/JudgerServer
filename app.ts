import { createServer } from './config/applicatios'
import { createScoket } from './config/socketio'

module.exports = (async () => {
    try {
        let koa = createServer()
        let {server,nsp}= createScoket(koa)

        server.listen(3000, function() {
            console.log("just begin at 3000")
        })

    }
    catch (e) {
    }
})()
