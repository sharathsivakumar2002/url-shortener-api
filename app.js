const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

const FILE = "data.json";
const base = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

// Load data
let db = {};

// Read file if exists
if (fs.existsSync(FILE)) {
    db = JSON.parse(fs.readFileSync(FILE));
}

// Save data
function saveDB() {
    fs.writeFileSync(FILE, JSON.stringify(db, null, 2));
}

// Generate short code
function generateCode(length = 6) {
    let code = "";
    for (let i = 0; i < length; i++) {
        code += base[Math.floor(Math.random() * base.length)];
    }
    return code;
}

// Create short URL
app.post("/shorten", (req, res) => {
    const { url, custom } = req.body;

    let code = custom || generateCode();

    if (db[code]) {
        return res.status(400).json({ error: "Code already exists" });
    }

    db[code] = {
        url,
        clicks: 0,
        createdAt: new Date()
    };

    saveDB();

    res.json({
        shortUrl: `https://your-app.onrender.com/${code}`
    });
});

// Redirect + analytics
app.get("/:code", (req, res) => {
    const entry = db[req.params.code];

    if (!entry) {
        return res.status(404).send("URL not found");
    }

    entry.clicks += 1;
    saveDB();

    res.redirect(entry.url);
});

// Analytics endpoint
app.get("/analytics/:code", (req, res) => {
    const entry = db[req.params.code];

    if (!entry) {
        return res.status(404).json({ error: "Not found" });
    }

    res.json(entry);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
