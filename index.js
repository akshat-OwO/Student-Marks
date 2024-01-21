require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const postRouter = require("./routes/POST");

const getRouter = require("./routes/GET");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ msg: "hello world" });
});

app.use("/", postRouter);
app.use("/", getRouter);

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("server is running on port", process.env.PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    });
