import axios from "axios";
import {
    ADMIN_ADD_PRODUCT_REQUEST,
    ADMIN_ADD_PRODUCT_SUCCESS,
    ADMIN_ADD_PRODUCT_FAILURE,
    ADMIN_GET_PRODUCTS_REQUEST,
    ADMIN_GET_PRODUCTS_SUCCESS,
    ADMIN_GET_PRODUCTS_FAILURE,
    DELETE_PRODUCTS_REQUEST,
    DELETE_PRODUCTS_SUCCESS,
    DELETE_PRODUCTS_FAILURE,
} from "../../actionCreators/adminActionCreator/AdminActionConstant.js";

//Get All  products
export const getAllProductsAction = () => async (dispatch, getState) => {
    const {
        userLogin: { userInfo },
    } = getState();
    try {
        dispatch({ type: ADMIN_GET_PRODUCTS_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token} `,
            },
        };
        const { data } = await axios.get("/api/admin/product", config);
        dispatch({
            type: ADMIN_GET_PRODUCTS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        if (error.response.status === 500) {
            dispatch({
                type: ADMIN_GET_PRODUCTS_FAILURE,
                payload: "Internal Server Error",
            });
        } else {
            dispatch({
                type: ADMIN_GET_PRODUCTS_FAILURE,
                payload: error.response.data,
            });
        }
    }
};

//Add a product
export const addProductAction =
    (imageDetails) => async (dispatch, getState) => {
        const {
            userLogin: { userInfo },
        } = getState();
        try {
            dispatch({ type: ADMIN_ADD_PRODUCT_REQUEST });

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token} `,
                },
            };
            const { data } = await axios.post(
                "/api/admin/addproduct",
                imageDetails,
                config
            );
            dispatch({
                type: ADMIN_ADD_PRODUCT_SUCCESS,
                payload: data,
            });
        } catch (error) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            if (error.response.status === 500) {
                dispatch({
                    type: ADMIN_ADD_PRODUCT_FAILURE,
                    payload: "Internal Server Error",
                });
            } else {
                dispatch({
                    type: ADMIN_ADD_PRODUCT_FAILURE,
                    payload: error.response.data,
                });
            }
        }
    };
export const deleteProductAction = (id) => async (dispatch, getState) => {
    console.log(id);
    const {
        userLogin: { userInfo },
    } = getState();
    try {
        dispatch({ type: DELETE_PRODUCTS_REQUEST });
        console.log(userInfo.token);
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token} `,
            },
        };
        const { data } = await axios.put(
            `/api/admin/deleteproduct/${id}`,
            { msg: "Hello" },
            config
        );
        dispatch({
            type: DELETE_PRODUCTS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        if (error.response.status === 500) {
            dispatch({
                type: DELETE_PRODUCTS_FAILURE,
                payload: "Internal Server Error",
            });
        } else {
            dispatch({
                type: DELETE_PRODUCTS_FAILURE,
                payload: error.response.data,
            });
        }
    }
};
