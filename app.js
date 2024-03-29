require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const hbs = require("hbs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const axios = require("axios").default;
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const UserModel = require("./models/User");
const flash = require("connect-flash");

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }) 
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

// Middleware Setup
app.use(logger("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

hbs.registerPartials(path.join(__dirname, "views/partials"));

//initialize session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 60000 * 60 }, // in millisec
    store: new MongoStore({
      mongooseConnection: mongoose.connection, // you can store session infos in mongodb :)
      ttl: 24 * 60 * 60,
      // 1 day
    }),
    saveUninitialized: true,
    resave: true,
  })
);

app.use(flash());

// CUSTOM MIDDLEWARES
// expose flash message to the hbs templates, if any flash-message is defined
app.use(require("./middlewares/exposeFlashMessage"));

// if (process.env.NODE_ENV !== "production") {
//   app.use(async (req, res, next) => {
//     const loggedInUser = await UserModel.findOne();
//     req.session.currentUser = loggedInUser;
//     next();
//   });
// }

// expose login status to the hbs templates
app.use(require("./middlewares/exposeLoginStatus"));

// default value for title local
app.locals.title = "Pickit";

const index = require("./routes/index");
const itemRouter = require("./routes/item");
const friendRouter = require("./routes/friends");
const rouletteRouter = require("./routes/roulette");
const authRouter = require("./routes/auth");

app.use("/", index);
app.use("/items", itemRouter);
app.use("/friends", friendRouter);
app.use("/roulette", rouletteRouter);
app.use("/", authRouter);

//app.use((err, req, res, next) => {});

module.exports = app;
