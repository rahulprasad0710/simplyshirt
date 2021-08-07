import axios from "axios";

import {
    GET_ORDER_ITEMS_REQUEST,
    GET_ORDER_ITEMS_SUCCESS,
    GET_ORDER_ITEMS_FAILURE,
} from "../../actionCreators/userActionCreator/orderActionCreator";

export const getUserOrdersAction = () => async (dispatch, getState) => {
    dispatch({ type: GET_ORDER_ITEMS_REQUEST });
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

        const { data } = await axios.get(
            "/api/user/orders",

            config
        );
        dispatch({
            type: GET_ORDER_ITEMS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        console.log(error.response.status);
        console.log(error.response.headers);
        if (error.response.status === 500) {
            dispatch({
                type: GET_ORDER_ITEMS_FAILURE,
                payload: "Internal Server Error",
            });
        } else {
            dispatch({
                type: GET_ORDER_ITEMS_FAILURE,
                payload: error.response.data,
            });
        }
    }
};
