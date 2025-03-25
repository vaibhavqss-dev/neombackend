import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv"; 
dotenv.config(); 
import router from "./router/router";
import { testConnection } from "./db/db_connect";

const app = express();
const PORT = process.env.PORT || 3000; 

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "Accept", "cache-control"],
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", router);

async function SetUpServerAndDB() {
  try {
    await testConnection();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

SetUpServerAndDB();

export default app;
