const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const app = express();

const pageNotFound = require("./middleware/errorPage");

//Route Import
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");

// Middeleware
dotenv.config();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.json({ limit: "60mb" }));
app.use(express.urlencoded({ limit: "60mb", extended: true }));

// Routes
app.use("/api", productRoute);
app.use("/api", userRoute);
app.use("/api", adminRoute);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/client/build")));
    app.get("*", (req, res) =>
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    );
} else {
    app.get("/", (req, res) => {
        res.send("Server working 🔥");
    });
}

app.get("/api/config/paypal", (req, res) => {
    res.send(process.env.PAYPAL_CID);
});

app.use(pageNotFound);
mongoose.connect(
    process.env.DB_CONNECT,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    },
    (err) => {
        if (err) return console.error(err);
        console.log("connect to MongoDb");
    }
);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started at ${port}`));
