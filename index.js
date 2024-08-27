
import express from 'express';
const app = express();
import dotenv from "dotenv"
import bodyParser from 'body-parser';
import cors from "cors"
import  loginController from './src/controllers/loginController.js';
import signupController from './src/controllers/signupController.js';
import testConnection from './src/config/database.js';
import authRouterLogin from './src/routes/authRouteLogin.js';
import authRouterSignup from './src/routes/authRouteSignup.js';
dotenv.config();
const PORT = process.env.PORT; 


app.use(cors());
app.use(bodyParser.json());

testConnection(); 

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/login', authRouterLogin);
app.use('/signup', authRouterSignup);

console.log(process.env.PORT)
console.log(process.env.DATABASE_URL)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
