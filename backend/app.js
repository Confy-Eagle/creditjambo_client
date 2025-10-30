const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors')
const dotenv = require('dotenv');
dotenv.config();


const authRoutes = require('./routes/authRoutes');
const deviceRoutes = require('./routes/deviceRoutes');
const transactionRoutes = require('./routes/transactionRoutes');



const app = express();

app.use(helmet());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "x-device-id"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));
app.use(express.json());

const limiter = rateLimit({ windowMs: 60 * 1000, max: 60 });
app.use(limiter);
app.use('/api/auth', authRoutes);
app.use('/api/devices', deviceRoutes);
app.use('/api/transactions', transactionRoutes);


app.get('/', (req, res) => res.send('Credit Jambo Savings Management API'));
app.get("/api/test", (req, res) => res.json({ message: "Client backend running ✅" }));


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`)
});
