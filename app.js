const express = require("express");
const morgan = require("morgan");
const rateLimit = require('express-rate-limit');
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

// Limit requests from same API(Please configure)
const limiter = rateLimit({
  max: 2,
  windowMs: 60 * 60 * 1000,
  message: `Too many requests from this IP, please try again in an hour!`,
});

app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json());

app.use(mongoSanitize());

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/library", libraryRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
