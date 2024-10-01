import React from "react";
import NavBar from "../components/navbar";
import Footer from "../components/footer";

const Contact = () => {
    return (
        <div>
            <NavBar />
            <section className="banner_area">
                <div className="container">
                    <div className="banner_text">
                        <h3>Contact Us</h3>
                        <ul>
                            <li>
                                <a href="index.html">Home</a>
                            </li>
                            <li>
                                <a href="single-blog.html">Contact Us</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="contact_form_area p_100">
                <div className="container">
                    <div className="main_title">
                        <h2>Get In Touch</h2>
                        <h5>
                            Do you have anything in your mind to let us know? Kindly don't delay
                            to connect to us by means of our contact form.
                        </h5>
                    </div>
                    <div className="row">
                        <div className="col-lg-7">
                            <form
                                className="row contact_us_form"
                                action="http://galaxyanalytics.net/demos/cake/theme/cake-html/contact_process.php"
                                method="post"
                                id="contactForm"
                                noValidate="novalidate"
                            >
                                <div className="form-group col-md-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        placeholder="Email address"
                                    />
                                </div>
                                <div className="form-group col-md-12">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="subject"
                                        name="subject"
                                        placeholder="Subject"
                                    />
                                </div>
                                <div className="form-group col-md-12">
                                    <textarea
                                        className="form-control"
                                        name="message"
                                        id="message"
                                        rows={1}
                                        placeholder="Wrtie message"
                                        defaultValue={""}
                                    />
                                </div>
                                <div className="form-group col-md-12">
                                    <button
                                        type="submit"
                                        value="submit"
                                        className="btn order_s_btn form-control"
                                    >
                                        submit now
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="col-lg-4 offset-md-1">
                            <div className="contact_details">
                                <div className="contact_d_item">
                                    <h3>Address :</h3>
                                    <p>
                                        54B, Tailstoi Town 5238 <br /> La city, IA 522364
                                    </p>
                                </div>
                                <div className="contact_d_item">
                                    <h5>
                                        Phone : <a href="tel:01372466790">01372.466.790</a>
                                    </h5>
                                    <h5>
                                        Email :{" "}
                                        <a href="mailto:rockybd1995@gmail.com">rockybd1995@gmail.com</a>
                                    </h5>
                                </div>
                                <div className="contact_d_item">
                                    <h3>Opening Hours :</h3>
                                    <p>8:00 AM - 10:00 PM</p>
                                    <p>Monday - Sunday</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="map_area">
                <div
                    id="mapBox"
                    className="mapBox row m0"
                    data-lat="40.701083"
                    data-lon="-74.1522848"
                    data-zoom={13}
                    data-marker="img/map-marker.png"
                    data-info="54B, Tailstoi Town 5238 La city, IA 522364"
                    data-mlat="40.701083"
                    data-mlon="-74.1522848"
                ></div>
            </section>
            <Footer />
        </div>
    );
}

export default Contact