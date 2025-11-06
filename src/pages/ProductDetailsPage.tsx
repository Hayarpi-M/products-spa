import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';


const ProductDetailsPage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = useSelector((s: RootState) => s.products.items.find((p) => p.id === id));

    if (!product) {
        return (
            <div>
                <button className="btn-link" onClick={() => navigate('/products')}>&larr; Back</button>
                <p>Product not found.</p>
            </div>
        );
    }

    return (
        <div>
            <button className="btn-link" onClick={() => navigate('/products')}>&larr; Back</button>
            <div className="detail-layout">
                <div className="detail-image">
                    {product.image ? <img src={product.image} alt={product.title} /> : <div>No image</div>}
                </div>
                <div className="detail-info">
                    <h2>{product.title}</h2>
                    <p>{product.description}</p>
                    <div className="price">{product.price ? `$${product.price}` : ''}</div>
                    <div className="meta">Created: {new Date(product.createdAt || '').toLocaleString()}</div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;