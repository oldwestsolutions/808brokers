import React from 'react';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaTruck, FaHeadset, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/Shop.css';

const Shop = () => {
  const products = [
    {
      id: 1,
      name: "808 Bass Drum Kit",
      description: "Premium 808 samples for trap and hip hop production",
      price: 29.99,
      rating: 4.8,
      sales: 1200,
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "Drum Kits"
    },
    {
      id: 2,
      name: "Trap Melody Sample Pack",
      description: "Melodic samples and loops for trap music",
      price: 39.99,
      rating: 4.9,
      sales: 850,
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "Sample Packs"
    },
    {
      id: 3,
      name: "FL Studio Trap Template",
      description: "Professional trap music template for FL Studio",
      price: 49.99,
      rating: 4.7,
      sales: 600,
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "Templates"
    }
  ];

  const features = [
    {
      icon: <FaTruck />,
      title: "Instant Delivery",
      description: "Get your products immediately after purchase"
    },
    {
      icon: <FaHeadset />,
      title: "Free Support",
      description: "24/7 customer support for all products"
    },
    {
      icon: <FaLock />,
      title: "Secure Payment",
      description: "100% secure payment processing"
    }
  ];

  return (
    <div className="page-container">
      <header className="page-header">
        <Link to="/" className="logo-link">
          <img src="/logo.png" alt="808 Brokers Logo" className="header-logo" />
        </Link>
      </header>

      <motion.div 
        className="shop-page"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="shop-header">
          <h1>Shop</h1>
          <p className="subtitle">Premium music production resources</p>
        </div>

        <div className="shop-content">
          <section className="products-section">
            <h2>Featured Products</h2>
            <div className="products-grid">
              {products.map(product => (
                <motion.div
                  key={product.id}
                  className="product-card"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="description">{product.description}</p>
                    <div className="product-meta">
                      <span className="price">${product.price}</span>
                      <span className="rating">★ {product.rating}</span>
                      <span className="sales">{product.sales} sales</span>
                    </div>
                    <button className="add-to-cart">
                      <FaShoppingCart /> Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="features-section">
            <h2>Why Choose Us</h2>
            <div className="features-grid">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="feature-card"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="feature-icon">{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  );
};

export default Shop; 