import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiBook, FiClock, FiUsers, FiAward, FiMic } from 'react-icons/fi';
import '../styles/University.css';

const University = () => {
  const navigate = useNavigate();
  const [showBackButton, setShowBackButton] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    document.querySelector('.navbar')?.style.setProperty('display', 'none');
    
    return () => {
      document.querySelector('.navbar')?.style.setProperty('display', 'flex');
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY) {
        // Scrolling down
        setShowBackButton(false);
      } else {
        // Scrolling up
        setShowBackButton(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const courses = [
    {
      id: 1,
      title: "Music Production Basics",
      description: "Learn the fundamentals of music production and beat making",
      duration: "4 weeks",
      students: "1.2k",
      level: "Beginner",
      isStudio: false
    },
    {
      id: 2,
      title: "Advanced Sound Design",
      description: "Master advanced sound design techniques and synthesis",
      duration: "6 weeks",
      students: "800",
      level: "Advanced",
      isStudio: true
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
    } else {
      // Handle regular course click
      console.log('Course clicked:', course.title);
    }
  };

  return (
    <div className="university-page">
      <div className={`navbar university-navbar ${showBackButton ? 'visible' : 'hidden'}`}>
        <button className="nav-back-button" onClick={() => navigate('/library')}>
          <FiArrowLeft />
          <span>Back to Library</span>
        </button>
      </div>
      <button 
        className={`subtle-back-button ${showBackButton ? 'visible' : 'hidden'}`} 
        onClick={() => navigate('/library')}
      >
        <FiArrowLeft />
      </button>
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