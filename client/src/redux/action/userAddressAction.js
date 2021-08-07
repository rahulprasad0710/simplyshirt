import {
    USER_ADDRESS_POST_REQUEST,
    USER_ADDRESS_POST_SUCCESS,
    USER_ADDRESS_POST_FAILURE,
} from "../actionCreators/userAccountCreator";
import axios from "axios";

export const userAddressPostActionFn =
    (address) => async (dispatch, getState) => {
        dispatch({ type: USER_ADDRESS_POST_REQUEST });

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
                "/api/user/address",
                address,
                config
            );
            console.log(data);
            dispatch({
                type: USER_ADDRESS_POST_SUCCESS,
                payload: data,
            });
        } catch (error) {
            console.log(error);
            // console.log(error.response.status);
            // console.log(error.response.headers);
            dispatch({
                type: USER_ADDRESS_POST_FAILURE,
                payload: error.response,
            });
        }
    };
