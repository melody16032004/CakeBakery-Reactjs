import React, { useState, useEffect } from 'react';
import '../index.css';

const Slider = () => {
    const slides = [
        { id: 1, imageUrl: 'img/home-slider/slider-1.jpg' },
        { id: 2, imageUrl: 'img/home-slider/slider-1.jpg' },
        // { id: 3, imageUrl: 'image3.jpg' },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        // Tự động thay đổi slide sau mỗi 3 giây (3000ms)
        const slideInterval = setInterval(() => {
            setCurrentSlide((prevSlide) =>
                prevSlide === slides.length - 1 ? 0 : prevSlide + 1
            );
        }, 3000);

        // Dọn dẹp interval khi component unmount
        return () => clearInterval(slideInterval);
    }, [slides.length]);

    const nextSlide = () => {
        setCurrentSlide((prevSlide) =>
            prevSlide === slides.length - 1 ? 0 : prevSlide + 1
        );
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) =>
            prevSlide === 0 ? slides.length - 1 : prevSlide - 1
        );
    };

    return (
        <div className="slider">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`slide ${index === currentSlide ? 'active' : ''}`}
                    style={{ backgroundImage: `url(${slide.imageUrl})` }}
                ></div>
            ))}

            {/* Nút điều khiển */}
            <button className="prev" onClick={prevSlide}>
                &#10094;
            </button>
            <button className="next" onClick={nextSlide}>
                &#10095;
            </button>
        </div>
    );
};

export default Slider;
