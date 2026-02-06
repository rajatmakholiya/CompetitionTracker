import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import { Tier2Item } from "./models/Tier2Item.js";
import { getTier2SportsModel } from "./models/Tier2Sports.js";
import { getMsnModel } from "./models/MsnArticle.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

if (!process.env.MONGODB_URI) {
  process.exit(1);
}

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to DB: tier2"))
  .catch((err) => console.error("DB Connection Error:", err));

const tier2Connection = mongoose.connection;

const msnConnection = tier2Connection.useDb("MSN");

const Tier2Sports = getTier2SportsModel(tier2Connection);

const MsnPop = getMsnModel(msnConnection, "pop");

const MsnSports = getMsnModel(msnConnection, "sports");

app.get("/api/articles", async (req, res) => {
  try {
    const { type } = req.query;

    const Model = type === "sports" ? MsnSports : MsnPop;

    const items = await Model.find().sort({ publishedDateTime: -1 }).limit(100);

    res.json(items);
  } catch (error) {
    console.error("Error fetching Articles tab data:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

app.get("/api/tier2", async (req, res) => {
  try {
    const { type } = req.query;
    let items = [];

    if (type === "sports") {
      items = await Tier2Sports.find().sort({ fetched_at: -1 }).limit(100);
    } else {
      items = await Tier2Item.find({
        category: { $not: { $regex: /^sports$/i } },
      })
        .sort({ published_at: -1 })
        .limit(100);
    }

    res.json(items);
  } catch (error) {
    console.error("Error fetching Tier 2 data:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

app.get("/", (req, res) => res.send("API is running successfully!"));

app.listen(PORT, () => {
  console.log(`Backend Server running on http://localhost:${PORT}`);
});
