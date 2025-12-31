require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/config/db");

const PORT = process.env.PORT || 4000;

// connect database AFTER dotenv loads
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
