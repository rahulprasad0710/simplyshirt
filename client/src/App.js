import "./App.css";
import Header from "./components/Header.jsx";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import RegisterSuccessPage from "./pages/RegisterSuccess";
import ProfilePage from "./pages/ProfilePage";
import CheckoutShippingPage from "./pages/CheckoutShippingPage";
import CheckoutPaymentPage from "./pages/CheckoutPaymentPage";
import CheckoutPlaceOrderPage from "./pages/CheckoutPlaceOrderPage";
import AdminPage from "./pages/AdminPage";
import WishlistPage from "./pages/WishlistPage";
import PlaceOrderSuccess from "./pages/PlaceOrderSuccess";
const App = () => {
    return (
        <Router>
            <div className="App">
                <Header />
                <main className="p-3">
                    <div className="container">
                        <Route exact path="/">
                            <HomePage />
                        </Route>
                        <Route path="/product/:id">
                            <ProductPage />
                        </Route>
                        <Route path="/cart">
                            <CartPage />
                        </Route>
                        <Route path="/register">
                            <RegisterPage />
                        </Route>
                        <Route path="/login">
                            <LoginPage />
                        </Route>
                        <Route path="/registersuccess">
                            <RegisterSuccessPage />
                        </Route>
                        <Route path="/profile">
                            <ProfilePage />
                        </Route>
                        <Route path="/checkout/shipping">
                            <CheckoutShippingPage />
                        </Route>
                        <Route path="/checkout/payment">
                            <CheckoutPaymentPage />
                        </Route>
                        <Route path="/checkout/placeorder">
                            <CheckoutPlaceOrderPage />
                        </Route>
                        <Route path="/admin">
                            <AdminPage />
                        </Route>
                        <Route path="/wishlist">
                            <WishlistPage />
                        </Route>
                        <Route path="/user/placeordersuccess">
                            <PlaceOrderSuccess />
                        </Route>
                    </div>
                </main>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
