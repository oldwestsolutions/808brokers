import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Community.css';

const UPCOMING_EVENTS = [
  {
    id: 'event1',
    title: 'Virtual Beat Battle',
    date: 'March 25, 2024',
    time: '8:00 PM EST',
    participants: 128,
    icon: '🎵'
  },
  {
    id: 'event2',
    title: 'Sound Design Workshop',
    date: 'March 28, 2024',
    time: '6:00 PM EST',
    participants: 64,
    icon: '🎹'
  },
  {
    id: 'event3',
    title: 'Producer Meet & Greet',
    date: 'April 1, 2024',
    time: '7:00 PM EST',
    participants: 256,
    icon: '👥'
  },
  {
    id: 'event4',
    title: 'Mixing Masterclass',
    date: 'April 5, 2024',
    time: '5:00 PM EST',
    participants: 96,
    icon: '🎚️'
  }
];

const Community = () => {
  const [activeBubble, setActiveBubble] = useState(null);
  const [collabStatus, setCollabStatus] = useState('browse'); // 'browse', 'create', 'join'
  const [projectType, setProjectType] = useState(''); // 'beat', 'remix', 'original'
  const [skillLevel, setSkillLevel] = useState(''); // 'beginner', 'intermediate', 'advanced'
  const [challengeStatus, setChallengeStatus] = useState('current'); // 'current', 'upcoming', 'past'
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  const communityFeatures = [
    {
      id: 'collaboration',
      title: 'Collaboration Hub',
      description: 'Connect with other producers, share projects, and work together on tracks. Our collaboration hub provides real-time project sharing, version control, and seamless communication tools to help you create amazing music together.',
      icon: '🤝',
      color: '#FF6B6B',
      quickLinks: ['Find Collaborators', 'Project Sharing', 'Real-time Jamming'],
      details: {
        features: [
          'Real-time project synchronization',
          'Built-in chat and voice communication',
          'Project version history',
          'Collaborative mixing tools',
          'Talent matching algorithm',
          'Project templates',
          'Feedback system',
          'Progress tracking'
        ],
        stats: {
          activeProjects: '2,345',
          successfulCollabs: '1,234',
          averageProjectTime: '2 weeks',
          activeUsers: '5,678',
          totalProjects: '8,901',
          averageRating: '4.8/5'
        },
        collaborationTools: {
          projectTypes: [
            { id: 'beat', name: 'Beat Making', icon: '🎵', description: 'Create and share beats with other producers' },
            { id: 'remix', name: 'Remix Project', icon: '🔄', description: 'Collaborate on remixing existing tracks' },
            { id: 'original', name: 'Original Track', icon: '🎼', description: 'Work together on original compositions' },
            { id: 'sound', name: 'Sound Design', icon: '🎹', description: 'Create and share unique sounds' },
            { id: 'mix', name: 'Mixing Project', icon: '🎚️', description: 'Collaborate on mixing and mastering' },
            { id: 'arrange', name: 'Arrangement', icon: '🎸', description: 'Work on track arrangement and structure' }
          ],
          skillLevels: [
            { id: 'beginner', name: 'Beginner', icon: '🌱', description: 'Just starting out with music production' },
            { id: 'intermediate', name: 'Intermediate', icon: '🌿', description: 'Some experience with production' },
            { id: 'advanced', name: 'Advanced', icon: '🌳', description: 'Experienced producer looking to collaborate' }
          ],
          activeProjects: [
            {
              id: 'proj1',
              title: 'Trap Beat Collab',
              creator: 'Alex K.',
              genre: 'Trap',
              status: 'Looking for Producer',
              participants: 1,
              maxParticipants: 2,
              description: 'Looking for a producer to help create a trap beat with unique 808 patterns',
              skills: ['Beat Making', 'Sound Design'],
              deadline: '2 weeks',
              rating: 4.8
            },
            {
              id: 'proj2',
              title: 'House Remix',
              creator: 'Sarah M.',
              genre: 'House',
              status: 'In Progress',
              participants: 3,
              maxParticipants: 4,
              description: 'Working on a house remix of a popular track, need help with arrangement',
              skills: ['Remixing', 'Arrangement'],
              deadline: '1 week',
              rating: 4.9
            },
            {
              id: 'proj3',
              title: 'Sound Design Workshop',
              maxParticipants: 4
            }
          ]
        }
      }
    },
    {
      id: 'challenges',
      title: 'Weekly Challenges',
      description: 'Participate in themed production challenges. Push your creative boundaries and compete with other producers in our weekly challenges.',
      icon: '🏆',
      color: '#FFEEAD',
      quickLinks: ['Current Challenge', 'Past Winners', 'Leaderboard'],
      details: {
        features: [
          'Weekly themed challenges',
          'Community voting system',
          'Prize pool',
          'Expert judging panel',
          'Challenge archives'
        ],
        stats: {
          activeParticipants: '1,000+',
          totalChallenges: '52+',
          prizePool: '$10,000+'
        }
      }
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
      title: 'The Art of Sound Design: Creating Unique Bass Sounds',
      description: 'Learn how to create distinctive bass sounds that will make your tracks stand out in the mix. Discover advanced techniques for shaping and processing bass frequencies.',
      icon: '🎸',
      color: '#9B59B6',
      quickLinks: ['Read Full Article', 'Related Tutorials', 'Sound Examples']
    },
    {
      id: 'article2',
      title: 'Mixing Techniques for Professional Producers',
      description: 'Discover advanced mixing techniques used by top producers to achieve that professional sound. Learn about EQ, compression, and spatial effects.',
      icon: '🎚️',
      color: '#3498DB',
      quickLinks: ['Read Full Article', 'Mix Examples', 'Pro Tips']
    },
    {
      id: 'article3',
      title: 'The Future of Music Production: AI and Creativity',
      description: 'Explore how artificial intelligence is shaping the future of music production and creativity. Understand the impact of AI tools on the industry.',
      icon: '🤖',
      color: '#E67E22',
      quickLinks: ['Read Full Article', 'AI Tools', 'Industry Trends']
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
    <div className="community-container">
      <div className="community-main">
        <h1 className="community-title">808 Brokers Community</h1>
        <p className="community-subtitle">Connect, Create, and Collaborate with Fellow Producers</p>
        
        <div className="featured-articles-section">
          <h2>Featured Articles</h2>
          <div className="articles-grid">
            {featuredArticles.map(article => (
              <motion.div
                key={article.id}
                className="article-card"
                style={{ backgroundColor: article.color }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="article-icon">{article.icon}</div>
                <h3 className="article-title">{article.title}</h3>
                <p className="article-description">
                  {article.description}
                </p>
                <div className="article-links">
                  {article.quickLinks.map((link, index) => (
                    <a key={index} href="#" className="article-link">{link}</a>
                  ))}
                </div>
              </motion.div>
            ))}
              </div>
                      </div>

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
                {feature.id === 'collaboration' ? (
                  renderCollaborationTools()
                ) : feature.id === 'challenges' ? (
                  renderChallengeTools()
                ) : (
                  <>
                    <div className="features-list">
                      <h4>Key Features</h4>
                      <ul>
                        {feature.details.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="feature-stats">
                      <h4>Statistics</h4>
                      <div className="stats-grid">
                        {Object.entries(feature.details.stats).map(([key, value]) => (
                          <div key={key} className="stat-item">
                            <span className="stat-value">{value}</span>
                            <span className="stat-label">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="quick-links">
                      {feature.quickLinks.map((link, index) => (
                        <a key={index} href="#" className="quick-link">{link}</a>
                      ))}
                  </div>
                  </>
                )}
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
                <div className="event-icon">{event.icon}</div>
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
      </div>
    </div>
  );
};

export default Community; 