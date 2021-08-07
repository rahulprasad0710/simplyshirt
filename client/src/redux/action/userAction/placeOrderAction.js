import axios from "axios";

import {
    ORDER_PLACE_REQUEST,
    ORDER_PLACE_SUCCESS,
    ORDER_PLACE_FAILURE,
} from "../../actionCreators/userActionCreator/placeOrderActionCreator";

export const placeOrderActionFn = (orderInfo) => async (dispatch, getState) => {
    dispatch({ type: ORDER_PLACE_REQUEST });
    const {
        userLogin: { userInfo },
    } = getState();
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token} `,
            },
        };
        const { data } = await axios.post(
            "/api/user/placeorder",
            orderInfo,

            config
        );
        console.log(data);
        dispatch({
            type: ORDER_PLACE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        if (error.response.status === 500) {
            dispatch({
                type: ORDER_PLACE_FAILURE,
                payload: "Internal Server Error",
            });
        } else {
            dispatch({
                type: ORDER_PLACE_FAILURE,
                payload: error.response.data,
            });
        }
    }
};
