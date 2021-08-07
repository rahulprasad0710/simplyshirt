import React, { useEffect } from "react";
import CheckoutProcess from "../components/user/CheckoutProcess";
import { useSelector, useDispatch } from "react-redux";
import { Col } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import OrderSummary from "../components/user/OrderSummary";

import { placeOrderActionFn } from "../redux/action/userAction/placeOrderAction";
import { resetCheckoutAction } from "../redux/action/userAction/checkoutAction";
const CheckoutPlaceOrderPage = () => {
    const { userInfo } = useSelector((state) => state.userLogin);
    const { serverOrderDetials } = useSelector((state) => state.placeOrder);

    const { userAddresses } = useSelector((state) => state.profileInfo);
    const dispatch = useDispatch();
    const history = useHistory();
    const {
        shippingSuccess,
        paymentSuccess,
        shippingAddress,
        priceTotal,
        totalItems,
        payment,
    } = useSelector((state) => state.checkout);

    useEffect(() => {
        if (!userInfo) {
            history.push("/");
        } else if (priceTotal === 0) {
            history.push("/cart");
        } else if (shippingSuccess === false) {
            history.push("/checkout/shipping");
        } else {
        }
    }, [
        dispatch,
        userInfo,
        priceTotal,
        shippingSuccess,
        history,
        totalItems,
        serverOrderDetials.placeOrderSuccess,
    ]);
    const handlePlaceOrder = () => {
        const orderDetails = {
            payment,
            paymentMethod: payment.paymentMethod,
            shippingAddress,
        };
        dispatch(placeOrderActionFn(orderDetails));
        history.push("/user/placeordersuccess");
    };
    return (
        <div>
            <div className="d-flex mb-3 align-items-center justify-content-between">
                <h4>CHECKOUT</h4>
                <Link to="/cart">
                    <button className="btn btn-outline-secondary">
                        Go To Cart{" "}
                    </button>
                </Link>
            </div>
            <div className="row">
                <Col xs={12} md={8}>
                    <CheckoutProcess />
                    <div className="row">
                        <Col xs={12} md={6}>
                            <div className="profile-card p-2 rounded">
                                <h4 className="bg-primary text-light p-2 rounded-top">
                                    Delivery Address
                                </h4>
                                {userAddresses
                                    .filter(
                                        (address) =>
                                            address._id === shippingAddress
                                    )
                                    .map((e) => (
                                        <div>
                                            <p className="mb-1">
                                                <span className="font-weight-light">
                                                    Contact Name :
                                                </span>
                                                {e.contactName}
                                            </p>
                                            <p className="mb-1">
                                                Phone Number : {e.phoneNumber}
                                            </p>
                                            <p className="mb-1">
                                                <span className="font-weight-light">
                                                    Address Details:
                                                </span>
                                                {e.addressName}
                                            </p>
                                            <div className="row">
                                                <Col xs={6} md={6}>
                                                    <p className="mb-1">
                                                        <span>
                                                            Tole :{e.tole}
                                                        </span>
                                                    </p>
                                                </Col>
                                                <Col>
                                                    <p className="mb-1">
                                                        <span>
                                                            Ward :{e.ward}
                                                        </span>
                                                    </p>
                                                </Col>
                                            </div>
                                            <div className="row">
                                                <Col xs={6} md={6}>
                                                    <p className="mb-1">
                                                        <span>
                                                            City :{e.city}
                                                        </span>
                                                    </p>
                                                </Col>
                                                <Col>
                                                    {" "}
                                                    <p className="mb-1">
                                                        <span>
                                                            District :
                                                            {e.district}
                                                        </span>
                                                    </p>
                                                </Col>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </Col>
                        <Col xs={12} md={6}>
                            <div className="profile-card p-2 rounded-top ">
                                <h4 className="bg-primary  text-light p-2 rounded-top">
                                    Payment
                                </h4>

                                {payment.paymentMethod === "Cod" && (
                                    <div>
                                        <p className="mb-1">
                                            Payment Method : Cash On Delivery
                                        </p>{" "}
                                        <p className="mb-1">
                                            Payment : Pending
                                        </p>{" "}
                                    </div>
                                )}
                                {payment.paymentMethod !== "Cod" && (
                                    <div>
                                        <p className="mb-1">
                                            Payment Method : Paypal
                                        </p>{" "}
                                    </div>
                                )}
                            </div>
                        </Col>
                    </div>
                </Col>

                <Col xs={12} md={4}>
                    <div className="row profile-card py-2 rounded">
                        <Col xs={12} md={12}>
                            <OrderSummary />
                        </Col>
                        <Col xs={12} md={12}>
                            <div className="d-grid">
                                <button
                                    onClick={() => handlePlaceOrder()}
                                    className="btn btn btn-primary btn-lg float-end">
                                    PLACE ORDER
                                </button>
                            </div>
                        </Col>
                    </div>
                </Col>
            </div>
        </div>
    );
};

export default CheckoutPlaceOrderPage;
