import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../index.css';
// import ProductList from './ProductList';
// import Cart from './cart';

function NavBar() {
    const [isSticky, setSticky] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [logout, setLogout] = useState(false);

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
        if (!isAuthenticated) {
            setEmail("anonymous");
            return;
        } else {
            const storedEmail = localStorage.getItem('savedEmail');
            if (storedEmail) {
                setEmail(storedEmail);
            }
        }

    }, []);
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

    const handleLogout = (e) => {
        e.preventDefault();
        try {

            localStorage.setItem("isAuthenticated", false);

            alert('Bạn đã đăng xuất tài khoản!');
            setLogout(true);
            // navigate('/home');
        } catch (error) {
            if (error.message === "Firebase: Error (auth/invalid-credential).")
                alert("Tài khoản hoặc mật khẩu không đúng");
        }
    };
    const handleLogin = (e) => {
        e.preventDefault();
        setLogout(false);
        navigate('/navigation');
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
                                    <i className="fa fa-facebook" /> Fanpage
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
                            {/* <li className='social-icons'>
                                <a className="popup-with-zoom-anim search-icon"
                                    href="#test-search"
                                    onClick={toggleSearch}>
                                    <i className="fa fa-search" />
                                </a>
                            </li> */}
                            {!logout && (
                                <li>
                                    <a>
                                        {/* hoangdoan103 */}
                                        {email}
                                    </a>
                                </li>
                            )}

                            {logout ? (
                                <li>
                                    <a href="#" onClick={handleLogin}>
                                        <i class="fa fa-user-circle-o" aria-hidden="true" />
                                    </a>
                                </li>
                            ) : (
                                <li>
                                    <a href="#"
                                        onClick={handleLogout}>
                                        <i class="fa fa-sign-out" aria-hidden="true" />
                                    </a>
                                </li>
                            )}



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
                                            {/* Home */}
                                            <Link to="/home">Home</Link>
                                        </a>
                                        {/* <ul className="dropdown-menu">
                                            <li>
                                                
                                            </li>
                                        </ul> */}
                                    </li>
                                    <li>
                                        {/* <a href="#">Our Cakes</a> */}
                                        <Link to="/musical-instrument">Music</Link>
                                    </li>
                                    <li>
                                        {/* <a href="#">Menu</a> */}
                                        <Link to="/menu" >Menu</Link>
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
                                                <Link to="/aboutUs">About Us</Link>
                                            </li>
                                            <li>
                                                <a href="#">Our Chefs</a>
                                            </li>
                                            <li>
                                                <a href="#">Testimonials</a>
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
                                        {/* <ul className="dropdown-menu">
                                            <li>
                                                <a href="#">Services</a>
                                            </li>
                                            <li className="dropdown submenu">
                                                <a
                                                    className="dropdown-toggle"
                                                    data-toggle="dropdown"
                                                    href="#"
                                                    role="button"
                                                    aria-haspopup="true"
                                                    aria-expanded="false">
                                                    Gallery
                                                </a>
                                                <ul className="dropdown-menu">
                                                    <li>
                                                        <a href="#">- Gallery Classic</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            - Gallery Full width
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <a href="#">Faq</a>
                                            </li>
                                            <li>
                                                <a href="#">What we make</a>
                                            </li>
                                            <li>
                                                <a href="#">Special Recipe</a>
                                            </li>
                                            <li>
                                                <a href="#">404 page</a>
                                            </li>
                                            <li>
                                                <a href="#">Coming Soon page</a>
                                            </li>
                                        </ul> */}
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
                                                <a href="#">Blog with sidebar</a>
                                            </li>
                                            <li>
                                                <a href="#">Blog 2 column</a>
                                            </li>
                                            <li>
                                                <a href="#">Blog details</a>
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
                                                <Link to="/shop">Main shop</Link>
                                            </li>

                                            {email !== "anonymous" && (
                                                <div>
                                                    <li>
                                                        <Link to="/cart">Cart Page</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/order">Your Order</Link>
                                                    </li>
                                                </div>
                                            )}



                                        </ul>
                                    </li>
                                    <li>
                                        <Link to='/contact'>Contact Us</Link>
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