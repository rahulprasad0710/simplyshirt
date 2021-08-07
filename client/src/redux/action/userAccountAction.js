import {
    USER_PROFILE_REQUEST,
    USER_PROFILE_SUCCESS,
    USER_PROFILE_FAILURE,
    USER_PROFILE_RESET,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILURE,
} from "../actionCreators/userAccountCreator";
import axios from "axios";

export const userProfileDetailsActionFn = () => async (dispatch, getState) => {
    dispatch({ type: USER_PROFILE_REQUEST });

    const {
        userLogin: { userInfo },
    } = getState();
    try {
        if (!userInfo) {
            dispatch({
                type: USER_PROFILE_FAILURE,
                payload: "Login to access.",
            });
        } else {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token} `,
                },
            };
            const { data } = await axios.get("/api/user/profile", config);
            console.log(data);
            dispatch({
                type: USER_PROFILE_SUCCESS,
                payload: data,
            });
        }
    } catch (error) {
        console.log(error);

        dispatch({
            type: USER_PROFILE_FAILURE,
            payload: "error hello",
        });
    }
};

export const updateProfileDetailsActionFn =
    (user) => async (dispatch, getState) => {
        dispatch({ type: UPDATE_PROFILE_REQUEST });

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
            const response = await axios.put("/api/user/profile", user, config);
            console.log(response);
            dispatch({
                type: UPDATE_PROFILE_SUCCESS,
                payload: response.data,
            });
        } catch (error) {
            console.log(error);
            // console.log(error.response.status);
            // console.log(error.response.headers);
            dispatch({
                type: UPDATE_PROFILE_FAILURE,
                payload: error,
            });
        }
    };

export const userProfileResetActionFn = (user) => async (dispatch) => {
    dispatch({ type: USER_PROFILE_RESET });
};
