import { config } from "dotenv";
config();

import express from "express";
import bodyParser from "body-parser";
import { PORT } from "./config/constant.js";
import connectDB from "./config/dbcon.js";

import routes from "./routes/route.js";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/v1", routes);

// Route not found (404)
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  // next(error);
  res.json({ error: error.message });
});

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server started on port ${PORT}...`);
});
