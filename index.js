const express = require('express')

const PORT = process.env.PORT || 8080
// const products=require('./data.json')
const fs =require('fs')

const products=JSON.parse(fs.readFileSync('./data.json','utf-8'))

const app = express()

//Middlewares
app.use(express.json())


//Rutas
app.get('/',(req,res,next)=>{
    res.send({name:"Felipe"})
})


app.get('/products',(req,res,next)=>{
    const {price}=req.query
    console.log(req.query);
    const priceNumber=parseInt(price || 99999999)
    const restProducts = products.filter((p)=>{
        return p.price < priceNumber})
    res.json(restProducts)
})

app.get('/products/:id',(req,res,next)=>{
    console.log(req.params);
    const product = products.find((p)=>p.id=== +(req.params.id))
    res.json(product)

})


app.post('/products',(req,res,next)=>{
    console.log(req.body);
    const {title,price,thumbnail} = req.body;
    const newProduct={
        title,
        price,
        thumbnail,
        id:products.length +1,
    }

    products.push(newProduct)
    fs.writeFileSync('./data.json',JSON.stringify(products,null,2))
    res.json(newProduct)
})


app.delete('/products/:id',(req,res,next)=>{
    const {id} = req.params;
    const indProduct = products.findIndex((p)=>p.id=== +(id))
    if (indProduct<0){
        return res.status(400).send(`Producto con id ${id} no existe`)
    }
    const deletedProduct = products.splice(indProduct,1)
    fs.writeFileSync('./data.json',JSON.stringify(products,null,2))
    res.json(deletedProduct)
})


const connectedServer = app.listen(PORT,()=>{
    console.log(`server is up and running on port ${PORT}`);
})

connectedServer.on('error', ()=> {
    console.log(error.message);
})