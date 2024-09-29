import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import '../index.css';
// import ProductList from './ProductList';
// import Cart from './cart';

function NavBar() {
    const [isSticky, setSticky] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    const toggleSearch = () => {
        setShowSearch(!showSearch);
    };

    const handleScroll = () => {
        if (window.scrollY > 50) { // Khoảng cách cuộn để bắt đầu dính
            setSticky(true);
        } else {
            setSticky(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <header className="main_header_area">
            <div className="top_header_area row m0">
                <div className="container">
                    <div className="float-left">
                        <a href="tell:+18004567890">
                            <i className="fa fa-phone" aria-hidden="true" />  035 898 3714
                        </a>
                        <a href="mainto:info@cakebakery.com">
                            <i className="fa fa-envelope-o" aria-hidden="true" />
                            {/* info@cakebakery.com */}
                            hoangdoan103@gmail.com
                        </a>
                    </div>
                    <div className="float-right">
                        <ul className="h_social list_style">
                            <li>
                                <a href="#">
                                    <i className="fa fa-facebook" />
                                </a>
                            </li>
                            {/* <li>
                                <a href="#">
                                    <i className="fa fa-twitter" />
                                </a>
                            </li> */}
                            {/* <li>
                                <a href="#">
                                    <i className="fa fa-google-plus" />
                                </a>
                            </li> */}
                            {/* <li>
                                <a href="#">
                                    <i className="fa fa-linkedin" />
                                </a>
                            </li> */}
                        </ul>
                        <ul className="h_search list_style">
                            {/* <li className="shop_cart">
                                <a href="#">
                                    <i className="lnr lnr-cart" />
                                </a>
                            </li> */}
                            <li>
                                {showSearch && (
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="search-input"
                                    />
                                )}
                            </li>
                            <li className='social-icons'>
                                <a className="popup-with-zoom-anim search-icon"
                                    href="#test-search"
                                    onClick={toggleSearch}>
                                    <i className="fa fa-search" />
                                </a>
                            </li>
                            <li>
                                <a href="#"><i class="fa fa-sign-out" aria-hidden="true" /></a>

                            </li>
                            <li>
                                <a href="#"><i class="fa fa-user-circle-o" aria-hidden="true" /></a>
                            </li>
                            <li>
                                <a>hoangdoan103</a>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>

            {/* <span style="position: relative;top: 0px;right: 10px;background-color: black;color: white;border-radius: 50%;20px;6px;font-size: 12px;padding: 5px;">14</span> */}

            <div className="main_menu_area">
                <nav className={`navbar ${isSticky ? 'sticky' : ''}`}>
                    <div className="container">
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <a className="navbar-brand" href="#">
                                <img src="img/logo.png" alt="" />
                                <img src="img/logo-2.png" alt="" />
                            </a>
                            <button
                                className="navbar-toggler"
                                type="button"
                                data-toggle="collapse"
                                data-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <span className="my_toggle_menu">
                                    <span />
                                    <span />
                                    <span />
                                </span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav mr-auto">
                                    <li className="dropdown submenu active">
                                        <a
                                            className="dropdown-toggle"
                                            data-toggle="dropdown"
                                            href="#"
                                            role="button"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        >
                                            Home
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li>
                                                {/* <a href="index.html">Home 1</a> */}
                                                <Link to="/home">Home 1</Link>
                                            </li>
                                            <li>
                                                <a href="index-2.html">Home 2</a>
                                            </li>
                                            <li>
                                                <a href="index-3.html">Home 3</a>
                                            </li>
                                            <li>
                                                <a href="index-4.html">Home 4</a>
                                            </li>
                                            <li>
                                                <a href="index-5.html">Home 5</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="cake.html">Our Cakes</a>
                                    </li>
                                    <li>
                                        <a href="menu.html">Menu</a>
                                    </li>
                                    <li className="dropdown submenu">
                                        <a
                                            className="dropdown-toggle"
                                            data-toggle="dropdown"
                                            href="#"
                                            role="button"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        >
                                            About Us
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <a href="about-us.html">About Us</a>
                                            </li>
                                            <li>
                                                <a href="our-team.html">Our Chefs</a>
                                            </li>
                                            <li>
                                                <a href="testimonials.html">Testimonials</a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                                <ul className="navbar-nav justify-content-end">
                                    <li className="dropdown submenu">
                                        <a
                                            className="dropdown-toggle"
                                            data-toggle="dropdown"
                                            href="#"
                                            role="button"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        >
                                            Pages
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <a href="service.html">Services</a>
                                            </li>
                                            <li className="dropdown submenu">
                                                <a
                                                    className="dropdown-toggle"
                                                    data-toggle="dropdown"
                                                    href="#"
                                                    role="button"
                                                    aria-haspopup="true"
                                                    aria-expanded="false"
                                                >
                                                    Gallery
                                                </a>
                                                <ul className="dropdown-menu">
                                                    <li>
                                                        <a href="portfolio.html">- Gallery Classic</a>
                                                    </li>
                                                    <li>
                                                        <a href="portfolio-full-width.html">
                                                            - Gallery Full width
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <a href="faq.html">Faq</a>
                                            </li>
                                            <li>
                                                <a href="what-we-make.html">What we make</a>
                                            </li>
                                            <li>
                                                <a href="special.html">Special Recipe</a>
                                            </li>
                                            <li>
                                                <a href="404.html">404 page</a>
                                            </li>
                                            <li>
                                                <a href="comming-soon.html">Coming Soon page</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="dropdown submenu">
                                        <a
                                            className="dropdown-toggle"
                                            data-toggle="dropdown"
                                            href="#"
                                            role="button"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        >
                                            Blog
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <a href="blog.html">Blog with sidebar</a>
                                            </li>
                                            <li>
                                                <a href="blog-2column.html">Blog 2 column</a>
                                            </li>
                                            <li>
                                                <a href="single-blog.html">Blog details</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="dropdown submenu">
                                        <a
                                            className="dropdown-toggle"
                                            data-toggle="dropdown"
                                            href="#"
                                            role="button"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        >
                                            Shop
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li>
                                                {/* <a href="shop.html">Main shop</a> */}
                                                <Link to="/shop">Main shop</Link>
                                            </li>
                                            {/* <li>
                                            <Link to="/product-details">Product Details</Link>
                                        </li> */}
                                            <li>
                                                {/* <a href="cart.html">Cart Page</a> */}
                                                <Link to="/cart">Cart Page</Link>
                                            </li>
                                            <li>
                                                <a href="checkout.html">Checkout Page</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="contact.html">Contact Us</a>
                                    </li>
                                </ul>
                            </div>
                        </nav>




                    </div>
                </nav>
            </div>

        </header>
    );
}

export default NavBar