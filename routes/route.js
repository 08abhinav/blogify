import express from "express"
import { handlerUserLogout, handleUserSignIn, handleUserSignUp } from "../controller/control.js";
import {handleCreatingBlog} from "../controller/blogControls.js"
import { uploads } from "../controller/blogControls.js";
const route = express.Router();

route.post("/signup", handleUserSignUp)
route.post("/signin", handleUserSignIn)
route.get("/logout", handlerUserLogout)

//blog routes
route.post("/addblog",uploads.single("coverImg"),handleCreatingBlog)

export default route;