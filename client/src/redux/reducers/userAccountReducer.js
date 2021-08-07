import {
    USER_PROFILE_REQUEST,
    USER_PROFILE_SUCCESS,
    USER_PROFILE_FAILURE,
    USER_PROFILE_RESET,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILURE,
    USER_ADDRESS_POST_REQUEST,
    USER_ADDRESS_POST_SUCCESS,
    USER_ADDRESS_POST_FAILURE,
} from "../actionCreators/userAccountCreator";
import {
    GET_ORDER_ITEMS_REQUEST,
    GET_ORDER_ITEMS_SUCCESS,
    GET_ORDER_ITEMS_FAILURE,
} from "../actionCreators/userActionCreator/orderActionCreator";
import {
    GET_CART_ITEM_REQUEST,
    GET_CART_ITEM_SUCCESS,
    GET_CART_ITEM_FAILURE,
    ADD_TO_CART_ITEM_REQUEST,
    ADD_TO_CART_ITEM_SUCCESS,
    ADD_TO_CART_ITEM_FAILURE,
    UPADTE_CART_ITEM_REQUEST,
    UPADTE_CART_ITEM_SUCCESS,
    UPADTE_CART_ITEM_FAILURE,
    REMOVE_FROM_CART_REQUEST,
    REMOVE_FROM_CART_SUCCESS,
    REMOVE_FROM_CART_FAILURE,
} from "../actionCreators/userActionCreator/cartActionCreator";

import {
    ADD_WISHLIST_REQUEST,
    ADD_WISHLIST_SUCCESS,
    ADD_WISHLIST_FAILURE,
    GET_WISHLIST_REQUEST,
    GET_WISHLIST_SUCCESS,
    GET_WISHLIST_FAILURE,
} from "../actionCreators/userActionCreator/wishlistActionCreator";

const userProfileInitailState = {
    userDetails: null,
    userOrders: [],
    userAddresses: [],
    userWishlist: { wishlist: [] },
    userCart: { cartItems: [] },
};

export const userDetailsReducer = (state = userProfileInitailState, action) => {
    switch (action.type) {
        case USER_PROFILE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case USER_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                userDetails: action.payload,
                userAddresses: action.payload.addresses,
            };
        case USER_PROFILE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                userDetails: action.payload,
            };
        case UPDATE_PROFILE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case USER_ADDRESS_POST_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case USER_ADDRESS_POST_SUCCESS:
            return {
                ...state,
                loading: false,
                userAddresses: action.payload.addresses,
            };
        case USER_ADDRESS_POST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case ADD_WISHLIST_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ADD_WISHLIST_SUCCESS:
            return {
                ...state,
                loading: false,
                userWishlist: action.payload,
            };
        case ADD_WISHLIST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case GET_WISHLIST_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_WISHLIST_SUCCESS:
            return {
                ...state,
                loading: false,
                userWishlist: action.payload,
            };
        case GET_WISHLIST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case GET_ORDER_ITEMS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_ORDER_ITEMS_SUCCESS:
            return {
                ...state,
                loading: false,
                userOrders: action.payload,
            };
        case GET_ORDER_ITEMS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case ADD_TO_CART_ITEM_REQUEST:
            return { ...state, loading: true };

        case ADD_TO_CART_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                userCart: action.payload,
            };
        case ADD_TO_CART_ITEM_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case REMOVE_FROM_CART_REQUEST:
            return { ...state, loading: true };

        case REMOVE_FROM_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                userCart: action.payload,
            };
        case REMOVE_FROM_CART_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case GET_CART_ITEM_REQUEST:
            return { ...state, loading: true };

        case GET_CART_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                userCart: action.payload,
            };
        case GET_CART_ITEM_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case UPADTE_CART_ITEM_REQUEST:
            return { ...state, loading: true };

        case UPADTE_CART_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                userCart: action.payload,
            };
        case UPADTE_CART_ITEM_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case USER_PROFILE_RESET:
            return {
                userDetails: null,
                userAddresses: [],
                userWishlist: { wishlist: [] },
                userCart: { cartItems: [] },
            };

        default:
            return state;
    }
};
