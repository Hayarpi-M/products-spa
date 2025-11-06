import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchInitialProducts } from '../api/productsApi';
import { setProducts, toggleLike, removeProduct } from '../store/productsSlice';
import ProductCard from '../components/ProductCard';
import { useNavigate } from 'react-router-dom';


const ProductsPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const products = useSelector((s: RootState) => s.products.items);
    const [filter, setFilter] = useState<'all' | 'liked'>('all');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (products.length === 0) {
            setLoading(true);
            fetchInitialProducts().then((data) => {
                dispatch(setProducts(data));
                setLoading(false);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const items = filter === 'all' ? products : products.filter((p) => p.liked);

    return (
        <div className="container">
            <header className="page-header">
                <h1>Products</h1>
                <div>
                    <button className="btn" onClick={() => navigate('/create-product')}>
                        Create product
                    </button>
                </div>
            </header>
            <div className="filters">
                <button className={`chip ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
                    All
                </button>
                <button className={`chip ${filter === 'liked' ? 'active' : ''}`} onClick={() => setFilter('liked')}>
                    Favorites
                </button>
            </div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="grid">
                    {items.length === 0 && <div>No products found.</div>}
                    {items.map((p) => (
                        <ProductCard
                            key={p.id}
                            product={p}
                            onLike={(id) => dispatch(toggleLike(id))}
                            onDelete={(id) => dispatch(removeProduct(id))}
                            onOpen={(id) => navigate(`/products/${id}`)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
export default ProductsPage;