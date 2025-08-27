import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000; // Puerto dinámico para Render

// Middlewares
app.use(cors());
app.use(express.json());

// Conectar MongoDB Atlas usando variable de entorno
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error(err));

mongoose.connection.on('connected', () => {
  console.log('DB actual:', mongoose.connection.db.databaseName);
});

// Modelo Contact
const ContactSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  country: String
});

const Contact = mongoose.model('Contact', ContactSchema);

// Rutas CRUD

// Obtener todos los contactos
app.get('/contacts', async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
});

// Crear un contacto
app.post('/contacts', async (req, res) => {
  const newContact = new Contact(req.body);
  await newContact.save();
  res.json(newContact);
});

// Actualizar un contacto
app.put('/contacts/:id', async (req, res) => {
  const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Borrar un contacto
app.delete('/contacts/:id', async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

// Iniciar servidor
app.listen(port, () => console.log(`Servidor escuchando en el puerto ${port}`));
