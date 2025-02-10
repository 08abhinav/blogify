import express from "express";
import path from "path"
import cookieParser from 'cookie-parser';
import {checkForAuthentication} from './middleware/authentication.js'
import favicon from 'serve-favicon';
import {PORT, dbConnection} from "./config.js"
import route from "./routes/route.js"
import staticRoute from "./routes/staticRoutes.js";

const app = express();
app.use(favicon(path.resolve('./public', 'favicon.ico')));
app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(checkForAuthentication("token"))
app.use(express.static(path.resolve('./public')))

app.use('/', staticRoute) 
app.use("/user", route)

app.listen(PORT, ()=>console.log(`App running on port: ${PORT}`))

dbConnection("mongodb://127.0.0.1:27017/blogify")
.then(()=>console.log("Database connected successfully"))
.catch((err)=>console.log(err))
