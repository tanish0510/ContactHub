const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const contactRoutes = require('./routes/contactRoutes');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/contact-management', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit the process with failure code if MongoDB fails to connect
    });

// Routes
app.use('/contacts', contactRoutes);

// Handle 404 errors (if no route is matched)
app.use((req, res, next) => {
    res.status(404).json({ error: 'Route not found' });
});

// Global Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack
    res.status(500).json({ error: 'Something went wrong!' }); // Generic error response
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});