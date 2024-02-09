import jwt from "jsonwebtoken"
import User from "../Model/User.js"

export default async function (req,res,next) {
    if(!req.cookies.token){
        next()
        return
    }

    const token = req.cookies.token
    const decode = jwt.verify(token, process.env.JWT_secret)
    const usertoken = await User.findById(decode.userId)
    req.userId = usertoken._id
    next()
}