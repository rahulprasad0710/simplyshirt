import {
    AUTH_LOGIN_REQUEST,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_LOGOUT_REQUEST,
    AUTH_REGISTER_SUCCESS,
    AUTH_REGISTER_REQUEST,
    AUTH_REGISTER_FAILURE,
} from "../actionCreators/authActionCretor";

const userInitailState = {
    userInfo: null,
};

export const authLoginReducer = (state = userInitailState, action) => {
    switch (action.type) {
        case AUTH_LOGIN_REQUEST:
            return { ...state, loading: true };
        case AUTH_LOGIN_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload,
            };
        case AUTH_LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case AUTH_LOGOUT_REQUEST:
            return {
                userInfo: null,
            };

        default:
            return state;
    }
};

const newUserIntialState = {
    newUser: null,
};
export const authRegisterReducer = (state = newUserIntialState, action) => {
    switch (action.type) {
        case AUTH_REGISTER_REQUEST:
            return { ...state, newUser: null, loading: true };
        case AUTH_REGISTER_SUCCESS:
            return {
                ...state,
                message: action.payload.data,
                status: action.payload.status,
                loading: false,
            };
        case AUTH_REGISTER_FAILURE:
            return {
                ...state,
                message: action.payload.message,
                status: action.payload.status,
                loading: false,
            };

        default:
            return state;
    }
};
