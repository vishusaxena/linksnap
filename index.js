require("dotenv").config();
const express = require("express");
const favicon = require("serve-favicon");

const path = require("path");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRoutes");
const userRoute = require("./routes/user");
const { connectToMongoDB } = require("./connect");
const cookieParser = require("cookie-parser");
const {
  restrictToLoggedInUser,
  checkAuth,
} = require("./controllers/middleware/auth");

const app = express();
const PORT = process.env.PORT || 8000;

connectToMongoDB(process.env.MONGO_URI).then(() =>
  console.log(`MongoDB is connected`)
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use("/url", restrictToLoggedInUser, urlRoute);
app.use("/user", userRoute);
app.use("/", checkAuth, staticRoute);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
