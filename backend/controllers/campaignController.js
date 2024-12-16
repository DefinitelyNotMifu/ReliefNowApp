const Campaign = require("../models/campaignModel");

const postCampainData = async (req, res) => {
    try {
        const { user, title, content, time, budget } = req.body;

        if (!user || !content) {
            return res
                .status(400)
                .json({ message: "User and content are required." });
        }

        const newCampaign = new Campaign({
            user,
            title,
            content,
            time,
            budget,
        });

        const savedCampaign = await newCampaign.save();

        res.status(201).json(savedCampaign);
    } catch (error) {
        console.error("Error saving campaign:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getCampaignData = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 3;
        const skip = (page - 1) * limit; //
        const campaigns = await Campaign.find()
            .sort({ createdAt: -1 }) //
            .skip(skip)
            .limit(limit);

        const totalCampaigns = await Campaign.countDocuments();
        const totalPages = Math.ceil(totalCampaigns / limit);

        res.status(200).json({
            campaigns,
            totalPages,
            currentCampaignPage: page,
        });
    } catch (error) {
        console.error("Error fetching campaign:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { postCampainData, getCampaignData };
