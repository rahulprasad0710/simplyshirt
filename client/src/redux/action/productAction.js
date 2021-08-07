import {
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    ONE_PRODUCT_REQUEST,
    ONE_PRODUCT_SUCCESS,
    ONE_PRODUCT_FAIL,
} from "../actionCreators/productActionCreators.js";

import axios from "axios";

export const allProductAction = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCT_REQUEST });
        const { data } = await axios.get("/api/products");
        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data,
        });
    } catch (error) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        if (error.response.status === 500) {
            dispatch({
                type: ALL_PRODUCT_FAIL,
                payload: "Internal Server Error",
            });
        } else {
            dispatch({
                type: ALL_PRODUCT_FAIL,
                payload: error.response.data,
            });
        }
    }
};

export const oneProductAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: ONE_PRODUCT_REQUEST });
        const { data } = await axios.get(`/api/products/${id}`);
        dispatch({
            type: ONE_PRODUCT_SUCCESS,
            payload: data,
        });
    } catch (error) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        dispatch({
            type: ONE_PRODUCT_FAIL,
            payload: error.response.data,
        });
    }
};
