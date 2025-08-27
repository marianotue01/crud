import { useState, useEffect } from 'react';

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', country: '' });

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  // Traer todos los contactos
  const fetchContacts = async () => {
    const res = await fetch(`${BACKEND_URL}/contacts`);
    const data = await res.json();
    setContacts(data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Agregar o actualizar contacto
  const saveContact = async () => {
    const { firstName, lastName, email, country } = form;
    if (!firstName || !lastName || !email || !country) return alert('Completa todos los campos');

    if (editId) {
      await fetch(`${BACKEND_URL}/contacts/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setEditId(null);
    } else {
      await fetch(`${BACKEND_URL}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    }

    setForm({ firstName: '', lastName: '', email: '', country: '' });
    fetchContacts();
  };

  // Editar contacto
  const editContact = (contact) => {
    setForm({
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      country: contact.country,
    });
    setEditId(contact._id);
  };

  // Borrar contacto
  const deleteContact = async (id) => {
    await fetch(`${BACKEND_URL}/contacts/${id}`, { method: 'DELETE' });
    fetchContacts();
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Contacts Dashboard</h1>

      {/* Formulario */}
      <div className="mb-6 flex flex-wrap gap-3">
        {['firstName', 'lastName', 'email', 'country'].map((field) => (
          <input
            key={field}
            className={`border rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400
              ${editId ? 'bg-blue-100 text-blue-800 font-semibold' : 'bg-white text-gray-700'}`}
            placeholder={field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            value={form[field]}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
          />
        ))}
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors"
          onClick={saveContact}
        >
          {editId ? 'Update' : 'Add'}
        </button>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
            <tr>
              {['First Name', 'Last Name', 'Email', 'Country', 'Actions'].map((header) => (
                <th key={header} className="px-6 py-3 text-center uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr
                key={c._id}
                className={`transition-colors ${
                  editId === c._id ? 'bg-blue-50' : 'hover:bg-gray-100'
                }`}
              >
                <td className="px-6 py-3 text-gray-800">{c.firstName}</td>
                <td className="px-6 py-3 text-gray-800">{c.lastName}</td>
                <td className="px-6 py-3 text-gray-800">{c.email}</td>
                <td className="px-6 py-3 text-gray-800">{c.country}</td>
                <td className="px-6 py-3">
                  <div className="flex items-center justify-center gap-2">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
