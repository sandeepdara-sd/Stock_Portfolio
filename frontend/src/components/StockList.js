import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  IconButton,
  Typography,
  Alert,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
  Card,
  CardContent,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import Swal from "sweetalert2";

const api_key = process.env.REACT_APP_STOCK_API_KEY;
const api_url = process.env.REACT_APP_STOCK_API_URL;

const StockList = () => {
  const [stocks, setStocks] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [totalValue, setTotalValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentStock, setCurrentStock] = useState({});
  const [updatedStock, setUpdatedStock] = useState({
    buyPrice: "",
    quantity: "",
  });

  const userId = localStorage.getItem("userId")

  useEffect(() => {
    // console.log('UserId:', userId); 
    if (userId) {
      fetchStocks();
    }
  }, [userId]);

  const fetchStocks = async () => {
    try {
      const response = await axios.get(`${api_url}/stock/stocks/${userId}`);
      // console.log("Fetched stocks:", response.data); 
      const stocksData = response.data.user.stocks;
      setStocks(stocksData);
      calculateTotalValue(stocksData);
      fetchOngoingPrices(stocksData);
    } catch (error) {
      console.error("Error fetching stocks:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOngoingPrices = async (stocksData) => {
    try {
      const updatedStocks = await Promise.all(
        stocksData.map(async (stock) => {
          try {
            const response = await axios.get(
              `https://finnhub.io/api/v1/quote?symbol=${stock.ticker}&token=${api_key}`
            );
            const { c: currentPrice } = response.data;
            return { ...stock, ongoingPrice: currentPrice };
          } catch (error) {
            console.error(`Error fetching price for ${stock.ticker}:`, error);
            return { ...stock, ongoingPrice: null };
          }
        })
      );
      setStocks(updatedStocks);
      calculateTotalValue(updatedStocks);
    } catch (error) {
      console.error("Error fetching ongoing stock prices:", error);
      Swal.fire("Error", "There was an issue fetching stock prices.", "error");
    }
  };

  const calculateTotalValue = (stocksData) => {
    const portfolioValue = stocksData.reduce(
      (total, stock) => total + stock.buyprice * stock.quantity,
      0
    );
    setTotalValue(portfolioValue);
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        await axios.delete(`${api_url}/stock/delete/${id}`);
        const updatedStocks = stocks.filter((stock) => stock._id !== id);
        setStocks(updatedStocks);
        calculateTotalValue(updatedStocks);
        Swal.fire("Deleted!", "The stock has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error deleting stock:", error);
      Swal.fire("Error", "There was an issue deleting the stock.", "error");
    }
  };

  const handleEdit = (stock) => {
    setCurrentStock(stock);
    setUpdatedStock({
      buyprice: stock.buyprice,
      quantity: stock.quantity,
    });
    setOpenEditDialog(true);
  };

  const handleChange = (e) => {
    setUpdatedStock({
      ...updatedStock,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `${api_url}/stock/update/${currentStock._id}`,
        updatedStock
      );
      const updatedStocks = stocks.map((stock) =>
        stock._id === currentStock._id ? response.data.stock : stock
      );
      setStocks(updatedStocks);
      calculateTotalValue(updatedStocks);
      setOpenEditDialog(false);
      Swal.fire("Updated!", "The stock details have been updated.", "success");
    } catch (error) {
      console.error("Error updating stock:", error);
      Swal.fire("Error", "There was an issue updating the stock.", "error");
    }
  };

  const filteredStocks = Array.isArray(stocks)
    ? stocks.filter((stock) =>
        stock.ticker.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // console.log("Filtered Stocks:", filteredStocks);
  if (loading) {
    return (
      <CircularProgress
        sx={{ display: "block", margin: "auto", marginTop: "20%" }}
      />
    );
  }

  const getPriceColor = (buyPrice, ongoingPrice) => {
    if (ongoingPrice < buyPrice) {
      return "red";
    }
    if (ongoingPrice > buyPrice) {
      return "green";
    }
    return "default";
  };

  return (
    <div style={{ padding: "40px 20px" , marginTop:60}}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ marginBottom: 3 }}
      >
        <strong>Stocks Portfolio</strong>
      </Typography>

      <Card sx={{ marginBottom: 4, backgroundColor: "#f5f5f5" }}>
        <CardContent>
          <Typography variant="h6" align="center" color="textSecondary">
            <strong>Total Portfolio Value: </strong> ₹{totalValue.toFixed(2)}
          </Typography>
        </CardContent>
      </Card>

      <TextField
        label="Search Stocks"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ marginBottom: 3 }}
      />

      {Array.isArray(filteredStocks) && filteredStocks.length > 0 ? (
        <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Ticker</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Buy Price</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Current Price</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Quantity</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStocks.map((stock) => (
                <TableRow key={stock._id} >
                  <TableCell>{stock.ticker}</TableCell>
                  <TableCell align="right">{stock.buyprice}</TableCell>
                  <TableCell
                    align="right"
                    sx={{ color: getPriceColor(stock.buyprice, stock.ongoingPrice) }}
                  >
                    {stock.ongoingPrice
                      ? stock.ongoingPrice.toFixed(2)
                      : "Loading..."}
                  </TableCell>
                  <TableCell align="right">{stock.quantity}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Edit" arrow>
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(stock)}
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete" arrow>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(stock._id)}
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Alert severity="warning" sx={{ marginTop: 3 }}>
          No stocks found matching the search criteria.
        </Alert>
      )}

      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Stock - {currentStock.ticker}</DialogTitle>
        <DialogContent>
          <TextField
            label="Buy Price"
            name="buyprice"
            type="number"
            fullWidth
            value={updatedStock.buyprice}
            onChange={handleChange}
            sx={{ marginBottom: 2, marginTop: 2 }}
          />

          <TextField
            label="Quantity"
            name="quantity"
            type="number"
            fullWidth
            value={updatedStock.quantity}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenEditDialog(false)}
            color="secondary"
          >
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default StockList;
