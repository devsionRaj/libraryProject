const express = require("express");
const morgan = require("morgan");
const mongoSanitize = require('express-mongo-sanitize');
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const libraryRoutes = require("./routes/libraryRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Body parser, reading data from body into req.body
app.use(express.json());

app.use(mongoSanitize())

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/library", libraryRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
