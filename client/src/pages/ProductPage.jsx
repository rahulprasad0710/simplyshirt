import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../components/Rating";

import Laoding from "../components/Laoding";
import ErrorMsg from "../components/ErrorMsg";
import { oneProductAction } from "../redux/action/productAction";

import {
    addToCartActionFn,
    getUserCartItemActionFn,
} from "../redux/action/userAction/cartAction";
import {
    getWishlistAction,
    addToWishlistAction,
} from "../redux/action/userAction/wishlistAction";

const ProductPage = () => {
    const { userInfo } = useSelector((state) => state.userLogin);

    const { id } = useParams();

    const { product, loading, error } = useSelector(
        (state) => state.productDetails
    );
    const { wishlist, message: wishlistMeg } = useSelector(
        (state) => state.profileInfo.userWishlist
    );
    const { productId, message: cartMsg } = useSelector(
        (state) => state.profileInfo.userCart
    );

    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!userInfo) {
            dispatch(oneProductAction(id));
        } else {
            dispatch(oneProductAction(id));
            dispatch(getWishlistAction());
            dispatch(getUserCartItemActionFn());
            if (wishlistMeg) {
                toast(<h5 className="text-primary">{wishlistMeg}</h5>);
            }
            if (cartMsg) {
                toast(<h5 className="text-primary">{cartMsg}</h5>);
            }
        }
    }, [dispatch, id, userInfo, wishlistMeg, productId, cartMsg]);

    const addToCartFn = () => {
        dispatch(addToCartActionFn(id, quantity));
    };
    const handleWishlist = (id) => {
        dispatch(addToWishlistAction(id));
    };
    const handleNoWishlist = (id) => {
        toast.error("You need to Login to add product(s) to wishlist");
    };

    return (
        <div>
            {loading && <Laoding />}
            {error && <ErrorMsg error={error} />}
            <ToastContainer />

            <Link to="/">
                <button className="btn btn btn-outline-secondary mb-3">
                    Go Back
                </button>
            </Link>

            {product && (
                <div className="row m-auto">
                    <Col md={6}>
                        <img
                            className="img-fluid big-product-image img-thumbnail"
                            src={product.image}
                            alt={product.name}
                        />
                    </Col>
                    <Col className=" my-3 my-md-0" md={6}>
                        <h4>{product.name}</h4>
                        <div className="row">
                            <div className="row">
                                <Col md={6}>
                                    <p>{product.description}</p>
                                </Col>
                                <Col md={6}>
                                    <span>
                                        <Rating starNumber={product.rating} />
                                    </span>
                                    <span> {product.numReviews} Reviews</span>
                                    <h5>
                                        Avaiable:
                                        <span> In Stock</span>{" "}
                                    </h5>
                                    <div className="row">
                                        <Col>Quantity : </Col>
                                        <Col>
                                            <select
                                                className="selectOption"
                                                value={quantity}
                                                onChange={(e) =>
                                                    setQuantity(e.target.value)
                                                }>
                                                {[
                                                    ...Array(
                                                        product.totalStock
                                                    ).keys(),
                                                ].map((x, i) => {
                                                    return (
                                                        <option
                                                            className="text-dark"
                                                            value={i + 1}>
                                                            {i + 1}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </Col>
                                    </div>
                                </Col>
                            </div>
                            <div className="row">
                                <Col md={6}>
                                    <h4 className="text-muted">
                                        <s>
                                            Rs.{Math.floor(product.price * 1.1)}
                                        </s>{" "}
                                    </h4>
                                </Col>
                                <Col md={6}>
                                    <h3>Rs. {product.price}</h3>
                                </Col>
                            </div>
                            <div className="row">
                                <Col md={4}>
                                    <button
                                        onClick={
                                            userInfo
                                                ? () =>
                                                      handleWishlist(
                                                          product._id
                                                      )
                                                : () => handleNoWishlist()
                                        }
                                        className="btn  mb-2 btn btn-outline-secondary ">
                                        {wishlist.some(
                                            (item) => item._id === product._id
                                        ) ? (
                                            <i className="text-danger fontSize  pe-none fas fa-heart"></i>
                                        ) : (
                                            <i className="fontSize text-danger far fa-heart pe-none"></i>
                                        )}
                                    </button>
                                </Col>
                                <Col md={8}>
                                    <button
                                        onClick={
                                            userInfo
                                                ? addToCartFn
                                                : () => handleNoWishlist()
                                        }
                                        style={{ width: "280px" }}
                                        className="btn btn-primary bg-pink ">
                                        Add To Cart
                                    </button>
                                </Col>
                            </div>
                        </div>
                    </Col>
                </div>
            )}
        </div>
    );
};

export default ProductPage;
