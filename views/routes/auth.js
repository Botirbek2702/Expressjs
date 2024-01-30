import {Router} from "express"
import User from "/Expressjs/Model/User.js"
const router = Router()

router.get('/login' , (req,res) =>{
    res.render("login" ,{
        title:"login"
    })
})

router.get('/register' , (req,res) =>{
    res.render("register",{
        title:"regester"
    })
})

router.post("/login" , (req,res) =>{
    console.log(req.body);
    res.redirect('/')
})
router.post("/register", async (req,res) => {
    const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
    }
    const user = await User.create(userData)
    console.log(user);
    res.redirect('/')
})

export default router
