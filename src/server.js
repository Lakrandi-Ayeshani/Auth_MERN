const express = require("express");
const dotenv = require("dotenv");
const { userRouter } = require("./routes/user");
const { notFound, errorHandler } = require('./middleware/errorMiddleware.js');
const { connectDB } = require("./config/db");
dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.get("/", (req, res) => res.send("Server is running correctly"));
app.use('/api/user', userRouter)

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is started on port ${PORT}`))