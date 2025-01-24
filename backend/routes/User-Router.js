import express from 'express'
import { getUser,  login, logout, refreshToken, signup, VerifyToken } from '../controller/User-Controller.js'

const router = express.Router()

router.post("/signup",signup)
router.post("/login",login)
router.get("/userdetails/:id",getUser)
router.get("/refresh",refreshToken,VerifyToken,getUser)
router.post("/logout",VerifyToken,logout)
// router.get("/useretails/:id",getUserById)

export default router