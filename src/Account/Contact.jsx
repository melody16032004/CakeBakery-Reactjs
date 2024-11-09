import React, { useEffect, useRef, useState } from "react";
import NavBar from "../components/navbar";
import Footer from "../components/footer";


const Contact = () => {

    const contact_details = {
        border: '1px solid #e5e5e5',
        borderRadius: '8px',
        padding: '20px',
        background: '#f9f9f9',
    }
    const contact_form_area = {
        background: '#ffffff',
        borderRadius: '8px',
        padding: '40px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    }

    const mapRef = useRef(null);
    const mapInstance = useRef(null);
    const [position, setPosition] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Kiểm tra Geolocation có khả dụng không
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setPosition([position.coords.latitude, position.coords.longitude]);
                },
                () => {
                    setError("Không thể lấy vị trí của bạn.");
                }
            );
        } else {
            setError("Geolocation không được hỗ trợ trên trình duyệt này.");
        }
    }, []);

    useEffect(() => {
        if (position) {
            const platform = new window.H.service.Platform({
                apikey: "qpbQINuKDeZ89K9J6QvQVaapXuyNkeqDL7279K8FhDE",
            });

            const defaultLayers = platform.createDefaultLayers();
            const map = new window.H.Map(
                mapRef.current,
                defaultLayers.vector.normal.map,
                {
                    zoom: 13,
                    center: { lat: position[0], lng: position[1] },
                }
            );

            mapInstance.current = map; // Gán map vào ref

            // Thêm điều khiển zoom
            const ui = window.H.ui.UI.createDefault(map, defaultLayers);
            ui.getControl('zoom').setAlignment('bottom-right');

            const mapEvents = new window.H.mapevents.MapEvents(map);
            const behavior = new window.H.mapevents.Behavior(mapEvents);

            const icon = new window.H.map.Icon('img/map-marker.png');
            const marker = new window.H.map.Marker(
                { lat: position[0], lng: position[1] },
                { icon: icon }
            );
            map.addObject(marker);

            return () => {
                map.dispose();
            };
        }
    }, [position]);



    if (error) {
        return <p>{error}</p>; // Hiển thị thông báo lỗi nếu có
    }

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

            <section className="contact_form_area p_100" style={contact_form_area}>
                <div className="container">
                    <div className="main_title text-center">
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
                                        required
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        placeholder="Email address"
                                        required
                                    />
                                </div>
                                <div className="form-group col-md-12">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="subject"
                                        name="subject"
                                        placeholder="Subject"
                                        required
                                    />
                                </div>
                                <div className="form-group col-md-12">
                                    <textarea
                                        className="form-control"
                                        name="message"
                                        id="message"
                                        rows={4}
                                        placeholder="Write your message"
                                        required
                                    />
                                </div>
                                <div className="form-group col-md-12">
                                    <button
                                        type="submit"
                                        value="submit"
                                        className="btn btn-primary form-control"
                                    >
                                        Submit Now
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="col-lg-4 offset-md-1">
                            <div className="contact_details" style={contact_details}>
                                <div className="contact_d_item">
                                    <h3>Address:</h3>
                                    <p>
                                        481/9, khu phố 2, Phường Hiệp Thành, <br /> Quận 12, TP.HCM
                                    </p>
                                </div>
                                <div className="contact_d_item">
                                    <h5>
                                        Phone: <a href="tel:01372466790">035.898.3714</a>
                                    </h5>
                                    <h5>
                                        Email:{" "}
                                        <a href="mailto:rockybd1995@gmail.com">cakebakery@gmail.com</a>
                                    </h5>
                                </div>
                                <div className="contact_d_item">
                                    <h3>Opening Hours:</h3>
                                    <p>8:00 AM - 10:00 PM</p>
                                    <p>Monday - Sunday</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="map_area" style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', margin: '30px 0' }}>
                <div ref={mapRef} style={{ width: "80%", height: "600px" }}>
                    {!position && <p>Đang lấy vị trí của bạn...</p>}
                </div>

                {/* Nút với biểu tượng */}
                <button
                    style={{
                        position: 'absolute',
                        bottom: '-1000px',
                        right: '166px',
                        backgroundColor: 'white',
                        border: '1px solid #ccc',
                        borderRadius: '50%',
                        width: '50px',
                        height: '50px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                        zIndex: 1000 // Đảm bảo nút không bị che bởi bản đồ

                    }}
                    onClick={() => {
                        if (mapInstance.current && position) {
                            mapInstance.current.setCenter({ lat: position[0], lng: position[1] }); // Di chuyển tới vị trí hiện tại
                            mapInstance.current.setZoom(15); // Đặt lại mức zoom nếu cần
                        }
                    }}
                    tabIndex="-1" // Loại bỏ khả năng focus
                    onFocus={(e) => e.preventDefault()} // Ngăn sự kiện focus xảy ra
                    onMouseDown={(e) => e.preventDefault()}
                >
                    {/* <img src={'img/comment/comment-1.jpg'} alt="Location" style={{ width: '24px', height: '24px' }} /> */}
                    <i className="fa fa-map-marker" aria-hidden="true" style={{ fontSize: '24px', color: '#007BFF' }}></i>
                </button>
            </section>
            <Footer />
        </div>
    );
}

export default Contact