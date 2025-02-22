var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  Campground = require("./models/campgrounds"),
  User = require("./models/user"),
  seedDB = require("./seeds"),
  Comment = require("./models/comments"),
  methodOverride = require("method-override"),
  flash = require("connect-flash");

var commentRoutes = require("./routes/comments"),
  campgroundRoutes = require("./routes/campgrounds"),
  indexRoutes = require("./routes/index");

// seedDB(); // Seeds the database
//connect to mongod locally
//mongoose.connect( process.env.DATABASEURL, { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//PASSPORT CONFIGURATION
app.use(
  require("express-session")({
    secret: "Is that pesto in you omelette",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middle ware that will run on every route
app.use(function (req, res, next) {
  //passing current user from db
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.get("/", function (req, res) {
  res.render("landing");
});

//using routes
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

// connect to mongodb
mongoose
  .connect(process.env.DATABASEURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT, process.env.IP, function () {
      console.log("The Yelp Camp Server UP --Goose");
    });
  })
  .catch((error) => {
    console.log(error);
  });
