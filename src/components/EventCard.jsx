import React from 'react';
import { Link } from 'react-router-dom';
import './EventCard.css';
import Button from './DesigningComponent/Button';

const EventCard = ({ event }) => {
    console.log(event); 
    return (
      <div className='btn-1'>
        <h3>{event.title}</h3>
        <p>{event.description}</p>
        <Link to={`/event/${event.id}`}>
          <Button className="view-details-button" text="View Details" />
        </Link>
      </div>
    );
};

export default EventCard;
