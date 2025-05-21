const express = require("express");
const path = require("path");
const app = express();
const userRouter = require("./routes/userRoutes");
const viewRouter = require("./routes/viewRoutes");
const tokenRouter = require("./routes/tokenRoutes")
const doctorTRouter = require("./routes/doctorTRoutes")
const customizeTokenRouter = require('./routes/CutomizeTRoutes')
const cookieParser = require('cookie-parser')


app.use(cookieParser());
app.use(express.json());
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tokens", tokenRouter);
app.use("/api/v1/doctortoken", doctorTRouter);
app.use("/api/v1/dashboard1", customizeTokenRouter)

// app.use(express.static(path.join(__dirname, "views")));
app.use(express.static(path.join(__dirname, "views")));

app.use("/", viewRouter);

module.exports = app;
