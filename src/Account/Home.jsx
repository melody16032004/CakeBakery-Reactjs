import React, { useState, useEffect } from 'react';
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import "../index.css";
import ImageSlider from '../Music/imageSlide';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

function Home() {

    return (
        <div>
            <NavBar />

            <ImageSlider />
            {/* <section className="main_slider_area">
                <div id="main_slider" className="rev_slider" data-version="5.3.1.6">
                    <ul>
                        <li
                            data-index="rs-1587"
                            data-transition="fade"
                            data-slotamount="default"
                            data-hideafterloop={0}
                            data-hideslideonmobile="off"
                            data-easein="default"
                            data-easeout="default"
                            data-masterspeed={300}
                            data-thumb="img/home-slider/slider-3.jpg"
                            data-rotate={0}
                            data-saveperformance="off"
                            data-title="Creative"
                            data-param1={1}
                            data-param2=""
                            data-param3=""
                            data-param4=""
                            data-param5=""
                            data-param6=""
                            data-param7=""
                            data-param8=""
                            data-param9=""
                            data-param10=""
                            data-description=""
                        >
                            <img
                                src="img/home-slider/slider-3.jpg"
                                alt=""
                                data-bgposition="center center"
                                data-bgfit="cover"
                                data-bgrepeat="no-repeat"
                                data-bgparallax={5}
                                className="rev-slidebg"
                                data-no-retina=""
                            />
                            <div className="slider_text_box">
                                <div
                                    className="tp-caption tp-resizeme first_text"
                                    data-x="['left','left','left','15','15']"
                                    data-hoffset="['0','0','0','0']"
                                    data-y="['top','top','top','top']"
                                    data-voffset="['175','175','125','165','160']"
                                    data-fontsize="['65','65','65','40','30']"
                                    data-lineheight="['80','80','80','50','40']"
                                    data-width="['800','800','800','500']"
                                    data-height="none"
                                    data-whitespace="normal"
                                    data-type="text"
                                    data-responsive_offset="on"
                                    data-frames='[{"delay":10,"speed":1500,"frame":"0","from":"y:[-100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;","mask":"x:0px;y:0px;s:inherit;e:inherit;","to":"o:1;","ease":"Power2.easeInOut"},{"delay":"wait","speed":1500,"frame":"999","to":"y:[175%];","mask":"x:inherit;y:inherit;s:inherit;e:inherit;","ease":"Power2.easeInOut"}]'
                                    data-textalign="['left','left','left','left']"
                                >
                                    Quality Products ... <br /> with sweet, eggs &amp; breads
                                </div>
                                <div
                                    className="tp-caption tp-resizeme secand_text"
                                    data-x="['left','left','left','15','15']"
                                    data-hoffset="['0','0','0','0']"
                                    data-y="['top','top','top','top']"
                                    data-voffset="['345','345','300','300','250']"
                                    data-fontsize="['20','20','20','20','16']"
                                    data-lineheight="['28','28','28','28']"
                                    data-width="['640','640','640','640','350']"
                                    data-height="none"
                                    data-whitespace="normal"
                                    data-type="text"
                                    data-responsive_offset="on"
                                    data-transform_idle="o:1;"
                                    data-frames='[{"delay":10,"speed":1500,"frame":"0","from":"y:[100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;opacity:0;","mask":"x:0px;y:[100%];s:inherit;e:inherit;","to":"o:1;","ease":"Power2.easeInOut"},{"delay":"wait","speed":1500,"frame":"999","to":"y:[175%];","mask":"x:inherit;y:inherit;s:inherit;e:inherit;","ease":"Power2.easeInOut"}]'
                                >
                                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                                    aut fugit quia consequuntur magni dolores eos qui ratione
                                </div>
                                <div
                                    className="tp-caption tp-resizeme slider_button"
                                    data-x="['left','left','left','15','15']"
                                    data-hoffset="['0','0','0','0']"
                                    data-y="['top','top','top','top']"
                                    data-voffset="['435','435','390','390','360']"
                                    data-fontsize="['14','14','14','14']"
                                    data-lineheight="['46','46','46','46']"
                                    data-width="none"
                                    data-height="none"
                                    data-whitespace="nowrap"
                                    data-type="text"
                                    data-responsive_offset="on"
                                    data-frames='[{"delay":10,"speed":1500,"frame":"0","from":"y:[100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;opacity:0;","mask":"x:0px;y:[100%];s:inherit;e:inherit;","to":"o:1;","ease":"Power2.easeInOut"},{"delay":"wait","speed":1500,"frame":"999","to":"y:[175%];","mask":"x:inherit;y:inherit;s:inherit;e:inherit;","ease":"Power2.easeInOut"}]'
                                >
                                    <a className="main_btn" href="#">
                                        See the recipe
                                    </a>
                                </div>
                            </div>
                        </li>
                        <li
                            data-index="rs-1588"
                            data-transition="fade"
                            data-slotamount="default"
                            data-hideafterloop={0}
                            data-hideslideonmobile="off"
                            data-easein="default"
                            data-easeout="default"
                            data-masterspeed={300}
                            data-thumb="img/home-slider/slider-4.jpg"
                            data-rotate={0}
                            data-saveperformance="off"
                            data-title="Creative"
                            data-param1={1}
                            data-param2=""
                            data-param3=""
                            data-param4=""
                            data-param5=""
                            data-param6=""
                            data-param7=""
                            data-param8=""
                            data-param9=""
                            data-param10=""
                            data-description=""
                        >
                            <img
                                src="img/home-slider/slider-4.jpg"
                                alt=""
                                data-bgposition="center center"
                                data-bgfit="cover"
                                data-bgrepeat="no-repeat"
                                data-bgparallax={5}
                                className="rev-slidebg"
                                data-no-retina=""
                            />
                            <div className="slider_text_box">
                                <div
                                    className="tp-caption tp-resizeme first_text"
                                    data-x="['left','left','left','15','15']"
                                    data-hoffset="['0','0','0','0']"
                                    data-y="['top','top','top','top']"
                                    data-voffset="['175','175','125','165','160']"
                                    data-fontsize="['65','65','65','40','30']"
                                    data-lineheight="['80','80','80','50','40']"
                                    data-width="['800','800','800','500']"
                                    data-height="none"
                                    data-whitespace="normal"
                                    data-type="text"
                                    data-responsive_offset="on"
                                    data-frames='[{"delay":10,"speed":1500,"frame":"0","from":"y:[-100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;","mask":"x:0px;y:0px;s:inherit;e:inherit;","to":"o:1;","ease":"Power2.easeInOut"},{"delay":"wait","speed":1500,"frame":"999","to":"y:[175%];","mask":"x:inherit;y:inherit;s:inherit;e:inherit;","ease":"Power2.easeInOut"}]'
                                    data-textalign="['left','left','left','left']"
                                >
                                    Cake Bakery ... <br /> make delicious products
                                </div>
                                <div
                                    className="tp-caption tp-resizeme secand_text"
                                    data-x="['left','left','left','15','15']"
                                    data-hoffset="['0','0','0','0']"
                                    data-y="['top','top','top','top']"
                                    data-voffset="['345','345','300','300','250']"
                                    data-fontsize="['20','20','20','20','16']"
                                    data-lineheight="['28','28','28','28']"
                                    data-width="['640','640','640','640','350']"
                                    data-height="none"
                                    data-whitespace="normal"
                                    data-type="text"
                                    data-responsive_offset="on"
                                    data-transform_idle="o:1;"
                                    data-frames='[{"delay":10,"speed":1500,"frame":"0","from":"y:[100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;opacity:0;","mask":"x:0px;y:[100%];s:inherit;e:inherit;","to":"o:1;","ease":"Power2.easeInOut"},{"delay":"wait","speed":1500,"frame":"999","to":"y:[175%];","mask":"x:inherit;y:inherit;s:inherit;e:inherit;","ease":"Power2.easeInOut"}]'
                                >
                                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                                    aut fugit quia consequuntur magni dolores eos qui ratione
                                </div>
                                <div
                                    className="tp-caption tp-resizeme slider_button"
                                    data-x="['left','left','left','15','15']"
                                    data-hoffset="['0','0','0','0']"
                                    data-y="['top','top','top','top']"
                                    data-voffset="['435','435','390','390','360']"
                                    data-fontsize="['14','14','14','14']"
                                    data-lineheight="['46','46','46','46']"
                                    data-width="none"
                                    data-height="none"
                                    data-whitespace="nowrap"
                                    data-type="text"
                                    data-responsive_offset="on"
                                    data-frames='[{"delay":10,"speed":1500,"frame":"0","from":"y:[100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;opacity:0;","mask":"x:0px;y:[100%];s:inherit;e:inherit;","to":"o:1;","ease":"Power2.easeInOut"},{"delay":"wait","speed":1500,"frame":"999","to":"y:[175%];","mask":"x:inherit;y:inherit;s:inherit;e:inherit;","ease":"Power2.easeInOut"}]'
                                >
                                    <a className="main_btn" href="#">
                                        See the recipe
                                    </a>
                                </div>
                            </div>
                        </li>
                        <li
                            data-index="rs-1589"
                            data-transition="fade"
                            data-slotamount="default"
                            data-hideafterloop={0}
                            data-hideslideonmobile="off"
                            data-easein="default"
                            data-easeout="default"
                            data-masterspeed={300}
                            data-thumb="img/home-slider/slider-5.jpg"
                            data-rotate={0}
                            data-saveperformance="off"
                            data-title="Creative"
                            data-param1={1}
                            data-param2=""
                            data-param3=""
                            data-param4=""
                            data-param5=""
                            data-param6=""
                            data-param7=""
                            data-param8=""
                            data-param9=""
                            data-param10=""
                            data-description=""
                        >
                            <img
                                src="img/home-slider/slider-5.jpg"
                                alt=""
                                data-bgposition="center center"
                                data-bgfit="cover"
                                data-bgrepeat="no-repeat"
                                data-bgparallax={5}
                                className="rev-slidebg"
                                data-no-retina=""
                            />
                            <div className="slider_text_box">
                                <div
                                    className="tp-caption tp-resizeme first_text"
                                    data-x="['left','left','left','15','15']"
                                    data-hoffset="['0','0','0','0']"
                                    data-y="['top','top','top','top']"
                                    data-voffset="['175','175','125','165','160']"
                                    data-fontsize="['65','65','65','40','30']"
                                    data-lineheight="['80','80','80','50','40']"
                                    data-width="['800','800','800','500']"
                                    data-height="none"
                                    data-whitespace="normal"
                                    data-type="text"
                                    data-responsive_offset="on"
                                    data-frames='[{"delay":10,"speed":1500,"frame":"0","from":"y:[-100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;","mask":"x:0px;y:0px;s:inherit;e:inherit;","to":"o:1;","ease":"Power2.easeInOut"},{"delay":"wait","speed":1500,"frame":"999","to":"y:[175%];","mask":"x:inherit;y:inherit;s:inherit;e:inherit;","ease":"Power2.easeInOut"}]'
                                    data-textalign="['left','left','left','left']"
                                >
                                    Cake theme ... <br /> made with care and love
                                </div>
                                <div
                                    className="tp-caption tp-resizeme secand_text"
                                    data-x="['left','left','left','15','15']"
                                    data-hoffset="['0','0','0','0']"
                                    data-y="['top','top','top','top']"
                                    data-voffset="['345','345','300','300','250']"
                                    data-fontsize="['20','20','20','20','16']"
                                    data-lineheight="['28','28','28','28']"
                                    data-width="['640','640','640','640','350']"
                                    data-height="none"
                                    data-whitespace="normal"
                                    data-type="text"
                                    data-responsive_offset="on"
                                    data-transform_idle="o:1;"
                                    data-frames='[{"delay":10,"speed":1500,"frame":"0","from":"y:[100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;opacity:0;","mask":"x:0px;y:[100%];s:inherit;e:inherit;","to":"o:1;","ease":"Power2.easeInOut"},{"delay":"wait","speed":1500,"frame":"999","to":"y:[175%];","mask":"x:inherit;y:inherit;s:inherit;e:inherit;","ease":"Power2.easeInOut"}]'
                                >
                                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                                    aut fugit quia consequuntur magni dolores eos qui ratione
                                </div>
                                <div
                                    className="tp-caption tp-resizeme slider_button"
                                    data-x="['left','left','left','15','15']"
                                    data-hoffset="['0','0','0','0']"
                                    data-y="['top','top','top','top']"
                                    data-voffset="['435','435','390','390','360']"
                                    data-fontsize="['14','14','14','14']"
                                    data-lineheight="['46','46','46','46']"
                                    data-width="none"
                                    data-height="none"
                                    data-whitespace="nowrap"
                                    data-type="text"
                                    data-responsive_offset="on"
                                    data-frames='[{"delay":10,"speed":1500,"frame":"0","from":"y:[100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;opacity:0;","mask":"x:0px;y:[100%];s:inherit;e:inherit;","to":"o:1;","ease":"Power2.easeInOut"},{"delay":"wait","speed":1500,"frame":"999","to":"y:[175%];","mask":"x:inherit;y:inherit;s:inherit;e:inherit;","ease":"Power2.easeInOut"}]'
                                >
                                    <a className="main_btn" href="#">
                                        See the recipe
                                    </a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </section> */}

            <section className="welcome_bakery_area cake_feature_main p_100">
                <div className="container">
                    <div className="main_title">
                        <h2>Our Featured Cakes</h2>
                        <h5> Seldolor sit amet consect etur</h5>
                    </div>
                    <div className="cake_feature_row row">
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

            <section className="service_we_offer_area p_100">
                <div className="container">
                    <div className="single_w_title">
                        <h2>Services We offer</h2>
                    </div>
                    <div className="row we_offer_inner">
                        <div className="col-lg-4">
                            <div className="s_we_item">
                                <div className="media">
                                    <div className="d-flex">
                                        <i className="flaticon-food-6" />
                                    </div>
                                    <div className="media-body">
                                        <a href="#">
                                            <h4>Cookies Cakes</h4>
                                        </a>
                                        <p>
                                            Thưởng thức bộ sưu tập bánh quy và bánh ngọt tuyệt vời của chúng tôi,
                                            được làm thủ công để mang lại sự ngọt ngào cho từng khoảnh khắc.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="s_we_item">
                                <div className="media">
                                    <div className="d-flex">
                                        <i className="flaticon-food-5" />
                                    </div>
                                    <div className="media-body">
                                        <a href="#">
                                            <h4>Tasty Cupcakes</h4>
                                        </a>
                                        <p>
                                            Thưởng thức những chiếc bánh cupcake thơm ngon, mềm mịn,
                                            hoàn hảo cho mọi dịp đặc biệt và ngọt ngào cho từng miếng cắn.
                                            <br />
                                            <br />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="s_we_item">
                                <div className="media">
                                    <div className="d-flex">
                                        <i className="flaticon-food-3" />
                                    </div>
                                    <div className="media-body">
                                        <a href="#">
                                            <h4>Wedding Cakes</h4>
                                        </a>
                                        <p>
                                            Những chiếc bánh cưới tinh tế, được thiết kế hoàn hảo cho ngày trọng đại của bạn,
                                            mang đến vẻ đẹp sang trọng và hương vị ngọt ngào trong từng lớp bánh.
                                            <br />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="s_we_item">
                                <div className="media">
                                    <div className="d-flex">
                                        <i className="flaticon-book" />
                                    </div>
                                    <div className="media-body">
                                        <a href="#">
                                            <h4>Awesome Recipes</h4>
                                        </a>
                                        <p>
                                            Khám phá những công thức đơn giản để tạo ra món ăn ngon và hấp dẫn trong tầm tay bạn.
                                            <br />
                                            <br />
                                            <br />
                                            <br />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="s_we_item">
                                <div className="media">
                                    <div className="d-flex">
                                        <i className="flaticon-food-4" />
                                    </div>
                                    <div className="media-body">
                                        <a href="#">
                                            <h4>Menu Planner</h4>
                                        </a>
                                        <p>
                                            Công cụ giúp tổ chức và quản lý thực đơn hàng ngày, theo dõi nguyên liệu, và chia sẻ công
                                            thức nấu ăn, giúp tiết kiệm thời gian và nâng cao trải nghiệm nấu nướng.
                                            <br />
                                            <br />
                                        </p>
                                        {/* <Typography variant='body2' color='textDisabled' >
                                            Công cụ giúp tổ chức và quản lý thực đơn hàng ngày, theo dõi nguyên liệu, và chia sẻ công
                                            thức nấu ăn, giúp tiết kiệm thời gian và nâng cao trải nghiệm nấu nướng.
                                            <br />
                                            <br />
                                        </Typography> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="s_we_item">
                                <div className="media">
                                    <div className="d-flex">
                                        <i className="flaticon-transport" />
                                    </div>
                                    <div className="media-body">
                                        <a href="#">
                                            <h4>Home Delivery</h4>
                                        </a>
                                        <p>
                                            Dịch vụ cho phép người dùng đặt hàng và nhận sản phẩm ngay tại nhà, mang lại sự tiện
                                            lợi và tiết kiệm thời gian cho việc mua sắm thực phẩm, đồ uống, và hàng hóa khác.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="discover_menu_area menu_d_two">
                <div className="discover_menu_inner">
                    <div className="container">
                        <div className="single_pest_title">
                            <h2>Services We offer</h2>
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
                                        <h4>Double Chocolate Pie</h4>
                                        <p>
                                            Chocolate puding, vanilla, fruite rasberry jam milk{" "}
                                            <span>$8.99</span>
                                        </p>
                                    </div>
                                    <div className="discover_item">
                                        <h4>Double Chocolate Pie</h4>
                                        <p>
                                            Chocolate puding, vanilla, fruite rasberry jam milk{" "}
                                            <span>$8.99</span>
                                        </p>
                                    </div>
                                    <div className="discover_item">
                                        <h4>Double Chocolate Pie</h4>
                                        <p>
                                            Chocolate puding, vanilla, fruite rasberry jam milk{" "}
                                            <span>$8.99</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
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
                                        <h4>Double Chocolate Pie</h4>
                                        <p>
                                            Chocolate puding, vanilla, fruite rasberry jam milk{" "}
                                            <span>$8.99</span>
                                        </p>
                                    </div>
                                    <div className="discover_item">
                                        <h4>Double Chocolate Pie</h4>
                                        <p>
                                            Chocolate puding, vanilla, fruite rasberry jam milk{" "}
                                            <span>$8.99</span>
                                        </p>
                                    </div>
                                    <div className="discover_item">
                                        <h4>Double Chocolate Pie</h4>
                                        <p>
                                            Chocolate puding, vanilla, fruite rasberry jam milk{" "}
                                            <span>$8.99</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <a className="pest_btn" href="#">
                                    <Link to='/shop' style={{ textDecoration: 'none', color: 'white' }}>View Full Menu</Link>
                                </a>
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
                                    <ul className="list_style">
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-twitter" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-linkedin-square" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-facebook-square" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-skype" />
                                            </a>
                                        </li>
                                    </ul>
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
                                    <ul className="list_style">
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-twitter" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-linkedin-square" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-facebook-square" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-skype" />
                                            </a>
                                        </li>
                                    </ul>
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
                                    <ul className="list_style">
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-twitter" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-linkedin-square" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-facebook-square" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-skype" />
                                            </a>
                                        </li>
                                    </ul>
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

            {/* <section className="new_arivals_area p_100">
                <div className="container">
                    <div className="single_pest_title">
                        <h2>New Arrivals</h2>
                    </div>
                    <div className="row arivals_inner">
                        <div className="col-lg-6 col-sm-7">
                            <div className="arivals_chocolate">
                                <div className="arivals_pic">
                                    <img
                                        className="img-fluid"
                                        src="img/cake-feature/arivals-pic.jpg"
                                        alt=""
                                    />
                                    <div className="price_text">
                                        <h5>$39</h5>
                                    </div>
                                </div>
                                <div className="arivals_text">
                                    <h4>
                                        Chocolate <span>Crumble</span>
                                    </h4>
                                    <a href="#">Mine cup</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="arivals_slider owl-carousel">
                                <div className="item">
                                    <div className="cake_feature_item">
                                        <div className="cake_img">
                                            <img src="img/cake-feature/arivals-1.jpg" alt="" />
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
                                <div className="item">
                                    <div className="cake_feature_item">
                                        <div className="cake_img">
                                            <img src="img/cake-feature/arivals-2.jpg" alt="" />
                                        </div>
                                        <div className="cake_text">
                                            <h4>$29</h4>
                                            <h3>Chocolate Cupcakes</h3>
                                            <a className="pest_btn" href="#">
                                                Add to cart
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="cake_feature_item">
                                        <div className="cake_img">
                                            <img src="img/cake-feature/arivals-1.jpg" alt="" />
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
                                <div className="item">
                                    <div className="cake_feature_item">
                                        <div className="cake_img">
                                            <img src="img/cake-feature/arivals-2.jpg" alt="" />
                                        </div>
                                        <div className="cake_text">
                                            <h4>$29</h4>
                                            <h3>Chocolate Cupcakes</h3>
                                            <a className="pest_btn" href="#">
                                                Add to cart
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}

            <section className="latest_news_area gray_bg p_100">
                <div className="container">
                    <div className="main_title">
                        <h2>Latest Blog</h2>
                        <h5>an turn into your instructor your helper, your </h5>
                    </div>
                    <div className="row latest_news_inner">
                        <div className="col-lg-4 col-md-6">
                            <div className="l_news_image">
                                <div className="l_news_img">
                                    <img
                                        className="img-fluid"
                                        src="img/blog/latest-news/l-news-1.jpg"
                                        alt=""
                                    />
                                </div>
                                <div className="l_news_hover">
                                    <a href="#">
                                        <h5>Oct 15, 2016</h5>
                                    </a>
                                    <a href="#">
                                        <h4>Nanotechnology immersion along the information</h4>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="l_news_item">
                                <div className="l_news_img">
                                    <img
                                        className="img-fluid"
                                        src="img/blog/latest-news/l-news-2.jpg"
                                        alt=""
                                    />
                                </div>
                                <div className="l_news_text">
                                    <a href="#">
                                        <h5>Oct 15, 2016</h5>
                                    </a>
                                    <a href="#">
                                        <h4>Nanotechnology immersion along the information</h4>
                                    </a>
                                    <p>
                                        Lorem ipsum dolor sit amet, cons ectetur elit. Vestibulum nec
                                        odios Suspe ndisse cursus mal suada faci lisis. Lorem ipsum
                                        dolor sit ametion ....
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="l_news_item">
                                <div className="l_news_img">
                                    <img
                                        className="img-fluid"
                                        src="img/blog/latest-news/l-news-3.jpg"
                                        alt=""
                                    />
                                </div>
                                <div className="l_news_text">
                                    <a href="#">
                                        <h5>Oct 15, 2016</h5>
                                    </a>
                                    <a href="#">
                                        <h4>Nanotechnology immersion along the information</h4>
                                    </a>
                                    <p>
                                        Lorem ipsum dolor sit amet, cons ectetur elit. Vestibulum nec
                                        odios Suspe ndisse cursus mal suada faci lisis. Lorem ipsum
                                        dolor sit ametion ....
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ---------------------------------------------------------------------------------------- */}



            <Footer />

        </div>
    );
}

export default Home