import axios from "axios";
import {
    ADMIN_GET_USERS_REQUEST,
    ADMIN_GET_USERS_SUCCESS,
    ADMIN_GET_USERS_FAILURE,
} from "../../actionCreators/adminActionCreator/AdminActionConstant.js";

export const getAllUserAction = () => async (dispatch, getState) => {
    const {
        userLogin: { userInfo },
    } = getState();
    try {
        dispatch({ type: ADMIN_GET_USERS_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token} `,
            },
        };
        const { data } = await axios.get("/api/admin/users", config);
        dispatch({
            type: ADMIN_GET_USERS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        if (error.response.status === 500) {
            dispatch({
                type: ADMIN_GET_USERS_FAILURE,
                payload: "Internal Server Error",
            });
        } else {
            dispatch({
                type: ADMIN_GET_USERS_FAILURE,
                payload: error.response.data,
            });
        }
    }
};
