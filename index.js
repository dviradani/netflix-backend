import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import seedRouter  from './Routes/seedRoutes.js';
import userRouter from './Routes/userRoute.js';
import contentRouter from './Routes/contentRoute.js';
import searchRouter from './Routes/searchRoute.js';

dotenv.config();

const PORT = process.env.PORT || 6000;

const app = express()

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/seed/resetData" , seedRouter)
app.use("/api/users" , userRouter)
app.use("/api/content" , contentRouter)
app.use("/api/search" , searchRouter)

mongoose.connect(process.env.MONGO_DB_URI).then(() => {
    app.listen(PORT);
    console.log(`Server running on port ${PORT}`);
}).catch(err => console.log(err));