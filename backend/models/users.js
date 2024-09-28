const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        phoneNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        address: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        role: {
            type: String,
            required: true,
            enum: ["donor", "recipient", "organization", "administrator"],
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        admin: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

userSchema.pre("save", function (next) {
    if (this.role == "administrator") {
        this.admin = true;
    } else {
        this.admin = false;
    }
    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
