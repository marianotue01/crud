/*
==================================================
File: Contacts.jsx
Summary:
- Input: User interacts with the Contacts Dashboard (adding, editing, deleting contacts)
- Process:
  1. Fetch contacts from backend when component loads.
  2. Allow user to add a new contact or edit an existing one via a form.
  3. Handle deletion of contacts.
  4. Display contacts in mobile-friendly cards with clear actions for edit/delete.
- Output: A functional, interactive dashboard showing contacts and providing CRUD operations.
==================================================
*/

import { useState, useEffect } from 'react';

export default function Contacts() {
  // -------------------------
  // State variables
  // -------------------------
  const [contacts, setContacts] = useState([]); // all contacts
  const [editId, setEditId] = useState(null);   // currently editing contact ID
  const [form, setForm] = useState({            // form input fields
    firstName: '',
    lastName: '',
    email: '',
    country: ''
  });

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  // -------------------------
  // Fetch all contacts from backend
  // -------------------------
  const fetchContacts = async () => {
    const res = await fetch(`${BACKEND_URL}/contacts`);
    const data = await res.json();
    setContacts(data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // -------------------------
  // Add or update a contact
  // -------------------------
  const saveContact = async () => {
    const { firstName, lastName, email, country } = form;

    if (!firstName || !lastName || !email || !country) {
      return alert('Please fill all fields');
    }

    // Update existing contact
    if (editId) {
      await fetch(`${BACKEND_URL}/contacts/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setEditId(null); // reset edit mode
    } 
    // Add new contact
    else {
      await fetch(`${BACKEND_URL}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    }

    setForm({ firstName: '', lastName: '', email: '', country: '' });
    fetchContacts(); // refresh list
  };

  // -------------------------
  // Load a contact into the form for editing
  // -------------------------
  const editContact = (contact) => {
    setForm({
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      country: contact.country,
    });
    setEditId(contact._id);
  };

  // -------------------------
  // Delete a contact
  // -------------------------
  const deleteContact = async (id) => {
    await fetch(`${BACKEND_URL}/contacts/${id}`, { method: 'DELETE' });
    fetchContacts();
  };

  // -------------------------
  // UI Rendering
  // -------------------------
  return (
    <div className="max-w-full px-4 sm:px-6 py-6">
      
      {/* Page title */}
      <div className="mb-4 p-4 bg-gray-400 rounded-lg shadow">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center">
          Contacts Dashboard
        </h1>
      </div>

      {/* Contact form */}
      <div className="mb-4 flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
        {['firstName', 'lastName', 'email', 'country'].map((field) => (
          <input
            key={field}
            className={`w-full sm:w-auto flex-1 border rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400
              ${editId ? 'bg-blue-100 text-blue-800 font-semibold' : 'bg-white text-gray-700'}`}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
          />
        ))}
        <button
          className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors"
          onClick={saveContact}
        >
          {editId ? 'Update' : 'Add'}
        </button>
      </div>

      {/* Contacts list as mobile-friendly cards */}
      <div className="flex flex-col gap-4">
        {contacts.map((c) => (
          <div
            key={c._id}
            className={`bg-white shadow rounded-lg p-4 flex flex-col gap-2 transition-colors ${
              editId === c._id ? 'border-2 border-blue-400' : ''
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-1">
                <span className="text-gray-800 font-semibold">{c.firstName} {c.lastName}</span>
                <span className="text-gray-600 text-sm">{c.email}</span>
                <span className="text-gray-600 text-sm">{c.country}</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 mt-2 sm:mt-0">
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded-lg shadow hover:bg-yellow-600 transition-colors"
                  onClick={() => editContact(c)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-lg shadow hover:bg-red-600 transition-colors"
                  onClick={() => deleteContact(c._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
