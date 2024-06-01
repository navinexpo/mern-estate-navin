import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from './routes/listing.route.js'
//for deployment
import path from 'path';

dotenv.config();
//connect to the DB using mongodb
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to Mongo DB!");
  })
  .catch((error) => {
    console.log(error);
  });

  //create a dynamic path name here beow
  const __dirname = path.resolve();

const app = express();

//this will allow json as an input of the server to read the data.
app.use(express.json());
app.use(cookieParser());
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

//Create API routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

//for deplyment
app.use(express.static(path.join(__dirname, '/client/dist')));
//address excluding the above .use paths
app.get('*', (req, res)=> {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})
 
//handle errors
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  console.error("Error handling middleware:", err);
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
