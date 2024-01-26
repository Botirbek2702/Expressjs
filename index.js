import express from "express"
import { create, engine } from 'express-handlebars';
const app = express()

const hbs =create({defaultLayout: "main" , extname: "hbs"})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
import auth from "./views/routes/auth.js"
import product from "./views/routes/product.js"

app.use(auth)
app.use(product)





//1GN32zKYNIeLQLeL  
//mongodb+srv://userbotirbek2702:<password>@cluster0.h3tbroj.mongodb.net/?retryWrites=true&w=majority
const PORT =process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})