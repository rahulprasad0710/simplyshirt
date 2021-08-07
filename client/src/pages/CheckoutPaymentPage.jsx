import React, { useEffect, useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Col, Form } from "react-bootstrap";
import { userProfileDetailsActionFn } from "../redux/action/userAccountAction";
import { paymentCheckoutAction } from "../redux/action/userAction/checkoutAction";
import axios from "axios";
import CheckoutProcess from "../components/user/CheckoutProcess";
import OrderSummary from "../components/user/OrderSummary";
const CheckoutPage = () => {
    const { userInfo } = useSelector((state) => state.userLogin);
    const [sdkReady, setsdkReady] = useState(false);
    const { shippingSuccess, payment, priceTotal } = useSelector(
        (state) => state.checkout
    );

    const [paymentMethod, setpaymentMethod] = useState("");
    const [onlinePayment, setonlinePayment] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (!userInfo) {
            history.push("/");
        } else if (shippingSuccess === false) {
            history.push("/checkout/shipping");
        } else {
            const addPaypalScript = async () => {
                const { data: clientId } = await axios.get(
                    "/api/config/paypal"
                );

                const script = document.createElement("script");
                script.type = "text/javascript";
                script.async = true;
                script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
                script.onload = () => {
                    setsdkReady(true);
                };
                script.onerror = () => {
                    setsdkReady(false);
                };
                document.body.appendChild(script);
            };
            addPaypalScript();
            dispatch(userProfileDetailsActionFn());
        }
    }, [dispatch, userInfo, history, shippingSuccess]);

    const successPaypalPaymentHandler = (details, data) => {
        const { orderID, payerID } = data;
        const { id, payer, status, update_time, purchase_unit } = details;
        const paymentDetails = {
            orderID,
            payerID,
            id,
            payer,
            status,
            update_time,
            purchase_unit,
        };
        setonlinePayment(true);
        const payment = {
            paymentDetails,
            paymentMethod: paymentMethod,
            paymentSuccess: true,
        };

        dispatch(paymentCheckoutAction(payment));
    };

    const handlePaymentSelect = (e) => {
        setpaymentMethod(e.target.value);
        const payment = {
            paymentDetails: "Pending",
            paymentSuccess: false,
        };
        dispatch(paymentCheckoutAction(payment));
    };
    const handleCodPaymentSelect = (e) => {
        setpaymentMethod(e.target.value);
        const payment = {
            paymentDetails: "Pending",
            paymentMethod: "Cod",
            paymentSuccess: true,
        };
        dispatch(paymentCheckoutAction(payment));
    };

    return (
        <div className="position-relative  checkout">
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
                        <h4>Select Payment Method</h4>
                        <Col xs={12} md={6}>
                            <Form>
                                <Form.Group>
                                    <ul class="list-group">
                                        <div className="row">
                                            <Col xs={12} md={12}>
                                                <li
                                                    className={
                                                        paymentMethod ===
                                                        "Paypal"
                                                            ? "bg-success mb-2 rounded strong text-primary list-group-item d-flex justify-content-between align-items-center payment-method"
                                                            : "text-primary  mb-2 rounded list-group-item d-flex justify-content-between align-items-center payment-method "
                                                    }>
                                                    <Form.Check
                                                        type="radio"
                                                        label="Paypal or Credit Card"
                                                        name="paymentMethod"
                                                        value="Paypal"
                                                        onChange={(e) =>
                                                            handlePaymentSelect(
                                                                e
                                                            )
                                                        }></Form.Check>
                                                    <i className="h4 far fa-check-circle text-white float-end "></i>
                                                </li>
                                                <li
                                                    className={
                                                        paymentMethod === "cod"
                                                            ? "bg-success  mb-2 rounded strong text-primary list-group-item d-flex justify-content-between align-items-center payment-method"
                                                            : "text-primary  mb-2 rounded list-group-item d-flex justify-content-between align-items-center payment-method"
                                                    }>
                                                    <Form.Check
                                                        type="radio"
                                                        label="Cash on Delivery"
                                                        name="paymentMethod"
                                                        value="cod"
                                                        onChange={(e) =>
                                                            handleCodPaymentSelect(
                                                                e
                                                            )
                                                        }></Form.Check>
                                                    <i className="h4 far fa-check-circle text-white float-end "></i>
                                                </li>
                                            </Col>
                                        </div>
                                    </ul>
                                </Form.Group>

                                <p className="text-muted">
                                    {" "}
                                    Do not refesh the page.
                                </p>
                            </Form>
                        </Col>
                        <Col xs={12} md={6}>
                            {paymentMethod === "Paypal" && (
                                <div>
                                    {sdkReady ? (
                                        <PayPalButton
                                            disabled={true}
                                            amount={priceTotal}
                                            onSuccess={(details, data) =>
                                                successPaypalPaymentHandler(
                                                    details,
                                                    data
                                                )
                                            }
                                        />
                                    ) : (
                                        <p className="bg-info text-primary rounded p-2">
                                            Paypal feature could not be loaded.
                                            Please refresh the page.{" "}
                                        </p>
                                    )}
                                </div>
                            )}
                        </Col>
                    </div>
                </Col>
                <Col xs={12} md={4}>
                    <div className="row profile-card py-2 rounded">
                        <Col xs={12} md={12}>
                            <OrderSummary />
                        </Col>
                        <Col xs={12} md={12}>
                            <Link className="d-grid" to="/checkout/placeorder">
                                <button
                                    disabled={!payment.paymentSuccess}
                                    className="btn btn btn-primary btn-lg float-end">
                                    Continue To Place Order
                                </button>
                            </Link>
                        </Col>
                    </div>
                </Col>
            </div>
            {onlinePayment && (
                <div className="bg-light  d-flex justify-content-between tran text-success p-2 px-4 rounded">
                    <h5>
                        <span className="text-primary">Payemnt Method :</span>
                        <span className="text-success"> Paypal</span>{" "}
                    </h5>
                    <h5>
                        <span className="text-primary"> Payment Amount : </span>
                        <span className="text-success"> {priceTotal}</span> :
                    </h5>
                    <h5>
                        <span className="text-primary"> Payment Status :</span>
                        <span className="text-success">Completed</span>
                    </h5>
                </div>
            )}
            {paymentMethod === "cod" && !onlinePayment && (
                <div className="bg-light  d-flex justify-content-between tran text-success p-2 px-4 rounded">
                    <h5>
                        <span className="text-primary">Payemnt Method :</span>
                        <span className="text-success">
                            {" "}
                            Cash On Delivery
                        </span>{" "}
                    </h5>
                    <h5>
                        <span className="text-primary"> Payment Amount : </span>
                        <span className="text-success"> {priceTotal}</span> :
                    </h5>
                    <h5>
                        <span className="text-primary"> Payment Status :</span>
                        <span className="text-success">Pending</span>
                    </h5>
                </div>
            )}
            {onlinePayment && paymentMethod === "cod" && (
                <p className="text-info bg -light p-2">
                    {" "}
                    Payment is already done through Paypal.
                </p>
            )}
        </div>
    );
};

export default CheckoutPage;
