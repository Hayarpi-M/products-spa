import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { addProduct } from '../store/productsSlice';
import { useNavigate } from 'react-router-dom';


const CreateProductPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [errors, setErrors] = useState<string[]>([]);

    const validate = () => {
        const errs: string[] = [];
        if (!title.trim()) errs.push('Title is required');
        if (!description.trim()) errs.push('Description is required');
        if (!price || isNaN(Number(price))) errs.push('Price is required and must be a number');
        setErrors(errs);
        return errs.length === 0;
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        dispatch(addProduct({ title: title.trim(), description: description.trim(), image: image.trim(), price: Number(price) }));
        navigate('/products');
    };


    return (
        <div>
            <button className="btn-link" onClick={() => navigate('/products')}>&larr; Back</button>
            <h1>Create Product</h1>
            {errors.length > 0 && (
                <div className="errors">
                    {errors.map((err) => (
                        <div key={err}>- {err}</div>
                    ))}
                </div>
            )}

            <form onSubmit={onSubmit} className="form">
                <label>Title</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} />


                <label>Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={5} />


                <label>Image URL (optional)</label>
                <input value={image} onChange={(e) => setImage(e.target.value)} />


                <label>Price</label>
                <input value={price} onChange={(e) => setPrice(e.target.value)} />


                <button type="submit" className="btn primary">Create</button>
            </form>
        </div>
    );
};
export default CreateProductPage;