import express from "express"
import mongoose from "mongoose"
import { create, engine } from 'express-handlebars';
import * as dotenv from "dotenv"
import auth from "./views/routes/auth.js"
import product from "./views/routes/product.js"
dotenv.config()
const app = express()
const hbs =create({defaultLayout: "main" , extname: "hbs"})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');app.use(auth)
app.use(product)
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
app.use(express.json())






mongoose.set("strictQuery" , false)
mongoose.connect(process.env.Mongo_Uri,{ useNewUrlParser: true }, () => console.log("Mongodb conected"))

const PORT =process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})