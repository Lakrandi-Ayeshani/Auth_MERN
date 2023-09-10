const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
const { userRouter } = require("./routes/user");
const { notFound, errorHandler } = require('./middleware/errorMiddleware.js');
const { connectDB } = require("./config/db");
dotenv.config();
const PORT = process.env.PORT;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.get("/", (req, res) => res.send("Server is running correctly"));
app.use('/api/user', userRouter)

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is started on port ${PORT}`))