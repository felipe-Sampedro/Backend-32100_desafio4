const express = require('express')
const fs =require('fs')
const { products } = require('../../data/data');
const router = express.Router()

router.get('/',(req,res,next)=>{
    console.log(req.query);
    res.json(products)
})

router.get('/:id',(req,res,next)=>{
    const {id} = req.params
    console.log(req.params);
    const idProduct = products.findIndex((p)=>p.id=== +(id))
    if (idProduct<0){
        return res.status(400).send(`Producto con id ${id} no existe`)
    }
    const product = products.find((p)=>p.id=== +(req.params.id))
    res.json(product)
})

router.post('/',(req,res,next)=>{
    console.log(req.body);
    const {title,price,thumbnail} = req.body;
    const newProduct={
        title,
        price,
        thumbnail,
        id:products.length +1,
    }
    console.log(newProduct);
    products.push(newProduct)
    // fs.writeFileSync('./data.json',JSON.stringify(products,null,2))
    res.json(newProduct)
})



router.put('/:id',(req,res,next)=>{
    const {id, title, price, thumbnail} = req.params;
    const indProduct = products.findIndex((p)=>p.id=== +(id))
    if (indProduct<0){
        return res.status(400).send(`Producto con id ${id} no existe`)
    }
    const actProduct = {  
        ...products[indProduct],
        title,
        price,
        thumbnail,
    };
    products[indProduct]=actProduct;
    console.log(products[indProduct]);
    // fs.writeFileSync('./data.json',JSON.stringify(products,null,2))
    res.json(actProduct)
})


router.delete('/:id',(req,res,next)=>{
    const {id} = req.params;
    const indProduct = products.findIndex((p)=>p.id=== +(id))
    if (indProduct<0){
        return res.status(400).send(`Producto con id ${id} no existe`)
    }
    const deletedProduct = products.splice(indProduct,1)
    fs.writeFileSync('./data.json',JSON.stringify(products,null,2))
    res.json(deletedProduct)
})





module.exports = router