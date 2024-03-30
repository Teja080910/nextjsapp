// Import necessary modules
const express = require('express');
const crypto = require('crypto');
const mongoose = require('mongoose');
require('dotenv').config();



// Initialize Express app
const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
});
const db = mongoose.connection;

// Define URL schema
const urlSchema = new mongoose.Schema({
    originalUrl: { type: String, required: true },
    shortCode: { type: String, required: true, unique: true },
});

const UrlModel = mongoose.model('Url', urlSchema);

// Middleware to parse JSON body
app.use(express.json());

// Route to create a shortened URL
app.post('/shorten', async (req, res) => {
    const originalUrl = req.body.url;

    if (!originalUrl) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        // Check if URL already exists in the database
        const existingUrl = await UrlModel.findOne({ originalUrl });

        if (existingUrl) {
            return res.json({ originalUrl: existingUrl.originalUrl, shortenedUrl: existingUrl.shortCode });
        }

        // Generate unique short code for the URL
        const shortCode = crypto.randomBytes(3).toString('hex');

        // Save the shortened URL to the database
        const newUrl = await UrlModel.create({ originalUrl, shortCode });

        // Construct the shortened URL
        const shortenedUrl = `http://localhost:${PORT}/${newUrl.shortCode}`;

        // Send the shortened URL in the response
        res.json({ originalUrl, shortenedUrl });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to redirect to the original URL
app.get('/:shortCode', async (req, res) => {
    const shortCode = req.params.shortCode;

    try {
        // Find the original URL in the database
        const urlDoc = await UrlModel.findOne({ shortCode });

        if (!urlDoc) {
            return res.status(404).json({ error: 'Shortened URL not found' });
        }

        // Redirect to the original URL
        res.redirect(301, urlDoc.originalUrl);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
