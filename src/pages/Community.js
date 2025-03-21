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
      prizes: "$5000 in prizes",
      type: "Competition"
    },
    {
      id: 2,
      title: "Producer Networking Mixer",
      date: "APR 02",
      time: "7:00 PM EST",
      location: "Los Angeles, CA",
      features: "Live Showcases & Panels",
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

            <section className="research-development">
              <h2>Research & Development</h2>
              <div className="research-grid">
                <div className="research-card">
                  <span className="research-badge">Latest Research</span>
                  <div className="research-content">
                    <h3>AI Integration in Music Production</h3>
                    <p>New findings on neural networks in beat creation</p>
                    <Link to="/research/ai-production" className="research-link">Read Study →</Link>
                  </div>
                </div>
                
                <div className="research-card">
                  <span className="research-badge">Industry Analysis</span>
                  <div className="research-content">
                    <h3>Beat Market Trends 2024</h3>
                    <p>Statistical analysis of producer market growth</p>
                    <Link to="/research/market-analysis" className="research-link">View Report →</Link>
                  </div>
                </div>
              </div>
            </section>

            <section className="community-resources">
              <div className="section-header">
                <h2>Producer Resources</h2>
                <Link to="/resources" className="view-all-link">Browse All →</Link>
              </div>
              <div className="resources-grid">
                <div className="resource-card">
                  <div className="resource-icon">🎹</div>
                  <h3>Logic Pro</h3>
                  <p>Professional music production software</p>
                  <Link to="/logic-pro" className="resource-link">Learn More</Link>
                </div>
                
                <div className="resource-card">
                  <div className="resource-icon">🎛️</div>
                  <h3>FL Studio</h3>
                  <p>Complete music production software</p>
                  <Link to="/fl-studio" className="resource-link">Learn More</Link>
                </div>
                
                <div className="resource-card">
                  <div className="resource-icon">⬇️</div>
                  <h3>Downloads</h3>
                  <p>Essential tools and resources</p>
                  <Link to="/downloads" className="resource-link">Get Tools</Link>
                </div>
              </div>
            </section>

            <section className="collaboration-section">
              <div className="collab-header">
                <h2>Collaboration Corner</h2>
                <p>Connect with fellow producers and artists</p>
              </div>
              <div className="collab-grid">
                <div className="collab-card looking">
                  <h3>Looking for Producers</h3>
                  <div className="collab-posts">
                    {/* Example collab posts */}
                    <div className="collab-post">
                      <span className="genre-tag">Hip Hop</span>
                      <p>"Need trap beats for upcoming EP"</p>
                      <span className="post-meta">Posted 2h ago</span>
                    </div>
                    <div className="collab-post">
                      <span className="genre-tag">R&B</span>
                      <p>"Seeking melodic productions"</p>
                      <span className="post-meta">Posted 5h ago</span>
                    </div>
                  </div>
                </div>
                
                <div className="collab-card offering">
                  <h3>Producer Offerings</h3>
                  <div className="collab-posts">
                    <div className="collab-post">
                      <span className="genre-tag">Drill</span>
                      <p>"UK Drill producer available"</p>
                      <span className="post-meta">Posted 1h ago</span>
                    </div>
                    <div className="collab-post">
                      <span className="genre-tag">Pop</span>
                      <p>"Pop beats, quick turnaround"</p>
                      <span className="post-meta">Posted 3h ago</span>
                    </div>
                  </div>
                </div>
              </div>
              <Link to="/collaborate" className="collab-cta">
                Post a Collaboration Request
              </Link>
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

            <div className="upcoming-events-widget">
              <h3>Upcoming Events</h3>
              <div className="events-timeline">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="timeline-event">
                    <div className="event-time">
                      <div className="date-badge">
                        <span className="month">{event.date.split(' ')[0]}</span>
                        <span className="day">{event.date.split(' ')[1]}</span>
                      </div>
                      <span className="time">{event.time}</span>
                    </div>
                    <div className="event-content">
                      <span className="event-type">{event.type}</span>
                      <h4>{event.title}</h4>
                      <div className="event-meta">
                        <span className="location">📍 {event.location}</span>
                        {event.prizes && <span className="prize">🏆 {event.prizes}</span>}
                        {event.features && <span className="features">✨ {event.features}</span>}
                      </div>
                      <Link to={`/events/${event.id}`} className="event-link">
                        Learn More →
                      </Link>
                    </div>
                  </div>
                ))}
                <Link to="/events" className="view-all-events">
                  View All Events
                  <span className="arrow">→</span>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Community; 