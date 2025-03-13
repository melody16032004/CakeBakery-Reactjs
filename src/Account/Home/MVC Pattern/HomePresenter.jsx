
import React from 'react';
import ImageSlider from '../../../Music/imageSlide';
import NavBar from '../../../components/navbar';
import Footer from '../../../components/footer';
import { Typography, CircularProgress } from '@mui/material';
import ProductCard from './Factory Pattern/ProductCardFactory';
import LoadingOverlay from './Factory Pattern/LoadingOverlay';


const HomePresenter = ({ products, loading }) => {
    return (
        <>
            <LoadingOverlay loading={loading} />

            <div>

                <NavBar />
                <ImageSlider />

                <section className="welcome_bakery_area cake_feature_main p_100">
                    <div className="container">
                        <div className="main_title">
                            <h2>Sản phẩm bán nhiều nhất</h2>
                        </div>
                        <div className="cake_feature_row row">
                            {/* Factory Pattern */}
                            {products.slice(0, 8).map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}

                        </div>

                    </div>
                </section>

                <section className="service_we_offer_area p_100">
                    <div className="container">
                        <div className="single_w_title">
                            <h2>Các dịch vụ của chúng tôi</h2>
                        </div>
                        <div className="row we_offer_inner">
                            <div className="col-lg-4">
                                <div className="s_we_item">
                                    <div className="media">
                                        <div className="d-flex">
                                            <i className="flaticon-food-6" />
                                        </div>
                                        <div className="media-body">
                                            <a>
                                                <h4>Cookies Cakes</h4>
                                            </a>
                                            <p className='no-underline' style={{ textDecoration: 'none' }}>
                                                Thưởng thức bộ sưu tập bánh quy và bánh ngọt tuyệt vời của chúng tôi,
                                                được làm thủ công để mang lại sự ngọt ngào cho từng khoảnh khắc.
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
                                            <i className="flaticon-food-5" />
                                        </div>
                                        <div className="media-body">
                                            <a>
                                                <h4>Tasty Cupcakes</h4>
                                            </a>
                                            <p className='no-underline' style={{ textDecoration: 'none' }}>
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
                                            <a>
                                                <h4>Wedding Cakes</h4>
                                            </a>
                                            <p className='no-underline' style={{ textDecoration: 'none' }}>
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
                                            <a>
                                                <h4>Awesome Recipes</h4>
                                            </a>
                                            <p className='no-underline' style={{ textDecoration: 'none' }}>
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
                                            <a>
                                                <h4>Menu Planner</h4>
                                            </a>
                                            <p className='no-underline' style={{ textDecoration: 'none' }}>
                                                Công cụ giúp tổ chức và quản lý thực đơn hàng ngày, theo dõi nguyên liệu, và chia sẻ công
                                                thức nấu ăn, giúp tiết kiệm thời gian và nâng cao trải nghiệm nấu nướng.
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
                                            <i className="flaticon-transport" />
                                        </div>
                                        <div className="media-body">
                                            <a>
                                                <h4>Home Delivery</h4>
                                            </a>
                                            <p className='no-underline' style={{ textDecoration: 'none' }}>
                                                Dịch vụ cho phép người dùng đặt hàng và nhận sản phẩm ngay tại nhà, mang lại sự tiện
                                                lợi và tiết kiệm thời gian cho việc mua sắm thực phẩm, đồ uống, và hàng hóa khác.
                                                <br />
                                                <br />
                                            </p>
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
                                        <Typography sx={{
                                            textAlign: 'justify',
                                            '&:hover': {
                                                textDecoration: 'none',
                                            }
                                        }}>
                                            Đội ngũ đầu bếp tài năng của chúng tôi mang đến sự sáng tạo và niềm
                                            đam mê trong từng món ăn. Với nhiều năm kinh nghiệm và tình yêu dành
                                            cho nghệ thuật ẩm thực, họ chế biến hương vị độc đáo và trình bày mỗi
                                            món ăn với sự chăm chút đặc biệt. Từ những món truyền thống đến những
                                            món sáng tạo, các đầu bếp của chúng tôi cam kết mang lại trải nghiệm
                                            ẩm thực khó quên trong từng miếng ăn.
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                            {/* <div style={{ display: "flex", width: "900px" }}> */}
                            <div className="col-lg-3 col-6">
                                <div className="chef_item">
                                    <div className="chef_img">
                                        <img className="img-fluid" src="img/chef/chef-1.jpg" alt="" />
                                        <ul className="list_style">
                                            <li>
                                                <a href="https://www.facebook.com/hoangchung.1603">
                                                    <i className="fa fa-facebook-square" />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <a href="#">
                                        <h4>Doãn Trung Hoàng</h4>
                                    </a>
                                    <h5>Chuyên gia về làm bánh</h5>
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
                                    <h5>Chuyên gia về làm bánh</h5>
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
                                    <h5>Chuyên gia về làm bánh</h5>
                                </div>
                            </div>
                            {/* <div className="col-lg-3 col-6">
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
                                        <h5>Chuyên gia về làm bánh</h5>
                                    </div>
                                </div> */}
                            {/* </div> */}
                        </div>
                    </div>
                </section>

                <section className="latest_news_area gray_bg p_100">
                    <div className="container">
                        <div className="main_title">
                            <h2>Bài viết gần đây</h2>
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
        </>
    );
};

export default HomePresenter;
