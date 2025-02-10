import {UserModel} from "../models/user.js"

export async function handleUserSignUp(req, res){
    try {
        const {fullName, email, password} = req.body;
        if(!fullName || !email || !password) return res.status(400).json({"message": "All fields are necessary"})
        await UserModel.create({
            fullName,
            email,
            password
        })
        res.redirect("/")
    } catch (error){
        return res.status(500).json({"err": error})
    }
}


export async function handleUserSignIn(req, res){
    try {
        const {email, password} = req.body
        if(!email || !password) return res.status(400).json({"message": "All fields are required."});

        const token = await UserModel.matchPasswordAndGenearteToken(email, password)  
        return res.cookie("token", token).redirect("/")
    } catch (error) {   
        return res.render('login', {
            error: "Incorrect Email or Password."
        })
    }
}

export async function handlerUserLogout(req, res){
    res.clearCookie("token").redirect('/')
}

