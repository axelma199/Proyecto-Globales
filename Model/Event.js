const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Event = new Schema({
    id: {
        type: String
    },
    start:{
        type: String
    },
    end: {
        type: String
    },
    resourceId: {
        type: String
    },
    title: {
        type: String
    },
    bgColor: {
        type: String
    },
    resizable: {
        type: Boolean,
        optional: true
    },
    movable: {
        type: Boolean,
        optional: true
    },
    startResizable: {
        type: Boolean,
        optional: true
    },
    rrule: {
        type: String,
        optional: true
    }
}, {
    collection: 'Schedule'
});


module.exports = mongoose.model('Event', Event);