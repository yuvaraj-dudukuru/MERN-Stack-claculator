const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware for JSON parsing
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// MongoDB Connection
mongoose
    .connect("mongodb://localhost:27017/calculatorDB", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Could not connect to MongoDB:", err));

// Define a Mongoose Schema and Model
const historySchema = new mongoose.Schema({
    calculation: String,
    timestamp: { type: Date, default: Date.now },
});

const History = mongoose.model("History", historySchema);

// API to save history
app.post("/save-history", async (req, res) => {
    const { calculation } = req.body;
    if (!calculation) {
        return res.status(400).send({ error: "Calculation is required" });
    }

    try {
        const newHistory = new History({ calculation });
        await newHistory.save();
        res.send({ success: true });
    } catch (err) {
        res.status(500).send({ error: "Failed to save history" });
    }
});

// API to get history
app.get("/get-history", async (req, res) => {
    try {
        const history = await History.find().sort({ timestamp: -1 }); // Latest first
        res.send(history);
    } catch (err) {
        res.status(500).send({ error: "Failed to fetch history" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
