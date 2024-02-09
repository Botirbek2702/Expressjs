import { Router } from "express"
import Add from "../../Model/productdb.js"
import authMidle from "../../midle/userMD.js"
import userMD from "/Botirbek/ExpresJs/midle/userMD.js"
const router = Router()
router.get('/' , async (req, res ) =>{
    const products = await  Add.find().lean()
    res.render("index",{
        title:"Boom shop | Botir",
        products:products.reverse(),
        userId: req.userId ? req.userId.toString() : null,
    })
})

router.get('/add' , authMidle, (req,res) =>{
    res.render("add", {
        title:"Add",
        AddProduct: req.flash("AddProduct")
    })
})
router.get('/product' , async (req,res) =>{
    const user = req.userId ? req.userId.toString() : null
    const myProduct= await Add.find({user}).populate("user").lean()
    res.render("products", {
        title:"products",
        myProduct:myProduct,
    })
})
router.get("/product/:id", async (req,res) =>{
    const id = req.params.id
    const productDT = await Add.findById(id).populate("user").lean()
    res.render("detail", {
        product : productDT,
    })
})
router.post("/add-product" , userMD, async (req,res) =>{
    const {title,description, image, price} = req.body
    if(!title || !description|| !image || !price){
        req.flash("AddProduct" , "Hammasini to'ldiring ")
        res.redirect("/add")
        return
    }

    await Add.create({...req.body, user: req.userId})
    res.redirect("/")
})
export default router