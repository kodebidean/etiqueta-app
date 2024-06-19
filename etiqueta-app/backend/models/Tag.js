const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
    identifier: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    found: { type: Boolean, default: false },
    foundDate: { type: Date },
    foundBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Tag', TagSchema);
