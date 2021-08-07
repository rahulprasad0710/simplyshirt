import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Col } from "react-bootstrap";
import { addToWishlistAction } from "../../redux/action/userAction/wishlistAction";
import { addToCartActionFn } from "../../redux/action/userAction/cartAction";
const WishlistItem = ({ product }) => {
    const dispatch = useDispatch();

    const handleMoveToCart = async (productID) => {
        await dispatch(addToCartActionFn(productID, 1));
        await dispatch(addToWishlistAction(productID));
    };
    return (
        <div
            className="row border border-warning rounded-1 p-2 m-3 profile-card"
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
                    <h4>Price :Rs {product.price}</h4>

                    <button
                        onClick={() =>
                            dispatch(addToWishlistAction(product._id))
                        }
                        className="btn btn-outline-secondary m-1">
                        Remove from Wishlist
                    </button>
                    <button
                        onClick={() => handleMoveToCart(product._id)}
                        className="btn btn-primary m-1">
                        Move To Cart
                    </button>
                </div>
            </Col>
        </div>
    );
};

export default WishlistItem;
