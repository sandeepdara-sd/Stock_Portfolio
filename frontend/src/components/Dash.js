import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Box,
  TextField,
  Modal,
  InputAdornment,
} from "@mui/material";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const apiKey = process.env.REACT_APP_STOCK_API_KEY;
const api_url = process.env.REACT_APP_STOCK_API_URL;


const Dash = () => {
  const [stocks, setStocks] = useState([]);
  const [allStocks, setAllStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(20);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [noResults, setNoResults] = useState(false); 
  const [stockSymbol, setStockSymbol] = useState("AAPL");
  const [selectedStock, setSelectedStock] = useState({
    ticker: "",
    buyPrice: 0,
    quantity: 1,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [portfolio, setPortfolio] = useState([]);
 

  const navigate = useNavigate();


  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get(
          `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${apiKey}`
        );
        setAllStocks(response.data); 
        const initialStocks = response.data.slice(0, 20);
        const updatedStocks = await fetchStockPrices(initialStocks); 
        setStocks(updatedStocks);
      } catch (err) {
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, [apiKey]);

  const fetchStockPrices = async (stockList) => {
    try {
      const pricePromises = stockList.map((stock) =>
        axios
          .get(
            `https://finnhub.io/api/v1/quote?symbol=${stock.symbol}&token=${apiKey}`
          )
          .then((response) => ({
            ...stock,
            priceData: response.data,
          }))
          .catch((error) => {
            console.error(`Error fetching price for ${stock.symbol}:`, error);
            return { ...stock, priceData: null }; 
          })
      );
      return await Promise.all(pricePromises);
    } catch (error) {
      console.error("Error fetching stock prices:", error);
      return stockList.map((stock) => ({ ...stock, priceData: null }));
    }
  };

  const debouncedSearch = useMemo(
    () =>
      debounce(async (query) => {
        if (!query.trim()) {
          setFilteredStocks([]);
          setStockSymbol("AAPL"); 
          return;
        }

        try {
          setLoading(true); 
          const lowerCaseQuery = query.toLowerCase();
          const searchResults = allStocks.filter(
            (stock) =>
              stock.symbol.toLowerCase().includes(lowerCaseQuery) ||
              (stock.description &&
                stock.description.toLowerCase().includes(lowerCaseQuery))
          );

          const updatedSearchResults = await fetchStockPrices(searchResults);

          if (updatedSearchResults.length > 0) {
            setStockSymbol(updatedSearchResults[0].symbol);
            setNoResults(false); 
          }else{
            setNoResults(true);
          }

          setFilteredStocks(updatedSearchResults);
        } catch (err) {
          console.error("Error during search:", err);
          setError("Failed to fetch stock data during search.");
        } finally {
          setLoading(false); 
        }
      }, 700),
    [allStocks]
  );
  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const displayedStocks = searchQuery ? filteredStocks : stocks;

  const loadMoreStocks = async () => {
    const nextCount = visibleCount + 20;
    const nextStocks = allStocks.slice(visibleCount, nextCount);
    const updatedStocks = await fetchStockPrices(nextStocks);
    setStocks([...stocks, ...updatedStocks]);
    setVisibleCount(nextCount);
  };

  const handleStockClick = (stock) => {
    setSelectedStock({
      ticker: stock.symbol,
      buyPrice: stock.priceData?.c || 0,
      quantity: 1,
    });
    setModalOpen(true);
  };

  const handleAddStock = async () => {

    const isStockInPortfolio = portfolio.some(
      (item) => item.ticker === selectedStock.ticker
    );
    if (isStockInPortfolio) {
      
      setModalOpen(false)
      Swal.fire({
        icon: "warning",
        title: "Stock Already Exists",
        text: `The stock ${selectedStock.ticker} is already in your portfolio.`,
        confirmButtonText: "OK",
      });
      return; 
    }

    if (selectedStock.buyPrice &&  selectedStock.quantity) {
      try {
        
        const response = await axios.post(`${api_url}/stock/create`, {
          ticker: selectedStock.ticker, 
          buyprice: selectedStock.buyPrice, 
          quantity: selectedStock.quantity, 
          user:localStorage.getItem("userId")
        });

        Swal.fire({
          icon: "success",
          title: "Stock Added Successfully!",
          text: `The stock ${selectedStock.ticker} has been added to your portfolio.`,
          confirmButtonText: "OK",
        });
        
        setPortfolio((prevPortfolio) => [
          ...prevPortfolio,
          {
            ticker: selectedStock.ticker,
            buyPrice: selectedStock.buyPrice,
            quantity: selectedStock.quantity,
          },
        ]);
  
        setModalOpen(false); 
        navigate("/stock-list")
      } catch (error) {
        setModalOpen(false)
        console.error("Error adding stock:", error);
        Swal.fire({
          icon: "error",
          title: "Error Adding Stock",
          text: `There was an error adding the stock: ${error.message}`,
          confirmButtonText: "OK",
        });
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Fields",
        text: "Please fill in all fields (buy price and quantity).",
        confirmButtonText: "OK",
      });
    }
  };
  

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <CircularProgress />
        <Typography variant="h6" style={{ marginTop: "10px" }}>
          Loading...
        </Typography>
      </div>
    );
  }

  if (error) {
    return (
      <Alert severity="error" style={{ marginTop: "90px", textAlign: "center" }}>
        {error}
      </Alert>
    );
  }
  const getColor = (c,pc)=>{
    if(c>pc){
      return "green"
    }
    else if(c<pc){
      return "red"
    }
    else{
      return "default"
    }
  }

  return (
    <div>
     
      
      <Box sx={{ width: "100vw", overflowX: "hidden", margin: 0, padding: 0 ,mt:10}}>
        <Box
          className="tradingview-widget-container"
          sx={{ width: "100vw", height: "50px", margin: 0, padding: 0, overflow: "hidden" }}
        >
          <iframe
            src="https://s.tradingview.com/embed-widget/ticker-tape/?locale=en#%7B%22symbols%22%3A%5B%7B%22proName%22%3A%22NASDAQ%3AAAPL%22%2C%22title%22%3A%22Apple%22%7D%2C%7B%22proName%22%3A%22NASDAQ%3AMETA%22%2C%22title%22%3A%22Meta%22%7D%2C%7B%22proName%22%3A%22NASDAQ%3ATSLA%22%2C%22title%22%3A%22Tesla%22%7D%2C%7B%22proName%22%3A%22NASDAQ%3AGOOG%22%2C%22title%22%3A%22Google%22%7D%2C%7B%22proName%22%3A%22NYSE%3AAMZN%22%2C%22title%22%3A%22Amazon%22%7D%5D%2C%22showSymbolLogo%22%3Atrue%2C%22colorTheme%22%3A%22dark%22%2C%22isTransparent%22%3Afalse%2C%22displayMode%22%3A%22adaptive%22%7D"
            style={{ width: "100%", height: "70px", border: "none", margin: 0, padding: 0 }}
            title="Stock Marquee"
          ></iframe>
        </Box>
      </Box>
      <Box sx={{ padding: "20px" }}>
        <TextField
          label="Search Stocks"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ marginBottom: "20px" }}
        />
        <div style={{ height: "400px", marginBottom: "20px" }}>
          <iframe
            scrolling="no"
            allowtransparency="true"
            frameBorder="0"
            id="tradingview_graph"
            src={`https://s.tradingview.com/widgetembed/?frameElementId=tradingview_graph&symbol=${stockSymbol}&locale=en`}
            style={{ width: "100%", height: "100%" }}
            title="Stock Graph"
          />
        </div>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {displayedStocks.map((stock) => (
          <Grid item xs={12} sm={6} md={4} key={stock.symbol}>
            <Card onClick={() => handleStockClick(stock)} style={{ cursor: "pointer" }} sx={{border:'1px solid grey',
        '&:hover': {
          transform: 'scale(1.05)',  
          boxShadow: 6,  
          transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
        },
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',  
      }}>
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  {stock.symbol}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stock.description}
                </Typography>
                <Typography variant="body2" style={{ marginTop: "8px" }}>
                  Currency: {stock.currency}
                </Typography>

                {stock.priceData ? (
                  <Box style={{ marginTop: "15px" }}>
                    <Typography
                      variant="h6"
                      color={getColor(stock.priceData.c,stock.priceData.pc) }
                    >
                      ${stock.priceData.c.toFixed(2)}
                    </Typography>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      style={{ marginTop: "5px" }}
                    >
                      <Typography variant="body2" color="green">
                        High: ${stock.priceData.h.toFixed(2)}
                      </Typography>
                      <Typography variant="body2" color="red">
                        Low: ${stock.priceData.l.toFixed(2)}
                      </Typography>
                    </Box>
                  </Box>
                ) : (
                  <Typography variant="body2" color="text.secondary" style={{ marginTop: "15px" }}>
                    Price data not available
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {noResults && (
          
          <Alert severity="error" sx={{ marginTop: 3 }}>
            No stocks found matching the searched name
          </Alert>
        )}
      
      {visibleCount < allStocks.length && (
        <Button
          variant="outlined"
          
          onClick={loadMoreStocks}
          style={{ marginTop: "20px", display: "block", margin: "20px auto" }}
        >
          Load More
        </Button>
      )}

     
<Modal open={modalOpen} onClose={() => setModalOpen(false)}>
  <Box sx={{ padding: "20px", width: 400, margin: "100px auto", backgroundColor: "white" }}>
    <Typography variant="h6">Add {selectedStock?.ticker} to Portfolio</Typography>

    <TextField
      label="Ticker"
      value={selectedStock?.ticker}
      disabled
      fullWidth
      margin="normal"
    />
    <TextField
      label="Buy Price"
      value={selectedStock?.buyPrice || ""}
      onChange={(e) => {
        const value = e.target.value;
        setSelectedStock((prevState) => ({
          ...prevState,
          buyPrice: value ? parseFloat(value) : 0,
        }));
      }}
      fullWidth
      margin="normal"
      type="number"
      InputProps={{
        startAdornment: <InputAdornment position="start">$</InputAdornment>, // Optional dollar sign
      }}
    />

  
    <TextField
      label="Quantity"
      type="number"
      value={selectedStock?.quantity}
      onChange={(e) => {
        const value = e.target.value;
        setSelectedStock((prevState) => ({
          ...prevState,
          quantity: value ? parseInt(value) : 1,
        }));
      }}
      fullWidth
      margin="normal"
    />

    <Box sx={{ textAlign: "right", marginTop: "20px" }}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddStock}
      >
        Add to Portfolio
      </Button>
    </Box>
  </Box>
</Modal>
</div>
    //   }
    // </div>
  );
};

export default Dash;