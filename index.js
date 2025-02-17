
import express from 'express';
const app = express();
import dotenv from "dotenv"
import bodyParser from 'body-parser';
import cors from "cors"
import testConnection from './src/config/database.js';
import authRouterLogin from './src/routes/authRouteLogin.js';
import authRouterSignup from './src/routes/authRouteSignup.js';
import bookRouter from './src/routes/bookRoute.js';
import authMiddleware from './src/middleware/authMiddleware.js';
// import { filterMiddleware } from './src/middleware/filterMiddleware.js';
import filterRouter from './src/routes/filterRoute.js';
// import profileMiddleware from './src/middleware/profileMiddleware.js';
import profileRouter from './src/routes/userProfileRoute.js';
import exchangeRouter from './src/routes/exchangeBookRoute.js';
// import exchangeBookMiddleware from './src/middleware/exchangeBookMiddleware.js';
import matchMakingRouter from './src/routes/matchMakingRouter.js';
import cookieParser from 'cookie-parser';
import authRouter from './src/routes/authRouter.js';

dotenv.config();
const PORT = process.env.PORT; 


app.use(cors({origin:true,credentials:true}));
app.use(bodyParser.json());
app.use(cookieParser());

testConnection(); 

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/auth', authRouter);
app.use('/login', authRouterLogin);
app.use('/signup', authRouterSignup);
app.use('/api/books', authMiddleware, bookRouter)
app.use('/api/filter', authMiddleware, filterRouter);
app.use('/api/profile', authMiddleware, profileRouter);
app.use('/api/exchange', authMiddleware, exchangeRouter);
app.use('/api/matchmaking',authMiddleware,matchMakingRouter)


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
