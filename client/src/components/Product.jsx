import React from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";
const Product = ({ product }) => {
    return (
        <div
            key={product._id}
            className="card img-thumbnail text-dark bg-light mb-3">
            <Link to={`/product/${product._id}`}>
                <img
                    src={product.image}
                    alt={product.name}
                    className="img-fluid small-product-image"
                />
            </Link>

            <div className="card-body h-100 text-dark">
                <Link to={`/product/${product._id}`}>
                    <h4 className="card-title text-info">{product.name}</h4>
                </Link>

                <h5 className="text-primary">Rs.{product.price}</h5>
                <p>
                    {product.rating} from {product.numReviews} reviews
                </p>
                <Rating starNumber={product.rating} />
            </div>
        </div>
    );
};

export default Product;

//  <div noClick={handleWishlist}>
//      <i className="far fa-heart text-danger mousep"></i>
//      <i className="fas fa-heart text-danger mousep"></i>
//  </div>;
