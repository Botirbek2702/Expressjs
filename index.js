import express from "express"
import { create, engine } from 'express-handlebars';
import * as dotenv from "dotenv"
import auth from "./views/routes/auth.js"
import product from "./views/routes/product.js"
import mongoose from "mongoose";
import flash from "connect-flash"
import session from "express-session"
dotenv.config()
// DB connect
mongoose.connect(process.env.Mongo_Uri,).then(() =>console.log("MONGODB connect"),).catch((err) => console.log("ERRor" , err))

const app = express()

const hbs =create({defaultLayout: "main" , extname: "hbs"})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');

app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
app.use(session({secret: "Botir" , resave:false , saveUninitialized :false}))
app.use(flash())
app.use(express.json())



app.use(auth)
app.use(product)




const PORT =process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})