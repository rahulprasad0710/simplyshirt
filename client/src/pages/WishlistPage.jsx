import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Col } from "react-bootstrap";
import {
    addToWishlistAction,
    getWishlistAction,
} from "../redux/action/userAction/wishlistAction";
import WishlistItem from "../components/user/WishlistItem";

const WishlistPage = () => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.userLogin);
    const { userWishlist } = useSelector((state) => state.profileInfo);

    useEffect(() => {
        if (!userInfo) {
        } else {
            dispatch(getWishlistAction());
        }
    }, [userInfo, dispatch]);

    return (
        <div className="row">
            {!userInfo && (
                <div className="h4">
                    You need to login to add ,see item(s) in wishlist.
                </div>
            )}
            {userInfo && userWishlist.wishlist.length === 0 && (
                <h3>No items in wishlist ,Go shopping.</h3>
            )}
            {userInfo &&
                userWishlist.wishlist.length > 0 &&
                userWishlist.wishlist.map((product) => (
                    <Col xs={12} md={6}>
                        <WishlistItem product={product} />
                    </Col>
                ))}
        </div>
    );
};

export default WishlistPage;
