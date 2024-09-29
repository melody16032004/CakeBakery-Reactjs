import React from "react";

function Footer() {
    return (
        <footer className="footer_area">
            <div className="footer_widgets">
                <div className="container">
                    <div className="row footer_wd_inner">
                        <div className="col-lg-3 col-6">
                            <aside className="f_widget f_about_widget">
                                <img src="img/footer-logo.png" alt="" />
                                <p>
                                    At vero eos et accusamus et iusto odio dignissimos ducimus qui
                                    bland itiis praesentium voluptatum deleniti atque corrupti.
                                </p>
                                <ul className="nav">
                                    <li>
                                        <a href="#">
                                            <i className="fa fa-facebook" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fa fa-linkedin" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fa fa-twitter" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fa fa-google-plus" />
                                        </a>
                                    </li>
                                </ul>
                            </aside>
                        </div>
                        <div className="col-lg-3 col-6">
                            <aside className="f_widget f_link_widget">
                                <div className="f_title">
                                    <h3>Quick links</h3>
                                </div>
                                <ul className="list_style">
                                    <li>
                                        <a href="#">Your Account</a>
                                    </li>
                                    <li>
                                        <a href="#">View Order</a>
                                    </li>
                                    <li>
                                        <a href="#">Privacy Policy</a>
                                    </li>
                                    <li>
                                        <a href="#">Terms &amp; Conditionis</a>
                                    </li>
                                </ul>
                            </aside>
                        </div>
                        <div className="col-lg-3 col-6">
                            <aside className="f_widget f_link_widget">
                                <div className="f_title">
                                    <h3>Work Times</h3>
                                </div>
                                <ul className="list_style">
                                    <li>
                                        <a href="#">Mon. : Fri.: 8 am - 8 pm</a>
                                    </li>
                                    <li>
                                        <a href="#">Sat. : 9am - 4pm</a>
                                    </li>
                                    <li>
                                        <a href="#">Sun. : Closed</a>
                                    </li>
                                </ul>
                            </aside>
                        </div>
                        <div className="col-lg-3 col-6">
                            <aside className="f_widget f_contact_widget">
                                <div className="f_title">
                                    <h3>Contact Info</h3>
                                </div>
                                <h4>(1800) 574 9687</h4>
                                <p>
                                    Justshiop Store <br />
                                    256, baker Street,, New Youk, 5245
                                </p>
                                <h5>cakebakery@contact.co.in</h5>
                            </aside>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer_copyright">
                <div className="container">
                    <div className="copyright_inner">
                        <div className="float-left">
                            <h5>
                                <a target="_blank" href="https://www.templatespoint.net">
                                    Templates Point
                                </a>
                            </h5>
                        </div>
                        <div className="float-right">
                            <a href="#">Purchase Now</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer