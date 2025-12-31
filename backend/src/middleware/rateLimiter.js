const rateLimit = require("express-rate-limit");

// General API limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per IP
  message: {
    message: "Too many requests, please try again later.",
  },
});

// Auth-specific limiter (stricter)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10, // only 10 login/signup attempts
  message: {
    message: "Too many authentication attempts. Try again later.",
  },
});

module.exports = {
  apiLimiter,
  authLimiter,
};
