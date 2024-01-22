import express from "express"
import { create, engine } from 'express-handlebars';
const app = express()

const hbs =create({defaultLayout: "main" , extname: "hbs"})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');
import auth from "./views/routes/auth.js"
import product from "./views/routes/product.js"

// app.get('/main' , (req,res) =>{
//     res.render("main")
// })

app.use(auth)
app.use(product)





const PORT =process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})