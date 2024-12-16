const DonationTotal = require("../models/donationTotalModel");
const Donation = require("../models/donationModel");
const Distribution = require("../models/distributionModel");

const updateDonationTotal = async (req, res) => {
    try {
        let amountTotal = 0;
        let itemMap = new Map();

        const donates = await Donation.find();
        const distributes = await Distribution.find();

        donates.forEach((donation) => {
            amountTotal += donation.amount;

            donation.items.forEach((item) => {
                const { name, quantity, unit } = item;
                // Nếu item đã tồn tại trong map, cộng thêm số lượng
                if (itemMap.has(name)) {
                    const existingItem = itemMap.get(name);
                    existingItem.quantity += quantity;
                } else {
                    // Nếu chưa tồn tại, thêm mới vào map với unit
                    itemMap.set(name, { quantity, unit });
                }
            });
        });

        distributes.forEach((distribution) => {
            amountTotal -= distribution.distributionAmount;

            distribution.distributionItems.forEach((item) => {
                const { name, quantity } = item;
                if (itemMap.has(name)) {
                    const existingItem = itemMap.get(name);
                    existingItem.quantity -= quantity;
                }
            });
        });

        // Tạo mảng items từ map
        const items = Array.from(itemMap, ([name, { quantity, unit }]) => ({
            name,
            quantity,
            unit,
        }));

        // Cập nhật lại donationTotal
        const donationTotal = await DonationTotal.findOneAndUpdate(
            {},
            { amountTotal: amountTotal, itemsTotal: items },
            { new: true, upsert: true }
        );

        res.status(200).json(donationTotal);
    } catch (error) {
        console.error("Error updating donationTotal:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const fetchDonationTotal = async (req, res) => {
    try {
        const donationTotal = await DonationTotal.findOne();

        res.status(200).json(donationTotal);
    } catch (error) {
        console.error("Error fetching donationTotal:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { fetchDonationTotal, updateDonationTotal };
