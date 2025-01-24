import Stock from "../model/Stock.js";
import User from "../model/User.js";
import mongoose from "mongoose";



export const createStock = async (req, res) => {
    const { ticker, buyprice, quantity, user } = req.body;
    let existingUser;

    try {
        existingUser = await User.findById(user);
         
    } catch (err) {
        return console.log(err);
    }

    if (!existingUser) {
        return res.status(400).json({ message: 'Unable to find the user with this ID' });
    }    

    let existingTicker;
    
    try {
        existingTicker = await Stock.findOne({ ticker });
    } catch (e) {
        console.error("Error checking if stock exists:", e.message);
        return res.status(500).json({ message: "Internal server error" });
    }

    if (existingTicker) {
        return res.status(400).json({ message: "Stock already exists" });
    }

    const stock = new Stock({
        ticker,
        buyprice,
        quantity,
        user,
    });

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await stock.save({ session });
        existingUser.stocks.push(stock);
        await existingUser.save({ session });

        await session.commitTransaction();
        session.endSession();
        return res.status(201).json({ message: "Stock created successfully", stock });
    } catch (e) {
        console.error("Error creating stock:", e.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const allStocks = async (req, res) => {
    try {
        const stocks = await Stock.find().populate('user');
        if (!stocks || stocks.length === 0) {
            return res.status(404).json({ message: "No stocks found", stocks: [] });
        }
        return res.status(200).json({ message: "Stocks found successfully", stocks });
    } catch (e) {
        console.error("Error fetching stocks:", e.message);
        return res.status(500).json({ message: "Internal server error", stocks: [] });
    }
};


export const updateStock = async (req, res) => {
    const { buyprice, quantity } = req.body;
    const { id } = req.params;

    try {
        const existingStock = await Stock.findById(id);
        if (!existingStock) {
            return res.status(404).json({ message: "Stock not found" });
        }

        const updatedStock = await Stock.findByIdAndUpdate(
            id,
            { buyprice, quantity },
            { new: true }
        );

        return res.status(200).json({
            message: "Successfully updated the stock",
            stock: updatedStock,
        });
    } catch (e) {
        console.error("Error updating stock:", e.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteStock = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedStock = await Stock.findByIdAndDelete(id).populate('user');
        if (!deletedStock) {
            return res.status(404).json({ message: "Stock not found" });
        }

        return res.status(200).json({ message: "Stock successfully deleted", stock: deletedStock });
    } catch (e) {
        console.error("Error deleting stock:", e.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const viewStock = async (req, res) => {
    const { ticker } = req.params; 

    let stock;

    try {
        stock = await Stock.findOne({ ticker });  
    } catch (e) {
        return console.error("Error fetching stock:", e.message);
    }

    if (!stock) {
        return res.status(404).json({ message: "No stock found with the provided ticker!" });
    }

    return res.status(200).json({ stock });
};

export const getById=async(req,res,next)=>{
    const id=req.params.id;
    let stock;
    try{
        stock = await Stock.findById(id)
    }catch(err){

        return console.log(err);
    }

    if(!stock){
        return res.status(404).json({message: "No user found with the given ID!"})
    }
    return res.status(200).json({stock})

}
export const getByUserId= async(req,res,next)=>{
    const id = req.params.id;
    let userStock;
    try{
        userStock = await User.findById(id).populate('stocks')
    }catch(err){
        return console.log(err);
    }

    if(!userStock){
        return res.status(404).json({message:"No Stocks Found"})
    }
    return res.status(200).json({user:userStock})
}