import e from 'express'
import { allStocks, createStock, deleteStock, updateStock, viewStock } from '../controller/Stock-Controller.js'


const router = e.Router()

router.post("/create",createStock)
router.get("/stocks",allStocks)
router.get("/stock/:ticker",viewStock)
router.put("/update/:id",updateStock)
router.delete("/delete/:id",deleteStock)

export default router