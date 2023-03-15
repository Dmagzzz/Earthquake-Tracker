const mongoose = require('mongoose');

const { Schema } = mongoose;

const earthquakeSchema = new Schema({
    ids: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    time: {
        type: Date,
        required: true,
    },
    updated: {
        type: Date,
        required: true,
    },
    magType: {
        type: String,
        required: true,
    },
    mag: {
        type: Number,
        required: true,
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    altitude: {
        type: Number,
        required: true,
    },
});
const Earthquake = mongoose.model('Earthquake', earthquakeSchema);

module.exports = Earthquake;