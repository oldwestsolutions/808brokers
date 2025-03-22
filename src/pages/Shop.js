import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Shop.css';

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'drumkits', name: 'Drum Kits' },
    { id: 'samples', name: 'Sample Packs' },
    { id: 'presets', name: 'Presets' },
    { id: 'templates', name: 'Templates' }
  ];

  const products = [
    {
      id: 1,
      name: '808 Bass Drum Kit',
      category: 'drumkits',
      price: 29.99,
      image: '/images/products/808-kit.jpg',
      description: 'Premium 808 bass drum samples with multiple variations',
      rating: 4.8,
      sales: 1200
    },
    {
      id: 2,
      name: 'Trap Melody Sample Pack',
      category: 'samples',
      price: 39.99,
      image: '/images/products/trap-melody.jpg',
      description: 'Collection of trap melody samples and loops',
      rating: 4.6,
      sales: 850
    },
    {
      id: 3,
      name: 'FL Studio Trap Template',
      category: 'templates',
      price: 49.99,
      image: '/images/products/trap-template.jpg',
      description: 'Professional trap production template for FL Studio',
      rating: 4.9,
      sales: 650
    },
    {
      id: 4,
      name: '808 Preset Pack',
      category: 'presets',
      price: 24.99,
      image: '/images/products/808-presets.jpg',
      description: 'Custom 808 presets for various DAWs',
      rating: 4.7,
      sales: 950
    }
  ];

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'sales':
        return b.sales - a.sales;
      default:
        return 0;
    }
  });

  return (
    <div className="shop-page">
      <div className="shop-header">
        <h1>808 Brokers Shop</h1>
        <p>Premium sounds and resources for your music production</p>
      </div>

      <div className="shop-filters">
        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="sort-filters">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="sales">Most Popular</option>
          </select>
        </div>
      </div>

      <div className="products-grid">
        {sortedProducts.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <img src={product.image} alt={product.name} />
              <div className="product-overlay">
                <button className="add-to-cart">Add to Cart</button>
                <button className="preview">Preview</button>
              </div>
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <div className="product-meta">
                <span className="price">${product.price}</span>
                <span className="rating">★ {product.rating}</span>
                <span className="sales">{product.sales} sales</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="shop-features">
        <div className="feature">
          <i className="fas fa-truck"></i>
          <h3>Instant Delivery</h3>
          <p>Get your products immediately after purchase</p>
        </div>
        <div className="feature">
          <i className="fas fa-headphones"></i>
          <h3>Free Support</h3>
          <p>24/7 customer support for all products</p>
        </div>
        <div className="feature">
          <i className="fas fa-shield-alt"></i>
          <h3>Secure Payment</h3>
          <p>100% secure payment processing</p>
        </div>
      </div>
    </div>
  );
};

export default Shop; 