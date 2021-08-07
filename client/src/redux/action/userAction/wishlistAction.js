import {
    ADD_WISHLIST_REQUEST,
    ADD_WISHLIST_SUCCESS,
    ADD_WISHLIST_FAILURE,
    GET_WISHLIST_REQUEST,
    GET_WISHLIST_SUCCESS,
    GET_WISHLIST_FAILURE,
} from "../../actionCreators/userActionCreator/wishlistActionCreator.js";

import axios from "axios";

export const getWishlistAction = () => async (dispatch, getState) => {
    dispatch({ type: GET_WISHLIST_REQUEST });
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
            "/api/user/wishlist",

            config
        );
        dispatch({
            type: GET_WISHLIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        if (error.response.status === 500) {
            dispatch({
                type: GET_WISHLIST_FAILURE,
                payload: "Internal Server Error",
            });
        } else {
            dispatch({
                type: GET_WISHLIST_FAILURE,
                payload: error.response.data,
            });
        }
    }
};
export const addToWishlistAction = (id) => async (dispatch, getState) => {
    dispatch({ type: ADD_WISHLIST_REQUEST });
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
            "/api/user/wishlist",
            { wishlistId: id },
            config
        );
        console.log(data);
        dispatch({
            type: ADD_WISHLIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        console.log(error);
        console.log(error.response.status);
        console.log(error.response.headers);
        if (error.response.status === 500) {
            dispatch({
                type: ADD_WISHLIST_FAILURE,
                payload: "Internal Server Error",
            });
        } else {
            dispatch({
                type: ADD_WISHLIST_FAILURE,
                payload: error.response.data,
            });
        }
    }
};
