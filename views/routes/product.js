import { Router } from "express"
import Add from "../../Model/productdb.js"
import authMidle from "../../midle/userMD.js"
import userMD from "/Botirbek/ExpresJs/midle/userMD.js"
const router = Router()
router.get('/' , (req, res ) =>{
    res.render("index",{
        title:"Boom shop",
    })
})

router.get('/add' , authMidle, (req,res) =>{
    res.render("add", {
        title:"Add",
        AddProduct: req.flash("AddProduct")
    })
})
router.get('/product' , (req,res) =>{
    res.render("product", {
        title:"product",
    })
})
router.post("/add-product" , userMD, async (req,res) =>{
    const {title,description, image, price} = req.body
    if(!title || !description|| !image || !price){
        req.flash("AddProduct" , "Hammasini to'ldiring ")
        res.redirect("/add")
        return
    }

    const  Add_product = await Add.create({...req.body, user: req.userId})
    res.redirect("/")
})
export default router