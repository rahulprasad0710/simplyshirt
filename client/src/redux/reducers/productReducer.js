import {
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    ONE_PRODUCT_REQUEST,
    ONE_PRODUCT_SUCCESS,
    ONE_PRODUCT_FAIL,
} from "../actionCreators/productActionCreators";

const allProductsInitailState = {
    products: [],
};

export const productReducer = (state = allProductsInitailState, action) => {
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
            return { ...state, loading: true };
        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload,
            };
        case ALL_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

const oneProductsInitailState = {
    product: [],
};

export const productDetailsReducer = (
    state = oneProductsInitailState,
    action
) => {
    switch (action.type) {
        case ONE_PRODUCT_REQUEST:
            return { ...state, loading: true };
        case ONE_PRODUCT_SUCCESS:
            return {
                loading: false,
                product: action.payload,
            };
        case ONE_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};
