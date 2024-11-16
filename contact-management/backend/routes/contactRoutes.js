const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

// Create a new contact
router.post('/', async(req, res) => {
    const { firstName, lastName, email, phone, company, jobTitle } = req.body;

    const newContact = new Contact({ firstName, lastName, email, phone, company, jobTitle });

    try {
        await newContact.save();
        res.status(201).json(newContact); // Return the saved contact
    } catch (err) {
        res.status(400).json({ error: err.message }); // Handle validation or save errors
    }
});

// Get all contacts
router.get('/', async(req, res) => {
    try {
        const contacts = await Contact.find(); // Fetch all contacts from MongoDB
        res.json(contacts); // Return contacts data to the frontend
    } catch (err) {
        res.status(500).json({ error: err.message }); // Handle server errors
    }
});

// Get a contact by ID
router.get('/:id', async(req, res) => {
    try {
        const contact = await Contact.findById(req.params.id); // Find contact by ID
        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' }); // Return error if not found
        }
        res.json(contact); // Return the contact data
    } catch (err) {
        res.status(400).json({ error: err.message }); // Handle invalid ID or other errors
    }
});

// Update a contact by ID
router.put('/:id', async(req, res) => {
    const { email, phone } = req.body;

    try {
        const existingContact = await Contact.findById(req.params.id);
        if (!existingContact) {
            return res.status(404).json({ error: 'Contact not found' }); // If contact is not found, return error
        }

        // Skip checking for email and phone conflicts if they are being updated
        let updatedFields = {};

        if (email && email !== existingContact.email) {
            updatedFields.email = email; // Allow email update
        } else {
            updatedFields.email = existingContact.email; // Keep existing email if not updated
        }

        if (phone && phone !== existingContact.phone) {
            updatedFields.phone = phone; // Allow phone update
        } else {
            updatedFields.phone = existingContact.phone; // Keep existing phone if not updated
        }

        // Update other fields that the user is changing
        updatedFields.firstName = req.body.firstName || existingContact.firstName;
        updatedFields.lastName = req.body.lastName || existingContact.lastName;
        updatedFields.company = req.body.company || existingContact.company;
        updatedFields.jobTitle = req.body.jobTitle || existingContact.jobTitle;

        // Update the contact with new values
        const updatedContact = await Contact.findByIdAndUpdate(req.params.id, updatedFields, { new: true });

        res.json(updatedContact); // Return the updated contact
    } catch (err) {
        console.error("Error updating contact:", err);
        res.status(400).json({ error: err.message }); // Handle errors
    }
});

// Delete a contact by ID
router.delete('/:id', async(req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id); // Delete contact
        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' }); // Return error if contact not found
        }
        res.status(200).json({ message: 'Contact deleted' }); // Return success message
    } catch (err) {
        res.status(400).json({ error: err.message }); // Handle delete errors
    }
});

module.exports = router;