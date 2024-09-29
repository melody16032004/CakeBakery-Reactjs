import React from "react";
import { useNavigate } from 'react-router-dom';
import './card.css';

const Card = ({ addToCart, id, name, price, image, image_L }) => {
    // const products = [
    //     { id: 0, name: "Cake 0", price: "94", image: "img/cake-feature/c-feature-1.jpg", image_L: "img/product/product-details-1.jpg" },
    //     { id: 1, name: "Cake 1", price: "56", image: "img/cake-feature/c-feature-2.jpg", image_L: "img/product/product-details-2.jpg" },
    //     { id: 2, name: "Cake 2", price: "20", image: "img/cake-feature/c-feature-3.jpg", image_L: "img/product/product-details-3.jpg" },
    //     { id: 3, name: "Cake 3", price: "39", image: "img/cake-feature/c-feature-4.jpg", image_L: "img/cake-feature/c-feature-4.jpg" },
    //     { id: 4, name: "Cake 4", price: "40", image: "img/cake-feature/c-feature-5.jpg", image_L: "img/product/product-details-5.jpg" },
    //     { id: 5, name: "Cake 5", price: "44", image: "img/cake-feature/c-feature-6.jpg", image_L: "img/product/product-details-6.jpg" },
    //     { id: 6, name: "Cake 6", price: "95", image: "img/cake-feature/c-feature-7.jpg", image_L: "img/product/product-details-7.jpg" },
    //     { id: 7, name: "Cake 7", price: "77", image: "img/cake-feature/c-feature-8.jpg", image_L: "img/product/product-details-8.jpg" },
    //     { id: 8, name: "Cake 8", price: "84", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
    // ];

    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/product-details', {
            state: {
                id
                // : product.id
                ,
                name
                // : product.name
                ,
                price
                // : product.price
                ,
                image
                // : product.image
                ,
                image_L
                // : product.image_L
                ,
            }
        });
    };
    const product = {
        id,
        name,
        price,
        image,
        image_L
    };

    return (


        <div className="col-lg-4 col-md-4 col-6" >
            <div className="cake_feature_item">

                <div className="cake_img">
                    <img src={image} alt=""
                        onClick={handleClick}
                    />
                    <button className="view-btn" onClick={() => handleClick()}>
                        Xem
                    </button>
                </div>
                <div className="cake_text">
                    <h4>${price}</h4>
                    <h3>{name}</h3>
                    <a className="pest_btn"
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            addToCart(product);
                        }}
                    >
                        Add to cart
                    </a>
                </div>

            </div>
        </div >


    );
};

export default Card