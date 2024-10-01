import React from "react";
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import { Link } from "react-router-dom";

const Menu = () => {
    return (
        <div>
            <NavBar />
            <section className="banner_area">
                <div className="container">
                    <div className="banner_text">
                        <h3>Menu</h3>
                        <ul>
                            <li>
                                <Link to='/home'>Home</Link>
                            </li>
                            <li>
                                <Link to='/menu'>Menu</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/*  */}

            <section className="price_list_area p_100">
                <div className="container">
                    <div className="price_list_inner">
                        <div className="single_pest_title">
                            <h2>Our Price List</h2>
                            <p>
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                                quae ab illo inventore veritatis et quasi architecto beatae vitae
                                dicta sunt explicabo.
                            </p>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="discover_item_inner">
                                    <div className="discover_item">
                                        <h4>Double Chocolate Pie</h4>
                                        <p>
                                            Chocolate puding, vanilla, fruite rasberry jam milk{" "}
                                            <span>$8.99</span>
                                        </p>
                                    </div>
                                    <div className="discover_item">
                                        <h4>Zabaglione Cake</h4>
                                        <p>
                                            Chocolate puding, vanilla, fruite rasberry jam evporate milk{" "}
                                            <span>$12.99</span>
                                        </p>
                                    </div>
                                    <div className="discover_item">
                                        <h4>Blueberry Muffin</h4>
                                        <p>
                                            Chocolate puding, vanilla, fruite rasberry jam milk{" "}
                                            <span>$8.99</span>
                                        </p>
                                    </div>
                                    <div className="discover_item">
                                        <h4>Box of Delight</h4>
                                        <p>
                                            Chocolate puding, vanilla, fruite rasberry jam evporate milk{" "}
                                            <span>$7.99</span>
                                        </p>
                                    </div>
                                    <div className="discover_item">
                                        <h4>Classic French Croissant</h4>
                                        <p>
                                            Chocolate puding, vanilla, fruite rasberry jam evporate milk{" "}
                                            <span>$6.79</span>
                                        </p>
                                    </div>
                                    <div className="discover_item">
                                        <h4>Macarons &amp; Tea</h4>
                                        <p>
                                            Chocolate puding, vanilla, fruite rasberry jam evporate milk{" "}
                                            <span>$5.99</span>
                                        </p>
                                    </div>
                                    <div className="discover_item">
                                        <h4>Strawberry Sweet Cake</h4>
                                        <p>
                                            Chocolate puding, vanilla, fruite rasberry jam evporate milk{" "}
                                            <span>$12.99</span>
                                        </p>
                                    </div>
                                    <div className="discover_item">
                                        <h4>Cupcake of Vanela</h4>
                                        <p>
                                            Chocolate puding, vanilla, fruite rasberry jam evporate milk{" "}
                                            <span>$20.00</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="discover_item_inner">
                                    <div className="discover_item">
                                        <h4>Fried Egg Sandwich</h4>
                                        <p>
                                            Chocolate puding, vanilla, fruite rasberry jam milk{" "}
                                            <span>$8.99</span>
                                        </p>
                                    </div>
                                    <div className="discover_item">
                                        <h4>Multigrain Hot Cake</h4>
                                        <p>
                                            Chocolate puding, vanilla, fruite rasberry jam evporate milk{" "}
                                            <span>$12.99</span>
                                        </p>
                                    </div>
                                    <div className="discover_item">
                                        <h4>Branch Special Cake</h4>
                                        <p>
                                            Chocolate puding, vanilla, fruite rasberry jam milk{" "}
                                            <span>$8.99</span>
                                        </p>
                                    </div>
                                    <div className="discover_item">
                                        <h4>Bialy Egg Sandwich with Cake</h4>
                                        <p>
                                            Chocolate puding, vanilla, fruite rasberry jam milk{" "}
                                            <span>$7.99</span>
                                        </p>
                                    </div>
                                    <div className="discover_item">
                                        <h4>Strawberry Sweet Cake</h4>
                                        <p>
                                            Chocolate puding, vanilla, fruite rasberry jam evporate milk{" "}
                                            <span>$6.79</span>
                                        </p>
                                    </div>
                                    <div className="discover_item">
                                        <h4>Double Chocolate Pie</h4>
                                        <p>
                                            Chocolate puding, vanilla, fruite rasberry jam evporate milk{" "}
                                            <span>$5.99</span>
                                        </p>
                                    </div>
                                    <div className="discover_item">
                                        <h4>Blueberry Muffin</h4>
                                        <p>
                                            Chocolate puding, vanilla, fruite rasberry jam evporate milk{" "}
                                            <span>$12.99</span>
                                        </p>
                                    </div>
                                    <div className="discover_item">
                                        <h4>Classic Chocolate Cake</h4>
                                        <p>
                                            Chocolate puding, vanilla, fruite rasberry jam evporate milk{" "}
                                            <span>$20.00</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row our_bakery_image">
                            <div className="col-md-4 col-6">
                                <img
                                    className="img-fluid"
                                    src="img/our-bakery/bakery-1.jpg"
                                    alt=""
                                />
                            </div>
                            <div className="col-md-4 col-6">
                                <img
                                    className="img-fluid"
                                    src="img/our-bakery/bakery-2.jpg"
                                    alt=""
                                />
                            </div>
                            <div className="col-md-4 col-6">
                                <img
                                    className="img-fluid"
                                    src="img/our-bakery/bakery-3.jpg"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default Menu