import React, { useState } from 'react';
import '../styles/Community.css';
import { Link } from 'react-router-dom';

const Community = () => {
  const [email, setEmail] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  const featuredPost = {
    id: 1,
    title: "The Future of Beat Making: AI and Human Creativity",
    excerpt: "Explore how artificial intelligence is transforming the music production landscape while enhancing human creativity...",
    date: "Mar 18, 2024",
    readTime: "8 min read",
    author: "James Wilson",
    category: "Technology",
    image: "ai-beats.jpg"
  };

  const blogCategories = [
    "Production Tips", "Industry News", "Artist Spotlights", 
    "Gear Reviews", "Tutorials", "Business & Marketing"
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Beat Battle Championship 2024",
      date: "MAR 25",
      time: "8:00 PM EST",
      location: "Virtual Event",
      description: "Join the biggest online beat battle of the year. Compete with producers worldwide for cash prizes and industry recognition.",
      prizes: "$5000 in prizes",
      registrationLink: "#",
      type: "Competition"
    },
    {
      id: 2,
      title: "Producer Networking Mixer",
      date: "APR 02",
      time: "7:00 PM EST",
      location: "Los Angeles, CA",
      description: "Connect with fellow producers, industry professionals, and artists in this exclusive networking event.",
      features: "Live beat showcases, Industry panels",
      registrationLink: "#",
      type: "Networking"
    }
  ];

  return (
    <div className="community-page">
      <div className="community-hero">
        <div className="hero-newsletter">
          <h2>Subscribe</h2>
          <p>Get weekly producer tips and industry insights</p>
          <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            <button type="submit" className="subscribe-button">Click to Subscribe</button>
          </form>
        </div>
      </div>

      <div className="community-content">
        <div className="content-grid">
          <main className="main-content">
            <section className="featured-post">
              <div className="section-header">
                <h2>Featured Article</h2>
                <Link to="/blog" className="view-all-link">View All Articles →</Link>
              </div>
              <div className="featured-post-card">
                <div className="post-image" style={{backgroundImage: `url(${featuredPost.image})`}}>
                  <div className="post-category">{featuredPost.category}</div>
                </div>
                <div className="post-content">
                  <div className="post-meta">
                    <span className="post-date">{featuredPost.date}</span>
                    <span className="post-author">By {featuredPost.author}</span>
                  </div>
                  <h3>{featuredPost.title}</h3>
                  <p>{featuredPost.excerpt}</p>
                  <Link to={`/blog/post/${featuredPost.id}`} className="read-more-button">
                    Read Full Article
                  </Link>
                </div>
              </div>
            </section>

            <section className="blog-categories">
              <h2>Explore Topics</h2>
              <div className="categories-grid">
                {blogCategories.map((category, index) => (
                  <Link to={`/blog/category/${category.toLowerCase()}`} key={index} className="category-card">
                    {category}
                  </Link>
                ))}
              </div>
            </section>

            <section className="events-section">
              <div className="section-header">
                <h2>Upcoming Events</h2>
                <Link to="/events" className="view-all-link">View All Events →</Link>
              </div>
              <div className="events-grid">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="event-card">
                    <div className="event-header">
                      <div className="event-date-badge">
                        <span className="date">{event.date}</span>
                        <span className="time">{event.time}</span>
                      </div>
                      <div className="event-type-badge">{event.type}</div>
                    </div>
                    <div className="event-details">
                      <h3>{event.title}</h3>
                      <p className="event-location">📍 {event.location}</p>
                      <p className="event-description">{event.description}</p>
                      <div className="event-highlights">
                        {event.prizes && <span className="highlight">🏆 {event.prizes}</span>}
                        {event.features && <span className="highlight">✨ {event.features}</span>}
                      </div>
                      <button className="register-button">Register Now</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </main>

          <aside className="sidebar">
            <div className="newsletter-section">
              <h3>Subscribe</h3>
              <p>Get weekly producer tips and industry insights</p>
              <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
                <button type="submit" className="subscribe-button">Click to Subscribe</button>
              </form>
            </div>

            <div className="education-portal">
              <h3>808 University</h3>
              <p>Level up your production skills with our courses</p>
              <div className="education-features">
                <div className="feature">
                  <span className="feature-icon">🎓</span>
                  <span>Expert-Led Courses</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">📱</span>
                  <span>Learn Anywhere</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">🏆</span>
                  <span>Get Certified</span>
                </div>
              </div>
              <Link to="/university" className="education-button">
                Start Learning
              </Link>
            </div>

            <div className="quick-links">
              <h3>Quick Links</h3>
              <nav className="quick-nav">
                <Link to="/blog/latest">Latest Articles</Link>
                <Link to="/blog/popular">Popular Posts</Link>
                <Link to="/blog/tutorials">Tutorials</Link>
                <Link to="/events">Upcoming Events</Link>
                <Link to="/resources">Producer Resources</Link>
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Community; 