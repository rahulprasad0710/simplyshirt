import {
    ORDER_PLACE_REQUEST,
    ORDER_PLACE_SUCCESS,
    ORDER_PLACE_FAILURE,
} from "../../actionCreators/userActionCreator/placeOrderActionCreator";

const orderInitailState = {
    serverOrderDetials: { placeOrderSuccess: false },
};

export const placeOrderReducer = (state = orderInitailState, action) => {
    switch (action.type) {
        case ORDER_PLACE_REQUEST:
            return { ...state, loading: true };

        case ORDER_PLACE_SUCCESS:
            return {
                loading: false,
                serverOrderDetials: action.payload,
            };
        case ORDER_PLACE_FAILURE:
            return {
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};
