import {
    CHECKOUT_SHIPPING,
    CHECKOUT_PAYMENT_REQUEST,
    CHECKOUT_PAYMENT_SUCCESS,
    CHECKOUT_PAYMENT_FAILURE,
    ADD_CARTITEM_TO_CHECKOUT,
    CHECKOUT_RESET,
} from "../../actionCreators/userActionCreator/checkoutActionCreator";

const checkoutInitialState = {
    totalItems: null,
    priceTotal: null,
    shippingAddress: [],
    shippingSuccess: false,
    payment: { paymentSuccess: false },
    placeOrder: false,
};

export const checkoutReducer = (state = checkoutInitialState, action) => {
    switch (action.type) {
        case CHECKOUT_SHIPPING:
            return {
                ...state,
                shippingAddress: action.payload,
                shippingSuccess: true,
            };
        case ADD_CARTITEM_TO_CHECKOUT:
            return {
                ...state,
                totalItems: action.payload.totalItems,
                priceTotal: action.payload.priceTotal,
            };

        case CHECKOUT_PAYMENT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CHECKOUT_PAYMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                payment: action.payload,
            };
        case CHECKOUT_PAYMENT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case CHECKOUT_RESET:
            return {
                ...state,
                shippingAddress: [],
                shippingSuccess: false,
                payment: { paymentSuccess: false },
                placeOrder: false,
            };

        default:
            return state;
    }
};
