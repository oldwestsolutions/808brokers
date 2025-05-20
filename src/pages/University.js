import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiBook, FiClock, FiUsers, FiAward, FiMic } from 'react-icons/fi';
import '../styles/University.css';

const University = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.querySelector('.navbar')?.style.setProperty('display', 'none');
    
    return () => {
      document.querySelector('.navbar')?.style.setProperty('display', 'flex');
    };
  }, []);

  const courses = [
    {
      id: 1,
      title: 'Music Theory Fundamentals',
      description: 'Learn the basics of music theory, including scales, chords, and progressions.',
      duration: '4 weeks',
      students: 1234,
      level: 'Beginner'
    },
    {
      id: 2,
      title: 'Advanced Production Techniques',
      description: 'Master advanced production techniques used by professional producers.',
      duration: '6 weeks',
      students: 856,
      level: 'Advanced'
    },
    {
      id: 3,
      title: 'Mixing and Mastering',
      description: 'Learn professional mixing and mastering techniques for your tracks.',
      duration: '5 weeks',
      students: 1023,
      level: 'Intermediate'
    },
    {
      id: 4,
      title: 'Studio',
      description: 'Access our professional recording studio and production tools.',
      duration: '24/7',
      students: 2500,
      level: 'All Levels',
      isStudio: true
    }
  ];

  const handleCourseClick = (course) => {
    if (course.isStudio) {
      navigate('/dashboard/studio');
    }
  };

  return (
    <div className="university-page">
      <div className="university-header">
        <button className="back-button" onClick={() => navigate('/library')}>
          <FiArrowLeft />
          Back to Library
        </button>
        <h1>University</h1>
      </div>

      <div className="university-stats">
        <div className="stat-card">
          <div className="stat-header">
            <FiBook className="stat-icon" />
            <h3>Courses Available</h3>
          </div>
          <div className="stat-content">
            <span className="stat-value">12</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-header">
            <FiUsers className="stat-icon" />
            <h3>Active Students</h3>
          </div>
          <div className="stat-content">
            <span className="stat-value">3,456</span>
          </div>
        </div>
      </div>

      <div className="university-content">
        <div className="course-list">
          {courses.map(course => (
            <div 
              key={course.id} 
              className={`course-item ${course.isStudio ? 'studio-card' : ''}`}
              onClick={() => handleCourseClick(course)}
            >
              <div className="course-icon">
                {course.isStudio ? <FiMic /> : <FiBook />}
              </div>
              <div className="course-info">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <div className="course-meta">
                  <span><FiClock /> {course.duration}</span>
                  <span><FiUsers /> {course.students} students</span>
                  <span><FiAward /> {course.level}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default University; 