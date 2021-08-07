import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
const CheckoutProcess = () => {
    const [checkoutStep, setCheckoutStep] = useState("2%");
    const { shippingAddress, shippingSuccess, payment, placeOrder } =
        useSelector((state) => state.checkout);

    useEffect(() => {
        if (shippingSuccess && !payment.paymentSuccess) {
            setCheckoutStep("30%");
            console.log(shippingSuccess);
        } else if (shippingSuccess && payment.paymentSuccess) {
            setCheckoutStep("65%");
        } else if (shippingSuccess && payment.paymentSuccess && placeOrder) {
            setCheckoutStep("100%");
        }
        console.log(shippingSuccess);
    }, [shippingSuccess, payment.paymentSuccess, placeOrder]);

    return (
        <div>
            <div className="mb-3">
                <h5 className="bg-info text-primary p-2 rounded">
                    Please,do not refresh the page.
                </h5>
                <ul className="pagination pagination">
                    <li className="page-item active ">
                        <Link className="page-link" to="/checkout/shipping">
                            Shipping
                        </Link>
                    </li>
                    <li
                        class={
                            shippingSuccess
                                ? "page-item "
                                : "page-item disabled"
                        }>
                        <Link class="page-link" to="/checkout/payment">
                            Payment
                        </Link>
                    </li>
                    <li
                        className={
                            shippingSuccess && payment.paymentSuccess
                                ? "page-item "
                                : "page-item disabled"
                        }>
                        <Link className="page-link" to="/checkout/placeorder">
                            Place Order
                        </Link>
                    </li>
                    <li className="page-item ">
                        <Link className="page-link" to="/checkout/summary">
                            Summary
                        </Link>
                    </li>
                </ul>
            </div>
            <div class="progress mb-3">
                <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    style={{ width: checkoutStep }}
                    aria-valuemin="0"
                    aria-valuemax="100"></div>
            </div>
        </div>
    );
};

export default CheckoutProcess;
