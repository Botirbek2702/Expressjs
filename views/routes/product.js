import { Router } from "express"
const router = Router()
router.get('/' , (req,res) =>{
    res.render("index",{
        title:"Boom shop"
    })
})

router.get('/add' , (req,res) =>{
    res.render("add", {
        title:"Add"
    })
})
router.get('/product' , (req,res) =>{
    res.render("product", {
        title:"product"
    })
})
export default router