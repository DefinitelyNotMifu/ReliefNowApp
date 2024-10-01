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
    author: {
        type: String,
    },
    comments: [],
});

dataSchema.plugin(AutoIncrement, { inc_field: "id", start_seq: 1 });

const commentSchema = new mongoose.Schema({
    BlogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Data",
        required: true,
    },
    Id: {
        type: Number,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    summary: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    comments: [commentSchema],
});

commentSchema.plugin(AutoIncrement, { inc_field: "Id", start_seq: 1 });

const Data = mongoose.model("Data", dataSchema);
const Comments = mongoose.model("Comment", commentSchema);

module.exports = { Data, Comments };
