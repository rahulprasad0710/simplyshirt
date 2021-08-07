import {
    CHECKOUT_SHIPPING,
    CHECKOUT_RESET,
    CHECKOUT_PAYMENT_REQUEST,
    CHECKOUT_PAYMENT_SUCCESS,
    CHECKOUT_PAYMENT_FAILURE,
    ADD_CARTITEM_TO_CHECKOUT,
} from "../../actionCreators/userActionCreator/checkoutActionCreator";

export const addCartitemsToCheckoutAction =
    (totalItems, priceTotal) => async (dispatch) => {
        dispatch({
            type: ADD_CARTITEM_TO_CHECKOUT,
            payload: { totalItems, priceTotal },
        });
    };

export const shippingAddressCheckoutAction =
    (shippingAddressId) => async (dispatch) => {
        dispatch({
            type: CHECKOUT_SHIPPING,
            payload: shippingAddressId,
        });
    };

export const paymentCheckoutAction = (payment) => async (dispatch) => {
    dispatch({ type: CHECKOUT_PAYMENT_REQUEST });
    try {
        dispatch({
            type: CHECKOUT_PAYMENT_SUCCESS,
            payload: payment,
        });
    } catch (error) {
        dispatch({
            type: CHECKOUT_PAYMENT_FAILURE,
            payload: error,
        });
    }
};

export const resetCheckoutAction = () => async (dispatch) => {
    dispatch({
        type: CHECKOUT_RESET,
    });
};
