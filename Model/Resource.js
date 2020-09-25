const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Resource = new Schema({
    id: {
        type: String
    },
    name: {
        type: String
    },
    groupOnly: {
        type: Boolean,
        optional: true
    },
    parentId: {
        type: String,
        optional: true
    }
}, {
    collection: 'Schedule'
});


module.exports = mongoose.model('Resource', Resource);