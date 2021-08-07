import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Col } from "react-bootstrap";
import { addToWishlistAction } from "../../redux/action/userAction/wishlistAction";
import { addToCartActionFn } from "../../redux/action/userAction/cartAction";
const WishlistItem = ({ product, qty }) => {
    const dispatch = useDispatch();
    return (
        <div
            className="row border border-warning rounded-1 p-2 m-3 "
            key={product._id}>
            <Col xs={6} md={4}>
                <div className="">
                    <Link to={`/product/${product._id}`}>
                        <img
                            className="img-thumbnail img-fluid wishlist-product-image"
                            src={product.image}
                            alt={product.name}
                        />
                    </Link>
                </div>
            </Col>
            <Col xs={6} md={8}>
                <div className="d-grid">
                    <Link to={`/product/${product._id}`}>
                        <h4>{product.name}</h4>
                    </Link>
                    <h5>Brand :{product.brand}</h5>
                    <p className="mb-1">{product.description}</p>
                    <h6>Price :Rs {product.price}</h6>
                    <h6>
                        <span>Ordered Quantity:{qty} </span>
                        <span>Total Price:{qty * product.price} </span>
                    </h6>
                    <button
                        onClick={() =>
                            dispatch(addToWishlistAction(product._id))
                        }
                        className="btn btn-outline-secondary m-1">
                        Add To Wishlist
                    </button>
                    <button
                        onClick={() =>
                            dispatch(addToCartActionFn(product._id, 1))
                        }
                        className="btn btn-primary m-1">
                        Add To Cart
                    </button>
                </div>
            </Col>
        </div>
    );
};

export default WishlistItem;
