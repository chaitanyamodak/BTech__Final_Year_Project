import dotenv from "dotenv";
import connectDb from "./db/db.js";
import app from "./app.js";

dotenv.config({
  path: "../.env",
});

// connect db
connectDb().then(() => {
  console.log("Connected to DB");
  app.listen(process.env.PORT || 4000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
});
