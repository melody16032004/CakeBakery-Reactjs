import React from "react";
import NavBar from "../components/navbar";
import Footer from "../components/footer";

const About = () => {
    return (
        <div>
            <NavBar />
            <section className="banner_area">
                <div className="container">
                    <div className="banner_text">
                        <h3>About Us</h3>
                        <ul>
                            <li>
                                <a href="#">Home</a>
                            </li>
                            <li>
                                <a href="#">About Us</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="our_bakery_area p_100">
                <div className="container">
                    <div className="our_bakery_text">
                        <h2>Our Bakery Approach </h2>
                        <h6>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
                            ab illo inventore veritatis et quasi architecto beatae vitae dicta
                            sunt explicabo.
                        </h6>
                        <p>
                            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
                            fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
                            sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
                            sit amet, consectetur, adipisci velit, sed quia non numquam eius modi
                            tempora incidunt ut labore et dolore magnam aliquam quaerat
                            voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem.
                        </p>
                    </div>
                    <div className="row our_bakery_image">
                        <div className="col-md-4 col-6">
                            <img className="img-fluid" src="img/our-bakery/bakery-1.jpg" alt="" />
                        </div>
                        <div className="col-md-4 col-6">
                            <img className="img-fluid" src="img/our-bakery/bakery-2.jpg" alt="" />
                        </div>
                        <div className="col-md-4 col-6">
                            <img className="img-fluid" src="img/our-bakery/bakery-3.jpg" alt="" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="bakery_video_area">
                <div className="container">
                    <div className="video_inner">
                        <h3>Real Taste</h3>
                        <p>
                            A light, sour wheat dough with roasted walnuts and freshly picked
                            rosemary, thyme, poppy seeds, parsley and sage
                        </p>
                        <div className="media">
                            <div className="d-flex">
                                <a
                                    className="popup-youtube"
                                    href="http://www.youtube.com/watch?v=0O2aH4XLbto"
                                >
                                    <i className="flaticon-play-button" />
                                </a>
                            </div>
                            <div className="media-body">
                                <h5>
                                    Watch intro video <br />
                                    about us
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="our_mission_area p_100">
                <div className="container">
                    <div className="row our_mission_inner">
                        <div className="col-lg-3">
                            <div className="single_m_title">
                                <h2>Our Mission</h2>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className="mission_inner_text">
                                <h6>
                                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                                    accusantium doloremque laudan-tium, totam rem aperiam, eaque ipsa
                                    quae ab illo inventore veritatis et quasi architecto beatae vitae
                                    dicta sunt explicabo.
                                </h6>
                                <p>
                                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                                    aut fugit, sed quia consequuntur magni dolores eos qui ratione
                                    voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
                                    ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia
                                    non numquam eius modi tempora incidunt ut labore et dolore magnam
                                    aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
                                    exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid
                                    ex ea commodi consequatur? Quis autem vel eum iure reprehenderit
                                    qui in ea voluptate velit esse quam nihil molestiae consequatur,
                                    vel illum qui dolorem eum fugiat quo voluptas nulla pariatu
                                </p>
                                <ul className="nav">
                                    <li>
                                        <a href="#">Custom cakes</a>
                                    </li>
                                    <li>
                                        <a href="#">Birthday cakes</a>
                                    </li>
                                    <li>
                                        <a href="#">Wedding cakes</a>
                                    </li>
                                    <li>
                                        <a href="#">European delicacies</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="client_says_area p_100">
                <div className="container">
                    <div className="client_says_inner">
                        <div className="c_says_title">
                            <h2>What Our Client Says</h2>
                        </div>
                        <div className="client_says_slider owl-carousel">
                            <div className="item">
                                <div className="media">
                                    <div className="d-flex">
                                        <img src="img/client/client-1.png" alt="" />
                                        <h3>“</h3>
                                    </div>
                                    <div className="media-body">
                                        <p>
                                            Osed quia consequuntur magni dolores eos qui ratione
                                            voluptatem sequi nesciunt. Neque porro quisquam est, qui
                                            dolorem ipsum quia dolor sit amet, consectetur, adipisci sed
                                            quia non numquam qui ratione voluptatem sequi nesciunt. Neque
                                            porro quisquam est.
                                        </p>
                                        <h5>- Robert joe</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="media">
                                    <div className="d-flex">
                                        <img src="img/client/client-1.png" alt="" />
                                    </div>
                                    <div className="media-body">
                                        <p>
                                            Osed quia consequuntur magni dolores eos qui ratione
                                            voluptatem sequi nesciunt. Neque porro quisquam est, qui
                                            dolorem ipsum quia dolor sit amet, consectetur, adipisci sed
                                            quia non numquam qui ratione voluptatem sequi nesciunt. Neque
                                            porro quisquam est.
                                        </p>
                                        <h5>- Robert joe</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="media">
                                    <div className="d-flex">
                                        <img src="img/client/client-1.png" alt="" />
                                    </div>
                                    <div className="media-body">
                                        <p>
                                            Osed quia consequuntur magni dolores eos qui ratione
                                            voluptatem sequi nesciunt. Neque porro quisquam est, qui
                                            dolorem ipsum quia dolor sit amet, consectetur, adipisci sed
                                            quia non numquam qui ratione voluptatem sequi nesciunt. Neque
                                            porro quisquam est.
                                        </p>
                                        <h5>- Robert joe</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="our_chef_area p_100">
                <div className="container">
                    <div className="row our_chef_inner">
                        <div className="col-lg-3">
                            <div className="chef_text_item">
                                <div className="main_title">
                                    <h2>Our Chefs</h2>
                                    <p>
                                        Lorem ipsum dolor sit amet, cons ectetur elit. Vestibulum nec
                                        odios Suspe ndisse cursus mal suada faci lisis. Lorem ipsum
                                        dolor sit ametion.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">
                            <div className="chef_item">
                                <div className="chef_img">
                                    <img className="img-fluid" src="img/chef/chef-1.jpg" alt="" />
                                </div>
                                <a href="#">
                                    <h4>Michale Joe</h4>
                                </a>
                                <h5>Expert in Cake Making</h5>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">
                            <div className="chef_item">
                                <div className="chef_img">
                                    <img className="img-fluid" src="img/chef/chef-2.jpg" alt="" />
                                </div>
                                <a href="#">
                                    <h4>Michale Joe</h4>
                                </a>
                                <h5>Expert in Cake Making</h5>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">
                            <div className="chef_item">
                                <div className="chef_img">
                                    <img className="img-fluid" src="img/chef/chef-3.jpg" alt="" />
                                </div>
                                <a href="#">
                                    <h4>Michale Joe</h4>
                                </a>
                                <h5>Expert in Cake Making</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default About