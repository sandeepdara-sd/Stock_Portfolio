import e from 'express'
import { allStocks, createStock, deleteStock, getByUserId, updateStock, viewStock } from '../controller/Stock-Controller.js'


const srouter = e.Router()

srouter.post("/create",createStock)
srouter.get("/stocks",allStocks)
srouter.get("/stocks/:id",getByUserId)
srouter.put("/update/:id",updateStock)
srouter.delete("/delete/:id",deleteStock)

export default srouter