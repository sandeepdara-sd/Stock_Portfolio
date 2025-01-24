# Stock Portfolio Management System 📊

A full-featured **Stock Portfolio Management System** built using the **MERN stack**. This application allows users to manage their stock investments efficiently by fetching real-time stock data, monitoring portfolio performance, and analyzing trends.

---

## 🚀 Features

- **Real-Time Stock Data:** Fetch live stock prices, trends, and performance using external APIs (e.g., Finhub API).
- **Portfolio Management:** Add, update, and remove stock entries in your portfolio.
- **Analytics:** Visualize portfolio performance with dynamic charts and key metrics.
- **User Authentication:** Secure login and signup using JWT-based authentication.
- **Responsive Design:** Works seamlessly across all devices.
- **Interactive UI:** Built with React for a smooth user experience.

---


## 🌐 Deployment

The application is live at [Stock Portfolio Management System](https://sd-stock-portfolio.vercel.app/).


## 🛠️ Technologies Used

### Frontend
- **React.js**: For building the user interface.
- **Material-UI**: For sleek and responsive design components.
- **Axios**: To handle API calls for fetching real-time stock data.

### Backend
- **Node.js**: As the runtime environment.
- **Express.js**: For creating RESTful APIs.
- **MongoDB**: As the database to store user data and portfolio information.

### Other Tools
- **Mongoose**: For seamless MongoDB integration.
- **JWT (JSON Web Token)**: For secure user authentication.
- **Finhub API**: To fetch real-time stock data.

---

## 🛠️ Folder Structure

```
stock-portfolio/
├── backend/              # Backend server
│   ├── index.js          # Entry point for the server
│   ├── model/            # Mongoose models
│   │   ├── User.js       # User schema
│   │   └── Stock.js      # Stock schema
│   ├── controller/       # Controllers for handling logic
│   │   ├── User-Controller.js
│   │   └── Stock-Controller.js
│   ├── routes/           # API routes
│       ├── User-Router.js
│       └── Stock-Router.js
├── frontend/             # Frontend application
│   ├── public/           # Static assets
│   └── src/
│       ├── components/   # React components
│       │   ├── Dash.js
│       │   ├── Home.js
│       │   ├── Navbar.js
│       │   ├── Signup.js
│       │   ├── Login.js
│       │   ├── StockList.js
│       │   ├── ThemeProvider.js
│       │   └── UserDetail.js
│       ├── store/        # State management
│       │   └── index.js
│       ├── App.js        # Main application component
│       └── index.js      # Entry point for the frontend
└── README.md             # Project documentation
```

---

## 📚 API Endpoints

### Stock Routes
- **POST `/create`**: Create a new stock entry.
- **GET `/stocks`**: Retrieve all stocks.
- **GET `/stocks/:id`**: Retrieve stocks by user ID.
- **PUT `/update/:id`**: Update a stock entry.
- **DELETE `/delete/:id`**: Delete a stock entry.

### User Routes
- **POST `/signup`**: Register a new user.
- **POST `/login`**: Authenticate a user.
- **GET `/userdetails/:id`**: Retrieve user details by ID.
- **GET `/refresh`**: Refresh authentication token (with middleware).
- **POST `/logout`**: Log out a user (with middleware).

---

## 📄 Setup Instructions

### Prerequisites
Ensure you have the following installed:
- **Node.js** 
- **MongoDB**
- **npm** 

### Clone the Repository
```bash
git clone https://github.com/sandeepdara-sd/stock-portfolio.git
cd stock-portfolio
```

### Install Dependencies
For both the backend and frontend:
```bash
# Navigate to the backend
cd backend
npm install

# Navigate to the frontend
cd ../frontend
npm install
```

### Configure Environment Variables
Create a `.env` file in the `backend` directory and include the following:
```env

MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret

```

Create a `.env` file in the `frontend` directory and include the following:
```env

REACT_APP_STOCK_API_KEY=your-finhub-api-key
REACT_APP_STOCK_API_URL=your-backend-connection-string 

```


### Run the Application
Start the server and the client:
```bash
# In the backend directory
npm start

# In the frontend directory
npm start
```

The client will run on `http://localhost:3000` and the server will run on `http://localhost:5000`.

---


## 👨‍💻 Future Enhancements

- Add support for multiple stock exchanges.
- Include a stock comparison tool.
- Implement advanced analytics using AI/ML models.

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request to improve the project.

---

## 🖋️ License

This project is licensed under the [MIT License](LICENSE).

---

## 🙌 Acknowledgements

- [Finhub API](https://www.finhub.io) for stock data.
- Open-source libraries and frameworks used in this project.

