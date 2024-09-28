const User = require("../models/users");

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Delete  successfully");
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = { getAllUsers, deleteUser };
