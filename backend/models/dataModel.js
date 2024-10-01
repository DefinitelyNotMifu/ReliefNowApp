const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imagepath: {
        type: String,
        required: true,
    },
    thumbpath: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
});

dataSchema.plugin(AutoIncrement, { inc_field: "id", start_seq: 1 });

const Data = mongoose.model("Data", dataSchema);

module.exports = Data;
