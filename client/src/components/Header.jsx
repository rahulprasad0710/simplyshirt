import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import home from "../assets/home.svg";
import { useSelector } from "react-redux";
import Model from "./Model";
import tshirtIcon from "../assets/tshirt.svg";
const Header = () => {
    const { userInfo, loading } = useSelector((state) => state.userLogin);
    const [showModel, setshowModel] = useState(false);

    return (
        <Navbar
            className="new_blue align-items-center"
            collapseOnSelect
            variant="dark"
            expand="lg"
            bg="primary">
            <Model showModel={showModel} setshowModel={setshowModel} />
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>
                        <div className="vegan text-warning d-flex ">
                            <h3 classname="my-0">Simply</h3>
                            <img
                                src={tshirtIcon}
                                className="campony-icon"
                                alt="icon"
                            />
                            <h3 classname="my-0">Shirt</h3>
                        </div>
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        {userInfo && (
                            <NavDropdown
                                title={<i className="far fa-user"></i>}
                                id="basic-nav-dropdown">
                                <Link
                                    className="dropdown-item"
                                    to="/profile/myinfo">
                                    <i className="fas fa-user-circle"></i> My
                                    Profile
                                </Link>

                                <Link
                                    className="dropdown-item"
                                    to="/profile/myaddress">
                                    <i class="far fa-address-card"></i> My
                                    Address
                                </Link>
                                <Link
                                    className="dropdown-item"
                                    to="/profile/wallet">
                                    <i className="fas fa-wallet"></i> My
                                    Payments
                                </Link>
                                <Link
                                    className="dropdown-item"
                                    to="/profile/myorders">
                                    <i className="fas fa-cart-arrow-down"></i>{" "}
                                    My Orders{" "}
                                </Link>
                                <NavDropdown.Divider />
                                <NavDropdown.Item
                                    onClick={() => setshowModel(true)}
                                    disabled={loading}>
                                    <i className="fas fa-sign-out-alt"></i> Log
                                    out
                                </NavDropdown.Item>
                            </NavDropdown>
                        )}
                        {userInfo && userInfo.isAdmin && (
                            <NavDropdown
                                title={"Admin"}
                                id="basic-nav-dropdown">
                                <Link
                                    className="dropdown-item"
                                    to="/admin/dashboard">
                                    <i className="fas fa-chart-line"></i>{" "}
                                    Dashboard
                                </Link>
                                <Link
                                    className="dropdown-item"
                                    to="/admin/users">
                                    <i class="fas fa-users-cog"></i> Users
                                </Link>
                                <Link
                                    className="dropdown-item"
                                    to="/admin/products">
                                    <i class="fab fa-product-hunt"></i> Products
                                </Link>
                                <Link
                                    className="dropdown-item"
                                    to="/admin/orders">
                                    <i className="fas fa-wallet"></i> Orders
                                </Link>
                            </NavDropdown>
                        )}
                        <LinkContainer to="/wishlist">
                            <Nav.Link>
                                <i className="far fa-heart"></i>
                            </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/cart">
                            <Nav.Link>
                                <i className="fas fa-shopping-cart"></i> Cart{" "}
                            </Nav.Link>
                        </LinkContainer>
                        {!userInfo && (
                            <LinkContainer to="/login">
                                <Nav.Link>Login</Nav.Link>
                            </LinkContainer>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
