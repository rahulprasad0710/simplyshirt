import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserOrdersAction } from "../../redux/action/userAction/userOrder";
import OrderedItem from "./OrderedItem";
import { Col } from "react-bootstrap";
const MyPayment = () => {
    const { userInfo } = useSelector((state) => state.userLogin);
    const { userOrders } = useSelector((state) => state.profileInfo);
    const dispatch = useDispatch();
    console.log(userOrders);
    useEffect(() => {
        if (userInfo) {
            dispatch(getUserOrdersAction());
        }
    }, [dispatch, userInfo]);

    return (
        <div>
            <h4>Order History</h4>
            {userOrders.length === 0 && (
                <h5>You have not placed any order(s).</h5>
            )}

            {userOrders.map((order) => {
                let date = new Date(order.updatedAt);
                let formatted_date = date.toDateString();
                return (
                    <div
                        className="border border-2  my-4 rounded profile-card"
                        key={order._id}>
                        <div className="d-flex justify-content-between rounded-top p-1 px-3 bg-warning">
                            <h5>Order Placed at :{formatted_date}</h5>
                            <h5>Total Price : {order.allTotalPrice}</h5>
                            <h5>Payment Method : {order.paymentMethod}</h5>
                        </div>
                        <div className="row">
                            {order.orderItems.map((order) => (
                                <Col xs={12} md={6}>
                                    <OrderedItem
                                        qty={order.quantity}
                                        product={order.product}
                                    />
                                </Col>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default MyPayment;
