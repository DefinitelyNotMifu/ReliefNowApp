const Data = require("../models/dataModel");

// GET DATA

const getDataByType = async (req, res) => {
    const { type } = req.params;
    try {
        const data = await Data.find({ type: type });
        if (data.length == 0) {
            return res.status(404).json({ message: "No data found!" });
        }
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { getDataByType };
