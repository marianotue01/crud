/*
==================================================
File: server.js
Summary:
- Input: HTTP requests from frontend (GET, POST, PUT, DELETE) for contacts.
- Process:
  1. Connects to MongoDB using Mongoose.
  2. Sets up Express server with JSON parsing and CORS support.
  3. Defines a Contact model.
  4. Implements CRUD routes with basic error handling.
- Output: Sends JSON responses with contact data or error messages.
==================================================
*/

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// -------------------------
// Middlewares
// -------------------------
app.use(cors());          // Allow requests from any origin
app.use(express.json());  // Parse incoming JSON

// -------------------------
// MongoDB connection
// -------------------------
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

mongoose.connection.on('connected', () => {
  console.log('Current DB:', mongoose.connection.db.databaseName);
});

// -------------------------
// Contact model
// -------------------------
const ContactSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  country: String
});

const Contact = mongoose.model('Contact', ContactSchema);

// -------------------------
// CRUD routes with try/catch
// -------------------------

// Get all contacts
app.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch contacts', details: err.message });
  }
});

// Create a new contact
app.post('/contacts', async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.json(newContact);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create contact', details: err.message });
  }
});

// Update a contact by ID
app.put('/contacts/:id', async (req, res) => {
  try {
    const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update contact', details: err.message });
  }
});

// Delete a contact by ID
app.delete('/contacts/:id', async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete contact', details: err.message });
  }
});

// -------------------------
// Start server
// -------------------------
app.listen(port, () => console.log(`Server listening on port ${port}`));
