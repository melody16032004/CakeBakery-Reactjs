import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import Search from "../components/searchBox";
import Newsletter from "../components/newsletter";
import { useLocation } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop';

const Product = () => {
    const location = useLocation();
    const { id, name, price, image, image_L } = location.state || {};
    return (
        <div>
            <ScrollToTop />
            <NavBar></NavBar>
            <div>
                <section className="banner_area">
                    <div className="container">
                        <div className="banner_text">
                            <h3>Product Details</h3>
                            <ul>
                                <li>
                                    <Link to="/shop">Shop</Link>
                                </li>
                                <li>
                                    <Link to="/product-details">Product Details</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="product_details_area p_100">
                    <div className="container">
                        <div className="row product_d_price">
                            <div className="col-lg-6">
                                <div className="product_img">
                                    <img
                                        className="img-fluid"
                                        src={image_L}
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="product_details_text">
                                    <h4>{name}</h4>
                                    <p>
                                        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                                        aut fugit, sed quia consequ untur magni dolores eos qui ratione
                                        voluptatem sequi nesciunt. Neque porro quisquam est,{" "}
                                    </p>
                                    <h5>
                                        Price :<span>${price}</span>
                                    </h5>
                                    <div className="quantity_box">
                                        <label htmlFor="quantity">Quantity :</label>
                                        <input type="text" placeholder={1} id="quantity" />
                                    </div>
                                    <a className="pink_more" href="#">
                                        Add to Cart
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="product_tab_area">
                            <nav>
                                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                    <a
                                        className="nav-item nav-link active"
                                        id="nav-home-tab"
                                        data-toggle="tab"
                                        href="#nav-home"
                                        role="tab"
                                        aria-controls="nav-home"
                                        aria-selected="true"
                                    >
                                        Descripton
                                    </a>
                                    <a
                                        className="nav-item nav-link"
                                        id="nav-profile-tab"
                                        data-toggle="tab"
                                        href="#nav-profile"
                                        role="tab"
                                        aria-controls="nav-profile"
                                        aria-selected="false"
                                    >
                                        Specification
                                    </a>
                                    <a
                                        className="nav-item nav-link"
                                        id="nav-contact-tab"
                                        data-toggle="tab"
                                        href="#nav-contact"
                                        role="tab"
                                        aria-controls="nav-contact"
                                        aria-selected="false"
                                    >
                                        Review (0)
                                    </a>
                                </div>
                            </nav>
                            <div className="tab-content" id="nav-tabContent">
                                <div
                                    className="tab-pane fade show active"
                                    id="nav-home"
                                    role="tabpanel"
                                    aria-labelledby="nav-home-tab"
                                >
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                        enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                                        reprehenderit in voluptate velit esse cillum dolore eu fugiat
                                        nulla pariatur.
                                    </p>
                                    <p>
                                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                                        officia deserunt mollit anim id est laborum consectetur adipiscing
                                        elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                                        dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                                        proident, sunt in culpa qui officia deserunt mollit anim id est
                                        laborum
                                    </p>
                                </div>
                                <div
                                    className="tab-pane fade"
                                    id="nav-profile"
                                    role="tabpanel"
                                    aria-labelledby="nav-profile-tab"
                                >
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                        enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                                        reprehenderit in voluptate velit esse cillum dolore eu fugiat
                                        nulla pariatur.
                                    </p>
                                    <p>
                                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                                        officia deserunt mollit anim id est laborum consectetur adipiscing
                                        elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                                        dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                                        proident, sunt in culpa qui officia deserunt mollit anim id est
                                        laborum
                                    </p>
                                </div>
                                <div
                                    className="tab-pane fade"
                                    id="nav-contact"
                                    role="tabpanel"
                                    aria-labelledby="nav-contact-tab"
                                >
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                        enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                                        reprehenderit in voluptate velit esse cillum dolore eu fugiat
                                        nulla pariatur.
                                    </p>
                                    <p>
                                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                                        officia deserunt mollit anim id est laborum consectetur adipiscing
                                        elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                                        dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                                        proident, sunt in culpa qui officia deserunt mollit anim id est
                                        laborum
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="similar_product_area p_100">
                    <div className="container">
                        <div className="main_title">
                            <h2>Similar Products</h2>
                        </div>
                        <div className="row similar_product_inner">
                            <div className="col-lg-3 col-md-4 col-6">
                                <div className="cake_feature_item">
                                    <div className="cake_img">
                                        <img src="img/cake-feature/c-feature-1.jpg" alt="" />
                                    </div>
                                    <div className="cake_text">
                                        <h4>$29</h4>
                                        <h3>Strawberry Cupcakes</h3>
                                        <a className="pest_btn" href="#">
                                            Add to cart
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4 col-6">
                                <div className="cake_feature_item">
                                    <div className="cake_img">
                                        <img src="img/cake-feature/c-feature-2.jpg" alt="" />
                                    </div>
                                    <div className="cake_text">
                                        <h4>$29</h4>
                                        <h3>Strawberry Cupcakes</h3>
                                        <a className="pest_btn" href="#">
                                            Add to cart
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4 col-6">
                                <div className="cake_feature_item">
                                    <div className="cake_img">
                                        <img src="img/cake-feature/c-feature-3.jpg" alt="" />
                                    </div>
                                    <div className="cake_text">
                                        <h4>$29</h4>
                                        <h3>Strawberry Cupcakes</h3>
                                        <a className="pest_btn" href="#">
                                            Add to cart
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4 col-6">
                                <div className="cake_feature_item">
                                    <div className="cake_img">
                                        <img src="img/cake-feature/c-feature-4.jpg" alt="" />
                                    </div>
                                    <div className="cake_text">
                                        <h4>$29</h4>
                                        <h3>Strawberry Cupcakes</h3>
                                        <a className="pest_btn" href="#">
                                            Add to cart
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <Newsletter></Newsletter>
                <Search></Search>
            </div>

            <h1>{name}</h1>
            <img src={image} alt={name} />
            <p>Price: ${price}</p>
            {/* Thêm thông tin khác về sản phẩm nếu cần */}
            <Footer></Footer>
        </div>
    );
}

export default Product