import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Col, Alert } from "react-bootstrap";
import {
    getUserCartItemActionFn,
    updateCartActionFn,
    removeFromCartActionFn,
} from "../redux/action/userAction/cartAction";
import OrderSummary from "../components/user/OrderSummary";
import { addToWishlistAction } from "../redux/action/userAction/wishlistAction";

const CartPage = () => {
    const history = useHistory();

    const { cartItems } = useSelector((state) => state.profileInfo.userCart);

    const { userInfo } = useSelector((state) => state.userLogin);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!userInfo) {
            history.push("/");
        } else {
            dispatch(getUserCartItemActionFn());
        }
    }, [dispatch, userInfo, history]);

    const removeFromCartFn = (productId) => {
        dispatch(removeFromCartActionFn(productId));
    };

    const moveToWishlistFn = async (productId) => {
        await dispatch(addToWishlistAction(productId));
        await dispatch(removeFromCartActionFn(productId));
    };

    return (
        <div className="row">
            <h4>Shopping Cart</h4>
            <Col md={8}>
                {cartItems.length === 0 && (
                    <Alert className="text-center">
                        <h4 className="text-info ">Your cart is empty.</h4>
                        <Link to="/">
                            <h3 className=" text-primary">Go Shopping </h3>{" "}
                        </Link>
                    </Alert>
                )}
                {cartItems.length > 0 && (
                    <ul class="list-group">
                        {cartItems.map((product) => (
                            <li
                                key={product._id}
                                class="list-group-item  my-2 d-flex  flex-md-row flex-column   justify-content-between align-items-center">
                                <div>
                                    <Link to={`/product/${product.item._id}`}>
                                        <img
                                            className="img-thumbnail mb-sm-2 mb-md-0    img-fluid wishlist-product-image"
                                            src={product.item.image}
                                            alt={product.item.name}
                                        />
                                    </Link>
                                </div>
                                <div>
                                    <Link to={`/product/${product.item._id}`}>
                                        {" "}
                                        <h5>{product.item.name}</h5>{" "}
                                    </Link>

                                    <h6 className="text-muted">
                                        {product.item.brand}
                                    </h6>
                                    <h6 className="text-muted">
                                        {product.item.category}
                                    </h6>
                                    <h5>Price:{product.item.price}</h5>
                                    <h5>
                                        Total Price :{" "}
                                        {Math.floor(
                                            product.item.price *
                                                product.quantity
                                        )}
                                    </h5>
                                </div>
                                <div className="d-grid">
                                    <select
                                        className="d-block selectOption"
                                        value={product.quantity}
                                        onChange={(e) =>
                                            dispatch(
                                                updateCartActionFn(
                                                    product._id,
                                                    Number(e.target.value)
                                                )
                                            )
                                        }>
                                        {[...Array(10).keys()].map((x, i) => {
                                            return (
                                                <option
                                                    className="text-dark"
                                                    value={i + 1}>
                                                    {i + 1}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    <button
                                        onClick={() =>
                                            removeFromCartFn(
                                                product.item._id,
                                                Number(product.item.quantity)
                                            )
                                        }
                                        className="d-block btn my-2 btn-outline-secondary ">
                                        Remove from cart{" "}
                                        <i className=" text-warning fas fa-trash"></i>
                                    </button>
                                    <button
                                        onClick={() =>
                                            moveToWishlistFn(product.item._id)
                                        }
                                        className="btn  btn-primary">
                                        Move To Wishlist
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </Col>

            {cartItems.length > 0 && (
                <Col md={4}>
                    <div className="row profile-card py-2 rounded  ">
                        <Col xs={12} md={12}>
                            <OrderSummary />
                        </Col>
                        <Col xs={12} md={12}>
                            <Link className="d-grid" to="/checkout/shipping">
                                <button className="btn btn btn-primary btn-lg float-end">
                                    Procced To Checkout
                                </button>
                            </Link>
                        </Col>
                    </div>
                </Col>
            )}
        </div>
    );
};

export default CartPage;
