const express = require('express');
const Tag = require('../models/Tag');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware de autenticación
const auth = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'secreto');
    req.user = decoded;
    next();
};

// Crear etiqueta
router.post('/', auth, async (req, res) => {
    const { identifier, name } = req.body;
    const tag = new Tag({ identifier, name, owner: req.user.id });
    await tag.save();
    res.json(tag);
});

// Buscar etiqueta por identificador
router.get('/:identifier', async (req, res) => {
    const tag = await Tag.findOne({ identifier });
    if (tag) {
        res.json(tag);
    } else {
        res.status(404).json({ message: 'Etiqueta no encontrada' });
    }
});

// Marcar etiqueta como encontrada
router.post('/:identifier/found', auth, async (req, res) => {
    const tag = await Tag.findOne({ identifier: req.params.identifier });
    if (tag) {
        tag.found = true;
        tag.foundDate = new Date();
        tag.foundBy = req.user.id;
        await tag.save();
        res.json({ message: 'Etiqueta marcada como encontrada', tag });
    } else {
        res.status(404).json({ message: 'Etiqueta no encontrada' });
    }
});

module.exports = router;
