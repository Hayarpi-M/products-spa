import React from 'react';
import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/index';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CreateProductPage from './pages/CreateProductPage';
import './styles.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';

/*const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);*/
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/products" replace />} />
    <Route path="/products" element={<ProductsPage />} />
    <Route path="/products/:id" element={<ProductDetailsPage />} />
    <Route path="/create-product" element={<CreateProductPage />} />
    <Route path="*" element={<div>Not found</div>} />
  </Routes>
);
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();