import React, { useState } from 'react';
import '../styles/Shop.css';

const Shop = () => {
  const [samples] = useState([
    { id: 1, name: 'Trap Drums Kit', price: '29.99', category: 'Drums' },
    { id: 2, name: 'Melodic Loops Pack', price: '39.99', category: 'Melodies' },
    // Add more samples
  ]);

  return (
    <div className="shop-page">
      <div className="shop-header">
        <h1>Sample Shop</h1>
        <div className="shop-filters">
          <select>
            <option>All Categories</option>
            <option>Drums</option>
            <option>Melodies</option>
            <option>Bass</option>
          </select>
          <input type="text" placeholder="Search samples..." />
        </div>
      </div>

      <div className="samples-grid">
        {samples.map(sample => (
          <div key={sample.id} className="sample-card">
            <div className="sample-image">
              <i className="fas fa-music"></i>
            </div>
            <div className="sample-info">
              <h3>{sample.name}</h3>
              <p>{sample.category}</p>
              <div className="sample-price">
                <span>${sample.price}</span>
                <button>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop; 