const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");
const OrderItem = require("../models/orderItemModel");
const User = require("../models/userModel");
//get ORder Request
const getUserOrderController = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    try {
        const oneOrder = await Order.find({ user: user })
            .populate({ path: "orderItems", populate: "product" })
            .sort({ updatedAt: -1 });
        res.status(200).json(oneOrder);
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
});

//Post Order Methods
const postUserOrderController = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    const orderItemsId = Promise.all(
        user.cart.map(async (orderItemOne) => {
            let newOrderItem = new OrderItem({
                product: orderItemOne.item,
                quantity: orderItemOne.quantity,
            });

            let savedOrderItems = await newOrderItem.save();
            return savedOrderItems._id;
        })
    );

    const allOrderIds = await orderItemsId;

    const totalPriceAll = await Promise.all(
        allOrderIds.map(async (orderItemOne) => {
            const orderItem = await OrderItem.findById(orderItemOne).populate(
                "product"
            );
            console.log(orderItem);

            const totalPriceActual =
                orderItem.product.price * orderItem.quantity;
            return { totalPriceActual };
        })
    );

    const actualPriceTotal = totalPriceAll.reduce(
        (a, b) => a + b.totalPriceActual,
        0
    );
    console.log(actualPriceTotal);
    var newOrder = new Order({
        orderItems: allOrderIds,
        user: user._id,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        allTotalPrice: actualPriceTotal,
        paymentDetails: req.body.payment,
    });

    try {
        const savedOrder = await newOrder.save();
        console.log(savedOrder);
        res.status(201).send({
            order: savedOrder,
            placeOrderSuccess: true,
            msg: "Your order is placed successfully.",
        });

        await User.findByIdAndUpdate(
            user._id,
            { $set: { cart: [] } },
            { multi: true }
        );
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
});

module.exports = { getUserOrderController, postUserOrderController };
