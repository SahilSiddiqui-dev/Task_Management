require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const taskRoutes = require('./router/taskRoutes');
const PORT = process.env.PORT || 3000;
// 1. CORS (Cross-Origin Resource Sharing):
// Browsers block frontend apps (e.g., localhost:5173) from calling backends on a different port (e.g., localhost:5000).
// app.use(cors()) unlocks access so your React frontend is allowed to make API requests to this server.
const cors = require('cors');
const app = express();

const startServer = async() => {
    await connectDB();
    
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
    
    
}

app.use(cors()); 
app.use(express.json());

app.use('/api/tasks', taskRoutes);

startServer();
