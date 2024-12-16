const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
    donor: {
        donorId: {
            type: String,
        },
        donorName: {
            type: String,
        },
        phoneNumber: {
            type: String,
        },
    },
    amount: {
        type: Number,
    },
    items: [
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

const Donation = mongoose.model("Donation", donationSchema);

module.exports = Donation;
