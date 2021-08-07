const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: "user",
        },

        orderItems: [
            {
                type: mongoose.Schema.Types.ObjectId,
                require: true,
                ref: "OrderItem",
            },
        ],

        shippingAddress: {
            contactName: String,
            address: String,
            city: String,
            district: String,
            secondMobileNumber: String,
        },
        paymentMethod: {
            type: String,
        },
        paymentDetails: {
            status: { type: String },
            updateTime: { type: String },
        },

        allTotalPrice: { type: Number },
        isPaid: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model("order", orderSchema);

module.exports = Order;
