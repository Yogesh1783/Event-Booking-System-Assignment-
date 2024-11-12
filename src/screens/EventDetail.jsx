import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEvent } from '../context/EventContext';
import Button from './../components/DesigningComponent/Button';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, bookTicket } = useEvent();

  const [event, setEvent] = useState(null);

  useEffect(() => {
    const selectedEvent = events.find((event) => event.id === parseInt(id));
    if (selectedEvent) {
      setEvent(selectedEvent);
    } else {
      navigate('/');
    }
  }, [id, events, navigate]);

  const handleBookTicket = async () => {
    const isBooked = await bookTicket(event.id);
    if (isBooked) {
      alert('Ticket booked successfully!');
    } else {
      alert('This event is fully booked!');
    }
  };

  return (
    <div style={{ padding: '16px', border: '1px solid #007bff', backgroundColor: '#f0f8ff' }}>
      {event ? (
        <>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <p>Seats Available: {event.seatAvailable}</p>
          <Button
            text={event.seatAvailable > 0 ? 'Book Ticket' : 'Fully Booked'}
            onClick={handleBookTicket}
            disabled={event.seatAvailable === 0}
          />
        </>
      ) : (
        <p>Loading event details...</p>
      )}
    </div>
  );
};

export default EventDetail;
