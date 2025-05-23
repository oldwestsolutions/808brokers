import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaUsers, 
  FaTrophy, 
  FaSlidersH, 
  FaRobot, 
  FaMusic, 
  FaMicrophone, 
  FaUserFriends, 
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaStar,
  FaChartLine,
  FaGraduationCap,
  FaBook,
  FaCertificate,
  FaCodeBranch,
  FaBriefcase
} from 'react-icons/fa';
import './Community.css';

const UPCOMING_EVENTS = [
  {
    id: 'event1',
    title: 'Virtual Beat Battle',
    date: 'March 25, 2024',
    time: '8:00 PM EST',
    participants: 128,
    icon: FaMusic
  },
  {
    id: 'event2',
    title: 'Sound Design Workshop',
    date: 'March 28, 2024',
    time: '6:00 PM EST',
    participants: 64,
    icon: FaSlidersH
  },
  {
    id: 'event3',
    title: 'Producer Meet & Greet',
    date: 'April 1, 2024',
    time: '7:00 PM EST',
    participants: 256,
    icon: FaUserFriends
  },
  {
    id: 'event4',
    title: 'Mixing Masterclass',
    date: 'April 5, 2024',
    time: '5:00 PM EST',
    participants: 96,
    icon: FaMicrophone
  }
];

const Community = () => {
  const [activeBubble, setActiveBubble] = useState(null);
  const [collabStatus, setCollabStatus] = useState('browse'); // 'browse', 'create', 'join'
  const [projectType, setProjectType] = useState(''); // 'beat', 'remix', 'original'
  const [skillLevel, setSkillLevel] = useState(''); // 'beginner', 'intermediate', 'advanced'
  const [challengeStatus, setChallengeStatus] = useState('current'); // 'current', 'upcoming', 'past'
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  useEffect(() => {
    document.querySelector('.navbar')?.style.setProperty('display', 'none');
    
    // Show navbar when component unmounts
    return () => {
      document.querySelector('.navbar')?.style.setProperty('display', 'flex');
    };
  }, []);

  const communityFeatures = [
    {
      id: 'collaboration',
      title: 'Collaboration Hub',
      description: 'Connect with other producers, share projects, and work together on tracks. Our collaboration hub provides real-time project sharing, version control, and seamless communication tools to help you create amazing music together.',
      icon: FaUsers,
      color: 'linear-gradient(145deg, #2a1b3d 0%, #1f1429 100%)',
      quickLinks: ['Find Collaborators', 'Project Sharing', 'Real-time Jamming'],
      category: 'Community',
      accentColor: '#8A2BE2',
      details: {
        collaborationTools: {
          activeProjects: [
            {
              id: 'proj1',
              title: 'Trap Beat Collab',
              genre: 'Trap',
              creator: 'Mike D.',
              status: 'In Progress',
              participants: 3,
              maxParticipants: 5,
              description: 'Creating a hard-hitting trap beat with unique 808 patterns and atmospheric melodies.',
              skills: ['Sound Design', '808 Programming', 'Mixing'],
              deadline: 'April 15, 2024'
            },
            {
              id: 'proj2',
              title: 'House Remix',
              genre: 'House',
              creator: 'Sarah L.',
              status: 'Open',
              participants: 1,
              maxParticipants: 4,
              description: 'Remixing a classic house track with modern production techniques and fresh sound design.',
              skills: ['Remixing', 'House Production', 'Arrangement'],
              deadline: 'April 20, 2024'
            },
            {
              id: 'proj3',
              title: 'Future Bass Track',
              genre: 'Future Bass',
              creator: 'Alex R.',
              status: 'In Progress',
              participants: 2,
              maxParticipants: 3,
              description: 'Collaborative future bass track focusing on lush pads and complex sound design.',
              skills: ['Sound Design', 'Synthesis', 'Arrangement'],
              deadline: 'April 25, 2024'
            }
          ],
          projectTypes: [
            {
              id: 'beat',
              name: 'Beat Making',
              icon: '🎵',
              description: 'Create beats and instrumentals for various genres',
              requirements: ['Basic DAW knowledge', 'Understanding of rhythm']
            },
            {
              id: 'remix',
              name: 'Remix',
              icon: '🔄',
              description: 'Remix existing tracks with your unique style',
              requirements: ['Remixing experience', 'Creative interpretation']
            },
            {
              id: 'original',
              name: 'Original Track',
              icon: '🎼',
              description: 'Create original compositions from scratch',
              requirements: ['Composition skills', 'Arrangement knowledge']
            }
          ],
          skillLevels: [
            {
              id: 'beginner',
              name: 'Beginner',
              icon: '🌱',
              description: 'New to production, learning the basics',
              requirements: ['Basic DAW knowledge', 'Eagerness to learn']
            },
            {
              id: 'intermediate',
              name: 'Intermediate',
              icon: '🌿',
              description: 'Comfortable with production, looking to grow',
              requirements: ['Solid DAW skills', 'Basic mixing knowledge']
            },
            {
              id: 'advanced',
              name: 'Advanced',
              icon: '🌳',
              description: 'Experienced producer, ready for complex projects',
              requirements: ['Professional experience', 'Advanced mixing skills']
            }
          ]
        }
      }
    }
  ];

  const newsCards = [
    {
      id: 'ai-music',
      title: 'AI & Music Research',
      description: 'Latest studies on artificial intelligence in music creation and analysis.',
      icon: FaRobot,
      color: 'linear-gradient(145deg, #2a1b3d 0%, #1f1429 100%)',
      quickLinks: ['AI Studies', 'Music Analysis', 'Machine Learning'],
      category: 'Research',
      accentColor: '#8A2BE2',
      image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'blockchain-music',
      title: 'Blockchain for Musicians',
      description: "Research on blockchain's impact on music rights and royalties.",
      icon: FaCodeBranch,
      color: 'linear-gradient(145deg, #2a1b3d 0%, #1f1429 100%)',
      quickLinks: ['Blockchain', 'Music Rights', 'Royalties'],
      category: 'Research',
      accentColor: '#9B30FF',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'music-neuro',
      title: 'Music & Neuroscience',
      description: 'Insights from research on how music affects the brain and creativity.',
      icon: FaGraduationCap,
      color: 'linear-gradient(145deg, #2a1b3d 0%, #1f1429 100%)',
      quickLinks: ['Neuroscience', 'Creativity', 'Music Therapy'],
      category: 'Research',
      accentColor: '#9370DB',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const learningPaths = [
    {
      title: 'Beginner Path',
      description: 'Start your music production journey',
      topics: ['Basic DAW Usage', 'Simple Melodies', 'Basic Mixing'],
      duration: '2-3 months'
    },
    {
      title: 'Intermediate Path',
      description: 'Deepen your production skills',
      topics: ['Advanced Mixing', 'Sound Design', 'Arrangement'],
      duration: '3-6 months'
    },
    {
      title: 'Advanced Path',
      description: 'Master professional techniques',
      topics: ['Mastering', 'Advanced Sound Design', 'Industry Standards'],
      duration: '6-12 months'
    }
  ];

  const featuredArticles = [
    {
      id: 'article1',
      title: 'AI Revolution in Music Production',
      description: 'How artificial intelligence is transforming the way we create and produce music, from automated mixing to AI-powered composition tools.',
      icon: FaRobot,
      color: 'linear-gradient(145deg, #2a1b3d 0%, #1f1429 100%)',
      quickLinks: ['AI Tools', 'Automation', 'Future'],
      category: 'Technology',
      accentColor: '#8B008B'
    },
    {
      id: 'article2',
      title: 'Music Industry Trends 2024',
      description: 'The latest developments in the music business, streaming platforms, and emerging revenue models for artists and producers.',
      icon: FaChartLine,
      color: 'linear-gradient(145deg, #2a1b3d 0%, #1f1429 100%)',
      quickLinks: ['Streaming', 'Revenue', 'Platforms'],
      category: 'Business',
      accentColor: '#9B30FF'
    },
    {
      id: 'article3',
      title: 'Blockchain in Music Rights',
      description: 'How blockchain technology is revolutionizing music rights management, royalty distribution, and intellectual property protection.',
      icon: FaCodeBranch,
      color: 'linear-gradient(145deg, #2a1b3d 0%, #1f1429 100%)',
      quickLinks: ['Blockchain', 'Rights', 'Royalties'],
      category: 'Technology',
      accentColor: '#9370DB'
    },
    {
      id: 'article4',
      title: 'Virtual Reality Concerts',
      description: 'The rise of virtual reality concerts and immersive music experiences, changing how artists connect with their audience.',
      icon: FaUsers,
      color: 'linear-gradient(145deg, #2a1b3d 0%, #1f1429 100%)',
      quickLinks: ['VR', 'Concerts', 'Immersive'],
      category: 'Innovation',
      accentColor: '#8A2BE2'
    },
    {
      id: 'article5',
      title: 'Music Streaming Economics',
      description: 'Deep dive into the economics of music streaming platforms and their impact on artist revenue and industry sustainability.',
      icon: FaBriefcase,
      color: 'linear-gradient(145deg, #2a1b3d 0%, #1f1429 100%)',
      quickLinks: ['Economics', 'Streaming', 'Revenue'],
      category: 'Business',
      accentColor: '#9932CC'
    },
    {
      id: 'article6',
      title: 'Social Media Impact on Music',
      description: 'How social media platforms are shaping music discovery, artist promotion, and fan engagement in the digital age.',
      icon: FaUsers,
      color: 'linear-gradient(145deg, #2a1b3d 0%, #1f1429 100%)',
      quickLinks: ['Social Media', 'Promotion', 'Engagement'],
      category: 'Social',
      accentColor: '#9400D3'
    },
    {
      id: 'article7',
      title: 'Music Tech Startups',
      description: 'Emerging music technology startups and their innovative solutions for creators, labels, and music industry professionals.',
      icon: FaRobot,
      color: 'linear-gradient(145deg, #2a1b3d 0%, #1f1429 100%)',
      quickLinks: ['Startups', 'Innovation', 'Tech'],
      category: 'Technology',
      accentColor: '#8B008B'
    },
    {
      id: 'article8',
      title: 'Music Education Evolution',
      description: 'The transformation of music education through online platforms, AI tutors, and interactive learning technologies.',
      icon: FaGraduationCap,
      color: 'linear-gradient(145deg, #2a1b3d 0%, #1f1429 100%)',
      quickLinks: ['Education', 'Online', 'Learning'],
      category: 'Education',
      accentColor: '#9B30FF'
    }
  ];

  const renderCollaborationTools = () => {
    if (activeBubble !== 'collaboration') return null;

    return (
      <motion.div
        className="collaboration-tools"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="collab-actions">
          <button 
            className={`action-btn ${collabStatus === 'browse' ? 'active' : ''}`}
            onClick={() => setCollabStatus('browse')}
          >
            Browse Projects
          </button>
          <button 
            className={`action-btn ${collabStatus === 'create' ? 'active' : ''}`}
            onClick={() => setCollabStatus('create')}
          >
            Create Project
          </button>
          <button 
            className={`action-btn ${collabStatus === 'join' ? 'active' : ''}`}
            onClick={() => setCollabStatus('join')}
          >
            Join Project
          </button>
        </div>

        {collabStatus === 'browse' && (
          <div className="active-projects">
            <h4>Active Projects</h4>
            <div className="projects-grid">
              {communityFeatures[0].details.collaborationTools.activeProjects.map(project => (
                <div key={project.id} className="project-card">
                  <div className="project-header">
                    <h5>{project.title}</h5>
                    <span className="project-genre">{project.genre}</span>
                  </div>
                  <div className="project-info">
                    <p>Creator: {project.creator}</p>
                    <p>Status: {project.status}</p>
                    <div className="participants">
                      <span>👥 {project.participants}/{project.maxParticipants}</span>
                    </div>
                  </div>
                  <button className="join-project-btn">Join Project</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {collabStatus === 'create' && (
          <div className="create-project">
            <h4>Create New Project</h4>
            <div className="project-type-selector">
              <h5>Project Type</h5>
              <div className="type-options">
                {communityFeatures[0].details.collaborationTools.projectTypes.map(type => (
                  <button
                    key={type.id}
                    className={`type-btn ${projectType === type.id ? 'active' : ''}`}
                    onClick={() => setProjectType(type.id)}
                  >
                    <span className="type-icon">{type.icon}</span>
                    {type.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="skill-level-selector">
              <h5>Skill Level</h5>
              <div className="skill-options">
                {communityFeatures[0].details.collaborationTools.skillLevels.map(level => (
                  <button
                    key={level.id}
                    className={`skill-btn ${skillLevel === level.id ? 'active' : ''}`}
                    onClick={() => setSkillLevel(level.id)}
                  >
                    <span className="skill-icon">{level.icon}</span>
                    {level.name}
                  </button>
                ))}
              </div>
            </div>
            <button className="create-project-btn">Create Project</button>
          </div>
        )}

        {collabStatus === 'join' && (
          <div className="join-project">
            <h4>Find Projects to Join</h4>
            <div className="search-filters">
              <input type="text" placeholder="Search projects..." className="search-input" />
              <select className="filter-select">
                <option value="">All Genres</option>
                <option value="trap">Trap</option>
                <option value="house">House</option>
                <option value="hiphop">Hip Hop</option>
              </select>
            </div>
            <div className="projects-grid">
              {communityFeatures[0].details.collaborationTools.activeProjects.map(project => (
                <div key={project.id} className="project-card">
                  <div className="project-header">
                    <h5>{project.title}</h5>
                    <span className="project-genre">{project.genre}</span>
                  </div>
                  <div className="project-info">
                    <p>Creator: {project.creator}</p>
                    <p>Status: {project.status}</p>
                    <div className="participants">
                      <span>👥 {project.participants}/{project.maxParticipants}</span>
                    </div>
                  </div>
                  <button className="join-project-btn">Join Project</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    );
  };

  const renderChallengeTools = () => {
    if (activeBubble !== 'challenges') return null;

    return (
      <motion.div
        className="challenge-tools"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="challenge-actions">
          <button 
            className={`action-btn ${challengeStatus === 'current' ? 'active' : ''}`}
            onClick={() => setChallengeStatus('current')}
          >
            Current Challenge
          </button>
          <button 
            className={`action-btn ${challengeStatus === 'upcoming' ? 'active' : ''}`}
            onClick={() => setChallengeStatus('upcoming')}
          >
            Upcoming
          </button>
          <button 
            className={`action-btn ${challengeStatus === 'past' ? 'active' : ''}`}
            onClick={() => setChallengeStatus('past')}
          >
            Past Challenges
          </button>
        </div>

        {challengeStatus === 'current' && (
          <div className="current-challenge">
            <div className="challenge-card featured">
              <div className="challenge-header">
                <span className="challenge-badge">Active Now</span>
                <h4>808 Bass Challenge</h4>
              </div>
              <div className="challenge-content">
                <p>Create a unique 808 bass pattern that stands out. Show off your sound design skills and groove creation abilities.</p>
                <div className="challenge-meta">
                  <div className="meta-item">
                    <span>🎵</span> 128 Participants
                  </div>
                  <div className="meta-item">
                    <span>⏰</span> 5 Days Left
                  </div>
                  <div className="meta-item">
                    <span>🏆</span> $500 Prize Pool
                  </div>
                </div>
                <div className="challenge-requirements">
                  <h5>Requirements</h5>
                  <ul>
                    <li>Use at least 3 different 808 samples</li>
                    <li>Include a minimum of 4 variations</li>
                    <li>Submit in WAV format</li>
                    <li>Maximum length: 2 minutes</li>
                  </ul>
                </div>
                <button className="participate-btn">Participate Now</button>
              </div>
            </div>
          </div>
        )}

        {challengeStatus === 'upcoming' && (
          <div className="upcoming-challenges">
            <div className="challenges-grid">
              {[
                {
                  id: 'up1',
                  title: 'Melody Master Challenge',
                  date: 'Next Week',
                  participants: 0,
                  prize: '$300',
                  icon: '🎼'
                },
                {
                  id: 'up2',
                  title: 'Drum Pattern Challenge',
                  date: 'In 2 Weeks',
                  participants: 0,
                  prize: '$400',
                  icon: '🥁'
                }
              ].map(challenge => (
                <div key={challenge.id} className="challenge-card">
                  <div className="challenge-header">
                    <span className="challenge-badge upcoming">Upcoming</span>
                    <h4>{challenge.title}</h4>
                  </div>
                  <div className="challenge-content">
                    <div className="challenge-icon">{challenge.icon}</div>
                    <div className="challenge-meta">
                      <div className="meta-item">
                        <span>📅</span> {challenge.date}
                      </div>
                      <div className="meta-item">
                        <span>🏆</span> {challenge.prize}
                      </div>
                    </div>
                    <button className="remind-me-btn">Remind Me</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {challengeStatus === 'past' && (
          <div className="past-challenges">
            <div className="challenges-grid">
              {[
                {
                  id: 'past1',
                  title: 'Synthwave Challenge',
                  date: 'Last Week',
                  participants: 256,
                  winner: 'Alex K.',
                  icon: '🎹'
                },
                {
                  id: 'past2',
                  title: 'Trap Beat Challenge',
                  date: '2 Weeks Ago',
                  participants: 189,
                  winner: 'Sarah M.',
                  icon: '🎵'
                }
              ].map(challenge => (
                <div key={challenge.id} className="challenge-card">
                  <div className="challenge-header">
                    <span className="challenge-badge past">Completed</span>
                    <h4>{challenge.title}</h4>
                  </div>
                  <div className="challenge-content">
                    <div className="challenge-icon">{challenge.icon}</div>
                    <div className="challenge-meta">
                      <div className="meta-item">
                        <span>👥</span> {challenge.participants} Participants
                      </div>
                      <div className="meta-item">
                        <span>🏆</span> Winner: {challenge.winner}
                      </div>
                    </div>
                    <button className="view-results-btn">View Results</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="community-page">
      <header 
        className="community-header" 
        style={{ 
          background: '#000000', 
          backgroundColor: '#000000',
          backgroundImage: 'none'
        }}
      >
        <div className="header-content">
          <Link to="/" className="header-logo">
            <img src="/favicon.ico" alt="808 Brokers Logo" className="logo-image" />
            <span className="logo-text">808 Brokers</span>
          </Link>
        </div>
      </header>
      <div className="community-container">
        <div className="community-main">
          <div className="learning-center-section">
            <h2>Latest News</h2>
            <p className="section-description">Stay updated with the latest news from the New York Times</p>
            <div className="news-grid">
              <div className="news-card" onClick={() => window.location.href = '/news/technology'}>
                <div className="news-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=600&q=80')" }}></div>
                <div className="news-icon">
                  <i className="fas fa-microchip"></i>
                </div>
                <span className="news-category">Technology</span>
                <h3 className="news-title">AI in Music Production</h3>
                <p className="news-description">How artificial intelligence is revolutionizing the way we create and produce music.</p>
                <span className="news-link">Read More</span>
              </div>
              <div className="news-card" onClick={() => window.location.href = '/news/business'}>
                <div className="news-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80')" }}></div>
                <div className="news-icon">
                  <i className="fas fa-chart-line"></i>
                </div>
                <span className="news-category">Business</span>
                <h3 className="news-title">Music Industry Trends</h3>
                <p className="news-description">The latest developments in the music business and streaming platforms.</p>
                <span className="news-link">Read More</span>
              </div>
              <div className="news-card" onClick={() => window.location.href = '/news/culture'}>
                <div className="news-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80')" }}></div>
                <div className="news-icon">
                  <i className="fas fa-music"></i>
                </div>
                <span className="news-category">Culture</span>
                <h3 className="news-title">Music Culture</h3>
                <p className="news-description">Exploring the intersection of music, culture, and society.</p>
                <span className="news-link">Read More</span>
              </div>
            </div>
          </div>

          <div className="learning-center-section">
            <div className="learning-bubbles-grid">
              <motion.div
                className="learning-bubble large"
                style={{ 
                  background: 'linear-gradient(145deg, #2a1b3d 0%, #1f1429 100%)',
                  borderColor: '#8B008B'
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <img src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=600&q=80" alt="AI Music" style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '12px', marginBottom: '1rem' }} />
                <div className="bubble-content">
                  <div className="bubble-icon" style={{ color: '#8B008B' }}>
                    <FaRobot className="icon" />
                  </div>
                  <span className="bubble-category" style={{ background: 'rgba(139, 0, 139, 0.2)' }}>Technology</span>
                  <h3 className="bubble-title">AI Revolution in Music Production</h3>
                  <div className="theory-sections">
                    <div className="theory-section">
                      <h4>AI Tools & Automation</h4>
                      <p>AI is transforming music production with automated mixing, smart composition, and sound design.</p>
                    </div>
                    <div className="theory-section">
                      <h4>Industry Impact</h4>
                      <p>AI is reshaping music from creation to distribution, changing how the industry works.</p>
                    </div>
                    <div className="theory-section">
                      <h4>Future of Music Tech</h4>
                      <p>New tech will keep evolving how music is made and shared—stay tuned for the latest trends.</p>
                    </div>
                  </div>
                  <div className="bubble-links">
                    <a 
                      href="#" 
                      className="bubble-link"
                      style={{ 
                        background: 'rgba(139, 0, 139, 0.2)',
                        borderColor: 'rgba(139, 0, 139, 0.4)'
                      }}
                    >
                      Read More
                    </a>
                  </div>
                </div>
                <div className="bubble-decoration"></div>
              </motion.div>
              <motion.div
                className="learning-bubble small"
                style={{ 
                  background: 'linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)',
                  borderColor: '#4a90e2'
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80" alt="Business Trends" style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '12px', marginBottom: '1rem' }} />
                <div className="bubble-content">
                  <div className="bubble-icon" style={{ color: '#4a90e2' }}>
                    <FaChartLine className="icon" />
                  </div>
                  <span className="bubble-category" style={{ background: 'rgba(74, 144, 226, 0.2)' }}>Business</span>
                  <h3 className="bubble-title">Music Industry Trends 2024</h3>
                  <p className="bubble-description">
                    Stay informed about the latest developments in the music business, from streaming platforms to emerging revenue models and market analysis. The industry is evolving rapidly with new technologies and business models.
                  </p>
                  <div className="bubble-links">
                    <a 
                      href="#" 
                      className="bubble-link"
                      style={{ 
                        background: 'rgba(74, 144, 226, 0.2)',
                        borderColor: 'rgba(74, 144, 226, 0.4)'
                      }}
                    >
                      Read More
                    </a>
                  </div>
                </div>
                <div className="bubble-decoration"></div>
              </motion.div>
            </div>
          </div>

          <div className="bubbles-grid">
            {newsCards.map((feature) => (
              <motion.div
                key={feature.id}
                className="bubble"
                style={{ backgroundColor: feature.color }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {feature.image && (
                  <img src={feature.image} alt={feature.title} style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '12px', marginBottom: '1rem' }} />
                )}
                <div className="bubble-icon">{feature.icon}</div>
                <h3 className="bubble-title">{feature.title}</h3>
                <p className="bubble-description">
                  {feature.description}
                </p>
                <div className="bubble-details">
                  {feature.id === 'collaboration' && renderCollaborationTools()}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community; 