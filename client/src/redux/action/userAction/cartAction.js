// import axios from "axios";
import {
    ADD_TO_CART_ITEM_REQUEST,
    ADD_TO_CART_ITEM_SUCCESS,
    ADD_TO_CART_ITEM_FAILURE,
    GET_CART_ITEM_REQUEST,
    GET_CART_ITEM_SUCCESS,
    GET_CART_ITEM_FAILURE,
    UPADTE_CART_ITEM_REQUEST,
    UPADTE_CART_ITEM_SUCCESS,
    UPADTE_CART_ITEM_FAILURE,
    REMOVE_FROM_CART_REQUEST,
    REMOVE_FROM_CART_SUCCESS,
    REMOVE_FROM_CART_FAILURE,
} from "../../actionCreators/userActionCreator/cartActionCreator";

import axios from "axios";

export const getUserCartItemActionFn = () => async (dispatch, getState) => {
    dispatch({ type: GET_CART_ITEM_REQUEST });
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
            "/api/user/cart",

            config
        );
        console.log(data);
        dispatch({
            type: GET_CART_ITEM_SUCCESS,
            payload: data,
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: GET_CART_ITEM_FAILURE,
            payload: error,
        });
    }
};

export const addToCartActionFn =
    (productId, qty) => async (dispatch, getState) => {
        dispatch({ type: ADD_TO_CART_ITEM_REQUEST });
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
                "/api/user/cart",
                {
                    productId,
                    qty,
                },
                config
            );
            console.log(data);
            dispatch({
                type: ADD_TO_CART_ITEM_SUCCESS,
                payload: data,
            });
        } catch (error) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            if (error.response.status === 500) {
                dispatch({
                    type: ADD_TO_CART_ITEM_FAILURE,
                    payload: "Internal Server Error",
                });
            } else {
                dispatch({
                    type: ADD_TO_CART_ITEM_FAILURE,
                    payload: error.response.data,
                });
            }
        }
    };

export const removeFromCartActionFn = (id) => async (dispatch, getState) => {
    dispatch({ type: REMOVE_FROM_CART_REQUEST });
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

        const { data } = await axios.delete(
            `/api/user/cart/${id}`,

            config
        );
        console.log(data);
        dispatch({
            type: REMOVE_FROM_CART_SUCCESS,
            payload: data,
        });
    } catch (error) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        if (error.response.status === 500) {
            dispatch({
                type: REMOVE_FROM_CART_FAILURE,
                payload: "Internal Server Error",
            });
        } else {
            dispatch({
                type: REMOVE_FROM_CART_FAILURE,
                payload: error.response.data,
            });
        }
    }
};

export const updateCartActionFn =
    (cartItemId, qty) => async (dispatch, getState) => {
        dispatch({ type: UPADTE_CART_ITEM_REQUEST });
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
            const { data } = await axios.put(
                "/api/user/cart",
                {
                    cartItemId,
                    qty,
                },
                config
            );
            console.log(data);
            dispatch({
                type: UPADTE_CART_ITEM_SUCCESS,
                payload: data,
            });
        } catch (error) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            if (error.response.status === 500) {
                dispatch({
                    type: UPADTE_CART_ITEM_FAILURE,
                    payload: "Internal Server Error",
                });
            } else {
                dispatch({
                    type: UPADTE_CART_ITEM_FAILURE,
                    payload: error.response.data,
                });
            }
        }
    };
