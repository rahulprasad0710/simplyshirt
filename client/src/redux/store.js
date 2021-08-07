import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
    productReducer,
    productDetailsReducer,
} from "./reducers/productReducer";

import { authLoginReducer, authRegisterReducer } from "./reducers/authReducer";
import { userDetailsReducer } from "./reducers/userAccountReducer";
import { wishlistReducer } from "./reducers/userReducer/userWishlistReducer";
import { checkoutReducer } from "./reducers/userReducer/checkoutReducer";
import { placeOrderReducer } from "./reducers/userReducer/placeOrderReducer";
import { adminReducer } from "./reducers/adminReducer/adminReducer";
const reducer = combineReducers({
    allProducts: productReducer,
    productDetails: productDetailsReducer,
    userLogin: authLoginReducer,
    newUser: authRegisterReducer,
    profileInfo: userDetailsReducer,
    wishlist: wishlistReducer,
    checkout: checkoutReducer,
    placeOrder: placeOrderReducer,
    admin: adminReducer,
});

const userLoggedFromLStore = localStorage.getItem("userLogged")
    ? JSON.parse(localStorage.getItem("userLogged"))
    : null;

const initialState = {
    userLogin: { userInfo: userLoggedFromLStore },
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
