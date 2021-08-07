import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUserCartItemActionFn } from "../../redux/action/userAction/cartAction";
import { addCartitemsToCheckoutAction } from "../../redux/action/userAction/checkoutAction";
const OrderSummary = () => {
    const { cartItems } = useSelector((state) => state.profileInfo.userCart);
    const { totalItems, priceTotal } = useSelector((state) => state.checkout);

    const dispatch = useDispatch();

    useEffect(() => {
        var totalPrice = [];
        cartItems.map((oneBook) => {
            const oneBookTotalPrice = totalPrice.push(
                oneBook.quantity * oneBook.item.price
            );
            return oneBookTotalPrice;
        });
        var totalPriceNumber = totalPrice.reduce((acc, num) => acc + num, 0);

        dispatch(
            addCartitemsToCheckoutAction(cartItems.length, totalPriceNumber)
        );
    }, [cartItems, dispatch]);

    return (
        <div className="mb-2">
            <h4 className="text-primary text-center bg-warning px-2 py-2  rounded-top">
                Order Summary
            </h4>
            <ul class="list-group">
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    Item(s) :
                    <span class="badge h5 text-primary bg-light rounded-1">
                        {cartItems.length}
                    </span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    Delivery Charge :
                    <span class="badge h5 text-primary bg-light rounded-1">
                        0
                    </span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    Discount :
                    <span class="badge h5 text-primary bg-light rounded-1">
                        1
                    </span>
                </li>

                <li class="list-group-item d-flex justify-content-between align-items-center">
                    Total Price :
                    <span class="badge h5 text-primary bg-light rounded-1">
                        Rs.{Math.floor(priceTotal)}
                    </span>
                </li>
            </ul>
        </div>
    );
};

export default OrderSummary;
