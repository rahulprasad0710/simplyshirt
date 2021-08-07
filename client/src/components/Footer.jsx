import tshirtIcon from "../assets/tshirt.svg";
import fbIcon from "../assets/png/045-facebook.png";
import linkedIcon from "../assets/png/031-linkedin.png";
import instaIcon from "../assets/png/034-instagram.png";
import githubIcon from "../assets/png/039-github.png";
import { Link } from "react-router-dom";
const Footer = () => {
    return (
        <section className="bg-primary py-4" id="footer">
            <div className="container text-light">
                <div className="row footer_items">
                    <div className="col-md-4 footer_items_container">
                        <Link to="/">
                            <div className="vegan d-flex text-warning  mb-3 ">
                                <h3>Simply</h3>
                                <img
                                    src={tshirtIcon}
                                    className="campony-icon"
                                    alt="icon"
                                />
                                <h3>Shirt</h3>
                            </div>
                        </Link>

                        <div>
                            <ul>
                                <li>Products</li>
                                <li>Privacy</li>
                                <li>Terms And Conditions</li>
                                <li>Contact</li>
                                <li>Refunds</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-4 footer_items_container">
                        <h5 className="text-warning">CONTACT US</h5>
                        <p>
                            <i className="fas fa-map-marker-alt"></i>
                            Jankpur,Dhanusha,Nepal
                        </p>
                        <p>
                            <i className="fas fa-phone-alt"></i> +9779801234567
                        </p>
                        <p>
                            <i className="fas fa-envelope-square"></i>{" "}
                            abc@gmail.com
                        </p>
                        <ul className="d-flex">
                            <li>
                                <a href="/">
                                    <img
                                        className="social-icon"
                                        src={fbIcon}
                                        alt="facebook"
                                    />
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <img
                                        className="social-icon"
                                        src={linkedIcon}
                                        alt="LinkedIn"
                                    />
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <img
                                        className="social-icon"
                                        src={instaIcon}
                                        alt="Instagram"
                                    />
                                </a>
                            </li>
                            <li>
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://github.com/rahulprasad0710">
                                    <img
                                        className="social-icon"
                                        src={githubIcon}
                                        alt="Github"
                                    />
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-4 footer_items_container">
                        <h5 className="mr-auto">SUBSCRIBE NEWSLETTER</h5>
                        <input
                            className="form-control my-3"
                            placeholder="YOUR EMAIL"
                            type="text"
                        />
                        <button className="btn btn-warning d-block ml-auto">
                            SUBSCRIBE
                        </button>
                    </div>
                </div>
                <p className="text-center ">
                    All right Reserved. &#169; copyright 2021
                    <span>
                        <a
                            className="rahul"
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://github.com/rahulprasad0710">
                            RAHUL
                        </a>
                    </span>
                </p>
            </div>
        </section>
    );
};

export default Footer;
