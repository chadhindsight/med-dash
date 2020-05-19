const mongoose = require('mongoose');

// Model for the collection of medicine
const MedSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    refills: {
        type: Number,
        required: true,
        default: 0
        },
    available: Boolean,
    // Multiple users might be associated with the same medication
    user_id: [String]
})

module.exports = model('Medicine', userSchema);
