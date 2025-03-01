import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <div className="col-lg-3 col-md-4 col-6">
            <div className="cake_feature_item">
                <div className="cake_img">
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        // onClick={product.quantity > 0 ? onClick : undefined}
                        style={{ cursor: product.quantity === 0 ? 'not-allowed' : 'pointer' }}
                    />
                </div>
                <div className="cake_text">
                    <h3 style={{
                        maxWidth: 270,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        textAlign: "center",
                        margin: "0 20px 30px 20px",
                    }}>
                        <strong>{product.name}</strong>
                    </h3>
                    <Link
                        to="/product-details"
                        className="pest_btn"
                        state={product}
                    >
                        Xem
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard