const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  text: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Item', ItemSchema);
