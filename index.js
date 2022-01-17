const mongooseConnection = require("./src/db/mongoose");
const compression = require("compression");
const express = require("express");
const app = express();
const flash = require("connect-flash");
const passport = require("./src/utils/passport");
const sessionMiddleware = require("./src/middlewares/session");
const userRouter = require("./src/routes/user");
const productRouter = require("./src/routes/product");
const cartRouter = require("./src/routes/cart");
const reviewRouter = require("./src/routes/review");
const feedbackRouter = require("./src/routes/feedback");
const { isNotAdmin } = require("./src/middlewares/auth");

app.set("view engine", "hbs");
app.set("views", `${__dirname}/src/views`);

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(`${__dirname}/src/public`));
app.use(sessionMiddleware(mongooseConnection));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use("/api/", userRouter);
app.use("/api/", productRouter);
app.use("/api/", cartRouter);
app.use("/api/", reviewRouter);
app.use("/api/", feedbackRouter);

app.get("/admin", isNotAdmin("/"), (req, res) => {
	const errors = req.flash("error")[0];
	const info = req.flash("info")[0];
	res.render("admin", { message: info, errors });
});

app.all("*", (req, res) => {
	res.sendFile("./src/public/index.html", { root: __dirname });
});

app.listen(process.env.PORT, () => console.log("Listening on port", process.env.PORT));
