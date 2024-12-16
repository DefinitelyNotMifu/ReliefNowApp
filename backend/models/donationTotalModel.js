const mongoose = require("mongoose");

const donationTotalSchema = new mongoose.Schema({
    amountTotal: {
        type: Number,
        default: 0,
    },
    itemsTotal: [
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
});

const DonationTotal = mongoose.model("DonationTotal", donationTotalSchema);

module.exports = DonationTotal;
