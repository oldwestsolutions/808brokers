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
  FaCodeBranch
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
              maxParticipants: 5
            },
            {
              id: 'proj2',
              title: 'House Remix',
              genre: 'House',
              creator: 'Sarah L.',
              status: 'Open',
              participants: 1,
              maxParticipants: 4
            },
            {
              id: 'proj3',
              title: 'Future Bass Track',
              genre: 'Future Bass',
              creator: 'Alex R.',
              status: 'In Progress',
              participants: 2,
              maxParticipants: 3
            }
          ],
          projectTypes: [
            {
              id: 'beat',
              name: 'Beat Making',
              icon: '🎵'
            },
            {
              id: 'remix',
              name: 'Remix',
              icon: '🔄'
            },
            {
              id: 'original',
              name: 'Original Track',
              icon: '🎼'
            }
          ],
          skillLevels: [
            {
              id: 'beginner',
              name: 'Beginner',
              icon: '🌱'
            },
            {
              id: 'intermediate',
              name: 'Intermediate',
              icon: '🌿'
            },
            {
              id: 'advanced',
              name: 'Advanced',
              icon: '🌳'
            }
          ]
        }
      }
    }
  ];

  const newsCards = [
    {
      id: 'collaboration',
      title: 'Collaboration Hub',
      description: 'Connect with other producers, share projects, and work together on tracks. Our collaboration hub provides real-time project sharing, version control, and seamless communication tools to help you create amazing music together.',
      icon: FaUsers,
      color: 'linear-gradient(145deg, #2a1b3d 0%, #1f1429 100%)',
      quickLinks: ['Find Collaborators', 'Project Sharing', 'Real-time Jamming'],
      category: 'Community',
      accentColor: '#8A2BE2'
    },
    {
      id: 'challenges',
      title: 'Weekly Challenges',
      description: 'Participate in themed production challenges. Push your creative boundaries and compete with other producers in our weekly challenges.',
      icon: FaTrophy,
      color: 'linear-gradient(145deg, #2a1b3d 0%, #1f1429 100%)',
      quickLinks: ['Current Challenge', 'Past Winners', 'Leaderboard'],
      category: 'Competition',
      accentColor: '#9B30FF'
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
      title: 'Essential Music Theory for Producers',
      description: 'Master the fundamental music theory concepts that every producer should know. Learn about scales, chords, progressions, and how to apply them in your productions.',
      icon: FaMusic,
      color: 'linear-gradient(145deg, #2a1b3d 0%, #1f1429 100%)',
      quickLinks: ['Scales', 'Chords', 'Progressions'],
      category: 'Theory',
      accentColor: '#8B008B'
    },
    {
      id: 'article2',
      title: 'Advanced Sound Design Techniques',
      description: 'Explore advanced sound design methods to create unique and professional sounds. From synthesis to effects processing, learn how to craft your signature sound.',
      icon: FaSlidersH,
      color: 'linear-gradient(145deg, #2a1b3d 0%, #1f1429 100%)',
      quickLinks: ['Synthesis', 'Effects', 'Processing'],
      category: 'Sound Design',
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
        <Link to="/" className="header-logo">
          <img src="/favicon.ico" alt="806brokers Logo" className="logo-image" />
          <span className="logo-text">806brokers</span>
        </Link>
        <div className="header-search">
          <input type="text" placeholder="Search community..." className="search-input" />
          <i className="fas fa-search search-icon"></i>
        </div>
      </header>
      <div className="community-container">
        <div className="community-main">
          <div className="learning-center-section">
            <h2>Latest News</h2>
            <p className="section-description">Stay updated with the latest news from the New York Times</p>
            <div className="news-grid">
              <div className="news-card" onClick={() => window.location.href = '/news/technology'}>
                <div className="news-image"></div>
                <div className="news-icon">
                  <i className="fas fa-microchip"></i>
                </div>
                <span className="news-category">Technology</span>
                <h3 className="news-title">AI in Music Production</h3>
                <p className="news-description">How artificial intelligence is revolutionizing the way we create and produce music.</p>
                <span className="news-link">Read More</span>
              </div>
              <div className="news-card" onClick={() => window.location.href = '/news/business'}>
                <div className="news-image"></div>
                <div className="news-icon">
                  <i className="fas fa-chart-line"></i>
                </div>
                <span className="news-category">Business</span>
                <h3 className="news-title">Music Industry Trends</h3>
                <p className="news-description">The latest developments in the music business and streaming platforms.</p>
                <span className="news-link">Read More</span>
              </div>
              <div className="news-card" onClick={() => window.location.href = '/news/culture'}>
                <div className="news-image"></div>
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

          <section className="learning-center-section">
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
                <div className="bubble-content">
                  <div className="bubble-icon" style={{ color: '#8B008B' }}>
                    <FaMusic className="icon" />
                  </div>
                  <span className="bubble-category" style={{ background: 'rgba(139, 0, 139, 0.2)' }}>Music Theory</span>
                  <h3 className="bubble-title">Essential Music Theory for Producers</h3>
                  <div className="theory-sections">
                    <div className="theory-section">
                      <h4>Scales & Modes</h4>
                      <p>Master the fundamental scales and modes used in modern music production. Learn about major, minor, pentatonic, and modal scales to create memorable melodies.</p>
                      <ul className="theory-list">
                        <li>Major & Minor Scales</li>
                        <li>Pentatonic Scales</li>
                        <li>Modal Scales</li>
                        <li>Scale Degrees</li>
                      </ul>
                    </div>
                    <div className="theory-section">
                      <h4>Chords & Progressions</h4>
                      <p>Understand chord construction, inversions, and common progressions. Learn how to create emotional depth and movement in your tracks.</p>
                      <ul className="theory-list">
                        <li>Chord Construction</li>
                        <li>Chord Inversions</li>
                        <li>Common Progressions</li>
                        <li>Voice Leading</li>
                      </ul>
                    </div>
                    <div className="theory-section">
                      <h4>Rhythm & Harmony</h4>
                      <p>Explore rhythmic concepts and harmonic relationships. Discover how to create compelling grooves and maintain musical coherence.</p>
                      <ul className="theory-list">
                        <li>Time Signatures</li>
                        <li>Rhythmic Patterns</li>
                        <li>Harmonic Functions</li>
                        <li>Cadences</li>
                      </ul>
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
                      Start Learning
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
                <div className="bubble-content">
                  <div className="bubble-icon" style={{ color: '#4a90e2' }}>
                    <FaMusic className="icon" />
                  </div>
                  <span className="bubble-category" style={{ background: 'rgba(74, 144, 226, 0.2)' }}>Sound Design</span>
                  <h3 className="bubble-title">Advanced Sound Design Techniques</h3>
                  <p className="bubble-description">
                    Explore advanced sound design methods to create unique and professional sounds. From synthesis to effects processing, learn how to craft your signature sound.
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
          </section>

          <div className="bubbles-grid">
            {communityFeatures.map((feature) => (
              <motion.div
                key={feature.id}
                className="bubble"
                style={{ backgroundColor: feature.color }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
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

          <div className="community-stats">
            <div className="stat-item">
              <h3>1,234</h3>
              <p>Active Members</p>
            </div>
            <div className="stat-item">
              <h3>567</h3>
              <p>Projects Shared</p>
            </div>
            <div className="stat-item">
              <h3>89</h3>
              <p>Weekly Events</p>
            </div>
            <div className="stat-item">
              <h3>45</h3>
              <p>Active Mentors</p>
            </div>
          </div>
        </div>

        <div className="community-sidebar">
          <div className="learning-paths-section">
            <h2>Learning Paths</h2>
            <div className="learning-paths-grid">
              {learningPaths.map((path, index) => (
                <div key={index} className="learning-path-card">
                  <h3>{path.title}</h3>
                  <p>{path.description}</p>
                  <div className="topics">
                    {path.topics.map((topic, topicIndex) => (
                      <span key={topicIndex} className="topic-tag">{topic}</span>
                    ))}
                  </div>
                  <div className="duration">Duration: {path.duration}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="events-sidebar">
            <h2>Upcoming Events</h2>
            <div className="events-feed">
              {UPCOMING_EVENTS.map(event => (
                <div key={event.id} className="event-card">
                  <div className="event-icon">
                    <event.icon className="icon" />
                  </div>
                  <div className="event-content">
                    <h3>{event.title}</h3>
                    <div className="event-details">
                      <div className="event-date">
                        <span>📅</span> {event.date}
                      </div>
                      <div className="event-time">
                        <span>⏰</span> {event.time}
                      </div>
                      <div className="event-participants">
                        <span>👥</span> {event.participants} participants
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="producer-spotlight">
            <h2>Producer Spotlight</h2>
            <div className="spotlight-card">
              <div className="spotlight-header">
                <img src="https://via.placeholder.com/60" alt="Producer" className="spotlight-avatar" />
                <div className="spotlight-info">
                  <h3>Alex K.</h3>
                  <span className="spotlight-genre">Trap / Future Bass</span>
                </div>
              </div>
              <p className="spotlight-bio">Award-winning producer specializing in trap and future bass. Known for innovative sound design and complex arrangements.</p>
              <div className="spotlight-stats">
                <div className="stat">
                  <span>🎵</span> 1.2k Tracks
                </div>
                <div className="stat">
                  <span>👥</span> 45k Followers
                </div>
                <div className="stat">
                  <span>🏆</span> 12 Awards
                </div>
              </div>
            </div>
          </div>

          <div className="trending-topics">
            <h2>Trending Topics</h2>
            <div className="topics-list">
              <div className="topic-item">
                <span className="topic-icon">🎵</span>
                <div className="topic-content">
                  <h3>808 Bass Design</h3>
                  <span className="topic-posts">2.3k posts</span>
                </div>
              </div>
              <div className="topic-item">
                <span className="topic-icon">🎹</span>
                <div className="topic-content">
                  <h3>Melody Writing</h3>
                  <span className="topic-posts">1.8k posts</span>
                </div>
              </div>
              <div className="topic-item">
                <span className="topic-icon">🎚️</span>
                <div className="topic-content">
                  <h3>Mix Techniques</h3>
                  <span className="topic-posts">1.5k posts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community; 