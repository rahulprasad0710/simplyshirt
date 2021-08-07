import {
    AUTH_LOGIN_REQUEST,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_LOGOUT_REQUEST,
    AUTH_REGISTER_REQUEST,
    AUTH_REGISTER_FAILURE,
    AUTH_REGISTER_SUCCESS,
} from "../actionCreators/authActionCretor";

import axios from "axios";

export const userLoginActionFn = (user) => async (dispatch) => {
    try {
        dispatch({ type: AUTH_LOGIN_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.post("/api/auth/login", user, config);

        dispatch({
            type: AUTH_LOGIN_SUCCESS,
            payload: data,
        });

        localStorage.setItem("userLogged", JSON.stringify(data));
    } catch (error) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        dispatch({
            type: AUTH_LOGIN_FAILURE,
            payload: error.response.data,
        });
    }
};
export const userLogoutActionFn = (user) => async (dispatch) => {
    dispatch({ type: AUTH_LOGOUT_REQUEST });
    localStorage.setItem("userLogged", JSON.stringify(null));
};

//Regsiter User
export const userRegisterActionFn = (user) => async (dispatch) => {
    try {
        dispatch({ type: AUTH_REGISTER_REQUEST });
        const response = await axios.post("api/auth/register", user);
        console.log(response);
        dispatch({
            type: AUTH_REGISTER_SUCCESS,
            payload: {
                data: response.data.message,
                status: response.status,
            },
        });
    } catch (error) {
        dispatch({
            type: AUTH_REGISTER_FAILURE,
            payload: {
                message: error.response.data,
                status: error.response.status,
            },
        });
    }
};

// axios error msg
//  console.log("msg", error.response.data);
//         console.log(error.response.status);
//         console.log(error.response.headers);
//         console.log(error);
