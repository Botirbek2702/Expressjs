import { Router } from "express"
const router = Router()
router.get('/' , (req,res) =>{
    res.render("index")
})

router.get('/add' , (req,res) =>{
    res.render("add")
})
router.get('/product' , (req,res) =>{
    res.render("product")
})
export default router