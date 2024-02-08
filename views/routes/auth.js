import {Router} from "express"
import User from "/Botirbek/ExpresJs/Model/User.js"
import bcrypt from "bcrypt"
import {generateJWTToken}  from "/Botirbek/ExpresJs/servises/token.js"

const router = Router()

router.get('/login' , (req,res) =>{
    if(req.cookies.token){
        res.redirect("/")
        return
    }
    res.render("login" ,{
        title:"login",
        loginError: req.flash("loginError")
    })
})

router.get('/register' , (req,res) =>{
    res.render("register",{
        title:"regester",
        registerError: req.flash("registerError")
    })
})

router.post("/login" , async (req,res) =>{
    const {email , password} = req.body

    if( !email || !password){
        req.flash("loginError" , "Hammasini to'ldiring ")
        res.redirect("/login")
        return
    }

    const existUser = await User.findOne({email: email})
    if(!existUser){
        req.flash("loginError" , "Email topilmadi ")
        res.redirect("/login")
        return
    }
    const isPassword = await bcrypt.compare(password, existUser.password)
    if(!isPassword){
        req.flash("loginError" , "Parol hato ")
        res.redirect("/login")
        return
    }
    const token = generateJWTToken(existUser._id)
    res.cookie("token" , token , {httpOnly:true , secure:true})
    res.redirect('/')
})
router.get("/logout" , (req , res) =>{
    res.clearCookie("token")
    res.redirect("/")
})
router.post("/register", async (req,res) => {
    const {firstName, lastName,email,password} = req.body
    if(req.cookies.token){
        res.redirect("/")
        return
    }
    if(!firstName || !lastName || !email || !password){
        req.flash("registerError" , "Hammasini to'ldiring ")
        res.redirect("/register")
        return
    }

    const candidate = await User.findOne({email})

    if(candidate){
        req.flash("registerError" , "Bu email ro'yhatdan o'tgan  ")
        res.redirect("/register")
        return
    }

    const hashpass = await bcrypt.hash(password, 10)
    const userData = {
        firstName:firstName,
        lastName:lastName,
        email:email,
        password: hashpass,
    }
    const user = await User.create(userData)
    const token = generateJWTToken(user._id)
    res.cookie("token" , token , {httpOnly:true , secure:true})
    res.redirect('/')
})

export default router
