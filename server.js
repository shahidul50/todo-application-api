import express from 'express';
import cors from 'cors'
import 'dotenv/config';
import morgan from 'morgan';
import cookiePerser from 'cookie-parser';


//my files
import connectDB from './confiq/db.js';
import userRoutes from './routes/userRoutes.js';  
import todoRoutes from './routes/todoRoutes.js';  
import {notFound, errorHandler} from './middlewares/errorMiddleware.js';

//initialize express
const app = express();

//CORS(cross origin resource sharing) communication and exchanging data
app.use(cors({
  origin: 'https://todo-application-api-production.up.railway.app',
  credentials: true,
}))
app.use(morgan('dev'));
//parse sending data into json formate
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookiePerser());

const PORT = process.env.PORT || 5000

//connection to the database
connectDB();

//user api
app.use('/api/users', userRoutes)
app.use('/api/todos', todoRoutes)

console.log(process.env.NODE_ENV);
//error Handler
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, ()=> {
    console.log(`Server started on port ${PORT}`);
})
