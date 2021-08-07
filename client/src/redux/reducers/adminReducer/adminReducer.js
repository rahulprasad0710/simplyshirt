import {
    ADMIN_GET_USERS_REQUEST,
    ADMIN_GET_USERS_SUCCESS,
    ADMIN_GET_USERS_FAILURE,
    ADMIN_GET_PRODUCTS_REQUEST,
    ADMIN_GET_PRODUCTS_SUCCESS,
    ADMIN_GET_PRODUCTS_FAILURE,
    ADMIN_ADD_PRODUCT_REQUEST,
    ADMIN_ADD_PRODUCT_SUCCESS,
    ADMIN_ADD_PRODUCT_FAILURE,
    DELETE_PRODUCTS_REQUEST,
    DELETE_PRODUCTS_SUCCESS,
    DELETE_PRODUCTS_FAILURE,
} from "../../actionCreators/adminActionCreator/AdminActionConstant";

const adminInitialState = {
    allUsers: null,
    allOrders: null,
    allProducts: null,
    dashboard: null,
};

export const adminReducer = (state = adminInitialState, action) => {
    switch (action.type) {
        case ADMIN_GET_USERS_REQUEST:
            return { ...state, loading: true };
        case ADMIN_GET_USERS_SUCCESS:
            return { ...state, loading: false, allUsers: action.payload };
        case ADMIN_GET_USERS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case ADMIN_GET_PRODUCTS_REQUEST:
            return { ...state, loading: true };
        case ADMIN_GET_PRODUCTS_SUCCESS:
            return { ...state, loading: false, allProducts: action.payload };
        case ADMIN_GET_PRODUCTS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case DELETE_PRODUCTS_REQUEST:
            return { ...state, loading: true };
        case DELETE_PRODUCTS_SUCCESS:
            return { ...state, loading: false, allProducts: action.payload };
        case DELETE_PRODUCTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case ADMIN_ADD_PRODUCT_REQUEST:
            return { ...state, loading: true };
        case ADMIN_ADD_PRODUCT_SUCCESS:
            return { ...state, loading: false, allProducts: action.payload };
        case ADMIN_ADD_PRODUCT_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};
