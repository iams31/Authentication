const express = require("express");
const app = express();
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
const session = require("express-session");
const passportLocal = require("./config/passportlocalstrategy");
const MongoStore = require("connect-mongo");
//used for session cookie
const cookieParser = require("cookie-parser");
const passport = require("passport");
const sassMiddleware = require("node-sass-middleware");
app.use(
  sassMiddleware({
    src: "./assets/scss",
    dest: "./assets/css",
    outputStyle: "extended",
    prefix: "/css",
  })
);
app.use(express.static("./assets"));
app.use(express.urlencoded());
app.use(cookieParser());

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
//extract images from the sub pages into layout

// use express router

// set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");
//mongostore is used to handle the session coockie
app.use(
  session({
    name: "AUTHENTICATION",
    //TODO change on deployment on server
    secret: "authId",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30,
    },
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017",
      autoRemove: "disabled",
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use("/", require("./routes"));
// app.use((req, res, next) => {
//   const routeName = extractRouteName(req.path); // Implement your logic to extract the route name
//   res.locals.routeName = routeName;
//   console.log(routeName);
//   next();
// });
app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }
  console.log(`Server is running on port: ${port}`);
});
