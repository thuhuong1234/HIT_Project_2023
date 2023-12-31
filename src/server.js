const express = require("express");
const router = require("./routes");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error.middleware");

dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/Hit-project-2023";

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected!"))
  .catch((err) => console.log(err));

app.use("/api/v1",router);

app.use("/",(req,res)=>{
  res.send("Server is working");
})

app.use(cookieParser);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log("Example app listening on port", `${port}`);
});
