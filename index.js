const path = require('path')
const express = require('express')
const apiRoutes = require('./router/app.routers')

const app = express()
const PORT = process.env.PORT || 8080
// const products=require('./data.json')
// const fs =require('fs')
// const products=JSON.parse(fs.readFileSync('./data.json','utf-8'))

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use((req,res,next)=>{
    const method = req.method
    const url = req.url
    const year = new Date().getFullYear();
    console.log(`${method} -- ${url} -- ${year}`);
    next()
})

//Rutas

// app.get('/',(req,res,next)=>{
//     res.sendFile(path.resolve(__dirname,'./public/index.html'));
// })

app.use('/api',apiRoutes)

const connectedServer = app.listen(PORT,()=>{
    console.log(`server is up and running on port ${PORT}`);
})

connectedServer.on('error', ()=> {
    console.log(error.message);
})