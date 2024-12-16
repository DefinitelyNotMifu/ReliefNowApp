const mongoose = require("mongoose");

const distributionSchema = new mongoose.Schema({
    reception: {
        receptionName: {
            type: String,
        },
        phoneNumber: {
            type: String,
        },
    },
    distributionAmount: {
        type: Number,
    },
    distributionItems: [
        {
            name: {
                type: String,
            },
            quantity: {
                type: Number,
            },
            unit: {
                type: String,
            },
        },
    ],
    createdAt: { type: Date, default: Date.now },
});

const Distribution = mongoose.model("Distribution", distributionSchema);

module.exports = Distribution;
