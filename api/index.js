require("dotenv").config();
const mongooseConnection = require("./src/db/mongoose");
const express = require("express");
const app = express();
const flash = require("connect-flash");
const passport = require("./src/utils/passport");
const sessionMiddleware = require("./src/middlewares/session");
const userRouter = require("./src/routes/user");
const productRouter = require("./src/routes/product");
const cartRouter = require("./src/routes/cart");
const reviewRouter = require("./src/routes/review");

app.set("view engine", "hbs");
app.set("views", `${__dirname}/src/views`);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(`${__dirname}/src/public`));
app.use(sessionMiddleware(mongooseConnection));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(userRouter);
app.use(productRouter);
app.use(cartRouter);
app.use(reviewRouter);

// app.get('/', (req, res) => {
//     res.render('index', { user: req.user, error: req.flash('error') });
// });
app.all("*", (req, res) => {
  res.status(404).send("The page you're looking for is in another castle.");
});

app.listen(process.env.PORT, () =>
  console.log("Listening on port", process.env.PORT)
);
