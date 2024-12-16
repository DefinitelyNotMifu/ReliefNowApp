const Distribution = require("../models/distributionModel");

const distribution = async (req, res) => {
    try {
        const { reception, distributionAmount, distributionItems } = req.body;

        const newDistribution = new Distribution({
            reception,
            distributionAmount,
            distributionItems,
        });

        const saveDistribution = await newDistribution.save();

        res.status(200).json(saveDistribution);
    } catch (err) {
        console.log("Error saving distribution", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = distribution;
