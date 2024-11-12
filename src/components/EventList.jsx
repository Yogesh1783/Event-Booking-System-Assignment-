import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEvent } from '../context/EventContext';
import EventCard from './EventCard';
import './EventList.css';

const EventList = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const { events, loading, error } = useEvent();

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    const filtered = events.filter((event) => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'All' || event.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
    setFilteredEvents(filtered);
  }, [searchTerm, categoryFilter, events]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setCategoryFilter('All');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleViewDetails = (eventId) => {
    if (!user) {
      navigate('/login');
    } else {
      navigate(`/event/${eventId}`);
    }
  };

  if (loading) {
    return <p>Loading events...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <div className="head">
        <h2>Upcoming Events</h2>
      </div>
      <div className="item">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
      </div>

      <div className="user-actions">
        {user ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <button className="register-btn" onClick={handleRegisterClick}>Register</button>
        )}
      </div>

      <div className="reset-filters-btn">
        <button onClick={handleResetFilters}>Reset Filters</button>
      </div>
      
      <div className="event">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} onViewDetails={() => handleViewDetails(event.id)} />
          ))
        ) : (
          <p>No events found.</p>
        )}
      </div>
    </>
  );
};

export default EventList;
