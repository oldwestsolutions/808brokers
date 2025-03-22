import React, { useState, useEffect } from 'react';
import './Charts.css';

const Charts = () => {
  const [activeTab, setActiveTab] = useState('artists');
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [mentions, setMentions] = useState([]);
  const [newMention, setNewMention] = useState('');
  const [sortBy, setSortBy] = useState('recent'); // 'recent' or 'engaged'

  const topArtists = [
    {
      id: 1,
      name: 'Drake',
      image: '/images/artists/drake.jpg',
      followers: '98.5M',
      tracks: 245,
      rank: 1
    },
    {
      id: 2,
      name: 'Kendrick Lamar',
      image: '/images/artists/kendrick.jpg',
      followers: '45.2M',
      tracks: 156,
      rank: 2
    },
    {
      id: 3,
      name: 'Travis Scott',
      image: '/images/artists/travis.jpg',
      followers: '38.7M',
      tracks: 189,
      rank: 3
    },
    {
      id: 4,
      name: 'J. Cole',
      image: '/images/artists/jcole.jpg',
      followers: '32.1M',
      tracks: 167,
      rank: 4
    },
    {
      id: 5,
      name: 'Post Malone',
      image: '/images/artists/post.jpg',
      followers: '42.8M',
      tracks: 178,
      rank: 5
    }
  ];

  const topTracks = [
    {
      id: 1,
      title: 'Rich Flex',
      artist: 'Drake',
      image: '/images/tracks/rich-flex.jpg',
      plays: '2.5B',
      rank: 1
    },
    {
      id: 2,
      title: 'Vampire',
      artist: 'Drake',
      image: '/images/tracks/vampire.jpg',
      plays: '1.8B',
      rank: 2
    },
    {
      id: 3,
      title: 'Last Last',
      artist: 'Burna Boy',
      image: '/images/tracks/last-last.jpg',
      plays: '1.6B',
      rank: 3
    },
    {
      id: 4,
      title: 'Unholy',
      artist: 'Sam Smith',
      image: '/images/tracks/unholy.jpg',
      plays: '1.4B',
      rank: 4
    },
    {
      id: 5,
      title: 'As It Was',
      artist: 'Harry Styles',
      image: '/images/tracks/as-it-was.jpg',
      plays: '1.3B',
      rank: 5
    }
  ];

  // Simulated real-time mentions data
  const mockMentions = [
    {
      id: 1,
      artistId: 1, // Drake
      userId: 'user123',
      userName: 'ProducerX',
      content: 'Just finished a beat inspired by @Drake\'s new album! 🔥',
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      likes: 45,
      replies: 12,
      reactions: ['🔥', '🎵', '💯']
    },
    {
      id: 2,
      artistId: 1,
      userId: 'user456',
      userName: 'BeatMaker',
      content: 'Working on a remix of @Drake\'s latest track. The 808s are hitting different!',
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
      likes: 32,
      replies: 8,
      reactions: ['🎵', '💯']
    }
  ];

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      // In a real app, this would be a WebSocket connection
      setMentions(prevMentions => {
        const newMention = {
          id: Date.now(),
          artistId: 1,
          userId: 'user' + Math.floor(Math.random() * 1000),
          userName: 'Producer' + Math.floor(Math.random() * 100),
          content: `New mention about @Drake: ${Math.random().toString(36).substring(7)}`,
          timestamp: new Date(),
          likes: Math.floor(Math.random() * 50),
          replies: Math.floor(Math.random() * 20),
          reactions: ['🔥', '🎵', '💯'].slice(0, Math.floor(Math.random() * 3) + 1)
        };
        return [newMention, ...prevMentions].slice(0, 10);
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleArtistClick = (artist) => {
    setSelectedArtist(artist);
    setMentions(mockMentions.filter(m => m.artistId === artist.id));
  };

  const handleMentionSubmit = (e) => {
    e.preventDefault();
    if (!newMention.trim()) return;

    const mention = {
      id: Date.now(),
      artistId: selectedArtist.id,
      userId: 'currentUser', // Replace with actual user ID
      userName: 'You', // Replace with actual username
      content: newMention,
      timestamp: new Date(),
      likes: 0,
      replies: 0,
      reactions: []
    };

    setMentions(prev => [mention, ...prev]);
    setNewMention('');
  };

  const handleReaction = (mentionId, reaction) => {
    setMentions(prev => prev.map(mention => {
      if (mention.id === mentionId) {
        return {
          ...mention,
          reactions: [...mention.reactions, reaction]
        };
      }
      return mention;
    }));
  };

  const sortedMentions = [...mentions].sort((a, b) => {
    if (sortBy === 'recent') {
      return b.timestamp - a.timestamp;
    } else {
      return (b.likes + b.replies) - (a.likes + a.replies);
    }
  });

  return (
    <div className="charts-page">
      <div className="charts-header">
        <h1>Charts</h1>
        <p>Top Artists and Tracks on 808 Brokers</p>
      </div>

      <div className="charts-tabs">
        <button
          className={`tab-btn ${activeTab === 'artists' ? 'active' : ''}`}
          onClick={() => setActiveTab('artists')}
        >
          Top Artists
        </button>
        <button
          className={`tab-btn ${activeTab === 'tracks' ? 'active' : ''}`}
          onClick={() => setActiveTab('tracks')}
        >
          Top Tracks
        </button>
      </div>

      <div className="charts-content">
        {activeTab === 'artists' ? (
          <div className="artists-grid">
            {topArtists.map(artist => (
              <div 
                key={artist.id} 
                className={`artist-card ${selectedArtist?.id === artist.id ? 'selected' : ''}`}
                onClick={() => handleArtistClick(artist)}
              >
                <div className="rank-badge">{artist.rank}</div>
                <div className="artist-image">
                  <img src={artist.image} alt={artist.name} />
                </div>
                <div className="artist-info">
                  <h3>{artist.name}</h3>
                  <div className="artist-stats">
                    <span>{artist.followers} followers</span>
                    <span>{artist.tracks} tracks</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="tracks-grid">
            {topTracks.map(track => (
              <div key={track.id} className="track-card">
                <div className="rank-badge">{track.rank}</div>
                <div className="track-image">
                  <img src={track.image} alt={track.title} />
                  <div className="play-overlay">
                    <i className="fas fa-play"></i>
                  </div>
                </div>
                <div className="track-info">
                  <h3>{track.title}</h3>
                  <p>{track.artist}</p>
                  <span className="plays">{track.plays} plays</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedArtist && (
        <div className="mentions-section">
          <div className="mentions-header">
            <h2>Mentions for {selectedArtist.name}</h2>
            <div className="mentions-sort">
              <button
                className={`sort-btn ${sortBy === 'recent' ? 'active' : ''}`}
                onClick={() => setSortBy('recent')}
              >
                Recent
              </button>
              <button
                className={`sort-btn ${sortBy === 'engaged' ? 'active' : ''}`}
                onClick={() => setSortBy('engaged')}
              >
                Most Engaged
              </button>
            </div>
          </div>

          <form className="mention-form" onSubmit={handleMentionSubmit}>
            <input
              type="text"
              placeholder={`Mention @${selectedArtist.name}...`}
              value={newMention}
              onChange={(e) => setNewMention(e.target.value)}
            />
            <button type="submit">Post</button>
          </form>

          <div className="mentions-list">
            {sortedMentions.map(mention => (
              <div key={mention.id} className="mention-card">
                <div className="mention-header">
                  <span className="user-name">{mention.userName}</span>
                  <span className="timestamp">
                    {new Date(mention.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="mention-content">{mention.content}</p>
                <div className="mention-actions">
                  <button className="action-btn">
                    <i className="fas fa-heart"></i> {mention.likes}
                  </button>
                  <button className="action-btn">
                    <i className="fas fa-comment"></i> {mention.replies}
                  </button>
                  <div className="reactions">
                    {mention.reactions.map((reaction, index) => (
                      <span key={index} className="reaction">{reaction}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Charts; 