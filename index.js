const express = require('express')
const apiRoutes = require('./router/app.routers')

const app = express()
const PORT = process.env.PORT || 8080
// const products=require('./data.json')
// const fs =require('fs')

const products=JSON.parse(fs.readFileSync('./data.json','utf-8'))


//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


//Rutas
app.use('/api',apiRoutes)


const connectedServer = app.listen(PORT,()=>{
    console.log(`server is up and running on port ${PORT}`);
})

connectedServer.on('error', ()=> {
    console.log(error.message);
})