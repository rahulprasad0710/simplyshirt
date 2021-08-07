import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Col, Form } from "react-bootstrap";
import { userProfileDetailsActionFn } from "../redux/action/userAccountAction";
import { shippingAddressCheckoutAction } from "../redux/action/userAction/checkoutAction";
import AddressModel from "../components/AddressModel";
import NoAddress from "../components/NoAddress";
import YesAddress from "../components/YesAddress";
import CheckoutProcess from "../components/user/CheckoutProcess";
import OrderSummary from "../components/user/OrderSummary";
const CheckoutPage = () => {
    const { userAddresses } = useSelector((state) => state.profileInfo);
    const { shippingSuccess, shippingAddress, totalItems } = useSelector(
        (state) => state.checkout
    );

    const dispatch = useDispatch();
    const history = useHistory();
    const [currentAddress, setcurrentAddress] = useState("");
    const { userInfo } = useSelector((state) => state.userLogin);

    useEffect(() => {
        if (!userInfo) {
            history.push("/");
        } else if (userInfo && totalItems === 0) {
            history.push("/cart");
        } else {
            dispatch(userProfileDetailsActionFn());
            if (shippingAddress) {
                setcurrentAddress(shippingAddress);
            }
        }
    }, [dispatch, userInfo, history, shippingAddress, totalItems]);

    const [showAddressModel, setShowAddressModel] = useState(false);

    const editAddressModel = () => {
        setShowAddressModel(true);
    };

    const handleAddressSelect = (addressId) => {
        setcurrentAddress(addressId);
        dispatch(shippingAddressCheckoutAction(addressId));
    };

    return (
        <div className="position-relative  checkout ">
            <AddressModel
                showModel={showAddressModel}
                setshowModel={setShowAddressModel}
            />

            <div className="row">
                <div className="d-flex mb-3 align-items-center justify-content-between">
                    <h4>CHECKOUT</h4>
                    <Link to="/cart">
                        <button className="btn btn-outline-secondary">
                            Go To Cart{" "}
                        </button>
                    </Link>
                </div>

                <Col xs={12} md={8}>
                    <CheckoutProcess />
                    <Form>
                        <Form.Group>
                            <ul class="list-group">
                                <Form.Label as="legend">
                                    <h4>Select Delivery Address</h4>
                                </Form.Label>
                                <div className="row">
                                    {userAddresses !== null &&
                                        userAddresses.map((address) => (
                                            <Col
                                                xs={12}
                                                md={6}
                                                key={address._id}>
                                                <li
                                                    className={
                                                        currentAddress ===
                                                        address._id
                                                            ? "bg-success rounded strong text-primary list-group-item d-flex  align-items-center payment-method"
                                                            : "text-primary rounded list-group-item d-flex   align-items-center payment-method "
                                                    }>
                                                    <Form.Check
                                                        type="radio"
                                                        name="currentAddress"
                                                        value={address._id}
                                                        onChange={(e) =>
                                                            handleAddressSelect(
                                                                e.target.value
                                                            )
                                                        }></Form.Check>
                                                    <div
                                                        key={address._id}
                                                        className="text-primary flex-grow-1">
                                                        <h5 className="uppercase card-title">
                                                            {
                                                                address.contactName
                                                            }
                                                        </h5>
                                                        <p className="text-primary mb-0">
                                                            Contact Number :
                                                            {
                                                                address.phoneNumber
                                                            }{" "}
                                                        </p>
                                                        <p className="text-primary mb-0">
                                                            Address:
                                                            {
                                                                address.addressName
                                                            }{" "}
                                                        </p>
                                                        <div className="row">
                                                            <Col xs={6} md={6}>
                                                                <p className="mb-1">
                                                                    <span>
                                                                        Tole :
                                                                        {
                                                                            address.tole
                                                                        }
                                                                    </span>
                                                                </p>
                                                            </Col>
                                                            <Col>
                                                                <p className="mb-1">
                                                                    <span>
                                                                        Ward :
                                                                        {
                                                                            address.ward
                                                                        }
                                                                    </span>
                                                                </p>
                                                            </Col>
                                                        </div>
                                                        <div className="row">
                                                            <Col xs={6} md={6}>
                                                                <p className="mb-1">
                                                                    <span>
                                                                        City :
                                                                        {
                                                                            address.city
                                                                        }
                                                                    </span>
                                                                </p>
                                                            </Col>
                                                            <Col>
                                                                {" "}
                                                                <p className="mb-1">
                                                                    <span>
                                                                        District
                                                                        :
                                                                        {
                                                                            address.district
                                                                        }
                                                                    </span>
                                                                </p>
                                                            </Col>
                                                        </div>
                                                    </div>

                                                    <i className=" top-0 checkad  position-absolute h3 far fa-check-circle text-white float-end "></i>
                                                </li>
                                            </Col>
                                        ))}
                                </div>
                            </ul>
                        </Form.Group>
                        <br />
                    </Form>

                    <NoAddress
                        message="Save New Address"
                        editAddressModel={editAddressModel}
                    />
                </Col>

                <Col xs={12} md={4}>
                    <div className="row profile-card py-2 rounded">
                        <Col xs={12} md={12}>
                            <OrderSummary />
                        </Col>
                        <Col xs={12} md={12}>
                            <Link className="d-grid" to="/checkout/payment">
                                <button
                                    className="btn btn btn-primary btn-lg float-end"
                                    disabled={!shippingSuccess}>
                                    Continue To Payment
                                </button>
                            </Link>
                        </Col>
                    </div>
                </Col>
            </div>
        </div>
    );
};

export default CheckoutPage;
