import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const EventContext = createContext();

export const useEvent = () => {
  return useContext(EventContext);
};

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEvents = async () => {
      const storedEvents = localStorage.getItem('events');
      
      if (storedEvents) {
        setEvents(JSON.parse(storedEvents));  
        setLoading(false);
      } else {
        try {
          const response = await axios.get('/Data.json');
          const fetchedEvents = response.data.events;
          setEvents(fetchedEvents);  
          localStorage.setItem('events', JSON.stringify(fetchedEvents));  
          setLoading(false);
        } catch (error) {
          setError('Failed to fetch events');
          setLoading(false);
        }
      }
    };

    loadEvents();
  }, []);

  const bookTicket = (eventId) => {
    try {
      const event = events.find((event) => event.id === eventId);
  
      if (event && event.seatAvailable > 0) {
        const updatedEvent = { ...event, seatAvailable: event.seatAvailable - 1 };
  
        const updatedEvents = events.map((e) =>
          e.id === eventId ? updatedEvent : e
        );
        setEvents(updatedEvents);  

        localStorage.setItem('events', JSON.stringify(updatedEvents));
        
        return true;  
      } else {
        return false; 
      }
    } catch (error) {
      console.error('Error booking ticket:', error);
      return false;  
    }
  };

  return (
    <EventContext.Provider value={{ events, loading, error, bookTicket }}>
      {children}
    </EventContext.Provider>
  );
};
