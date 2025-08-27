const express = require('express');
const router = express.Router();
const Item = require('../models/item');

router.get('/', async (req, res) => {
    const items = await Item.find();
    res.json(items);
});

router.post('/', async (req, res) => {
    const newItem = new Item({ text: req.body.text });
    const saved = await newItem.save();
    res.json(saved);
});

router.put('/:id', async (req, res) => {
    const updated = await Item.findByIdAndUpdate(req.params.id, { text: req.body.text }, { new: true });
    res.json(updated);
});

router.delete('/:id', async (req, res) => {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted" });
});

module.exports = router;
