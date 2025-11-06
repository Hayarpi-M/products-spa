import React from 'react';
import { TProduct } from '../types';
import { FaHeart, FaTrash } from 'react-icons/fa';


type Props = {
    product: TProduct;
    onLike: (id: string) => void;
    onDelete: (id: string) => void;
    onOpen: (id: string) => void;
};


const ProductCard: React.FC<Props> = ({ product, onLike, onDelete, onOpen }) => {
    const HeartIcon = FaHeart as React.ElementType;
    const TrashIcon = FaTrash as React.ElementType;
    return (
    <div
        className="card"
        onClick={() => onOpen(product.id)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === 'Enter' ? onOpen(product.id) : undefined)}
    >
        <div className="card-image">
            {product.image ? (
            // eslint-disable-next-line jsx-a11y/img-redundant-alt
            <img src={product.image} alt={product.title} />
            ) : (
            <div className="no-image">No image</div>
            )}
        </div>
        <div className="card-body">
            <h3 className="card-title">{product.title}</h3>
            <p className="card-desc">{product.description}</p>
        </div>
        <div className="card-footer" onClick={(e) => e.stopPropagation()}>
            <div className="price">{product.price ? `$${product.price}` : ''}</div>
            <div className="actions">
                <button aria-label="like" onClick={() => onLike(product.id)} className="icon-btn">
                    <HeartIcon style={{ color: product.liked ? '#e0245e' : '#666' }} />
                </button>
                <button aria-label="delete" onClick={() => onDelete(product.id)} className="icon-btn">
                    <TrashIcon />
                </button>
            </div>
        </div>
    </div>
  );
};
export default ProductCard;