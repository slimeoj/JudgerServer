var client = require("socket.io-client")

const socket  = client("http://127.0.0.1:3000/judge")

    socket.emit("*","hello")
socket.on('connect',()=>{
    console.log('connected!')
})

socket.on('connect_error',(e)=>{
    console.log('connecte error!')
    console.log(e)
})

socket.on('connect_timeout',()=>{
    console.log('connecte timeout!')
})
