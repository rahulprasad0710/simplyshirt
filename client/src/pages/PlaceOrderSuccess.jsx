import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { resetCheckoutAction } from "../redux/action/userAction/checkoutAction";
const PlaceOrderSuccess = () => {
    const { userInfo } = useSelector((state) => state.userLogin);
    const dispatch = useDispatch();
    useEffect(() => {
        if (userInfo) {
            dispatch(resetCheckoutAction());
        }
    }, [userInfo, dispatch]);
    return (
        <div>
            <h4 className="text-primary text-center bg-success p-3 rounded-1">
                Your Order is placed successfully.
            </h4>
            <Link to="/">
                <button className="btn btn-primary">Go To Home Page</button>
            </Link>
            <Link to="/profile/myorders">
                <button className="btn btn-primary mx-3">
                    See Placed Ordered
                </button>
            </Link>
        </div>
    );
};

export default PlaceOrderSuccess;
