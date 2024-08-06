import { faPlaneDeparture, faBackpack, faSuitcaseRolling } from '@fortawesome/free-solid-svg-icons';
import './ticketDetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Luggage, BusinessCenter, Backpack, Login } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const TicketDetails = ({ flight, day, formattedDate, startDate, options }) => {
  const navigate = useNavigate();
  const adults = options.adult;

  const handleSelect = () => {
    let isLoggedIn = localStorage.getItem("LoggedIn");
    if ((isLoggedIn !== undefined && isLoggedIn !== null) && isLoggedIn) {
      navigate("/fill_the_details", {
        state: {
          flight: flight,
          day: day,
          formattedDate: formattedDate,
          startDate: startDate,
          airline: flight.airline, 
          options,
          adults
        }
      });
    } else {
      navigate("/login");
    }
  }
  

  return (
    <div className='details-container'>
      <h3>Your flight to {flight.destination}</h3>
      <div className="dest-details">
        <h4>Flight to {flight.destination}</h4>
        <p>Direct, {flight.duration} hours</p>
      </div>
      <div className='page-mid'>
        <div>
          <div className='departure-time-details'>
            <p>{day} {formattedDate} {flight.departureTime}</p>
            <h4>{flight.source}</h4>
          </div>
          <div className='departure-time-details'>
            <p>{day} {formattedDate} {flight.arrivalTime}</p>
            <h4>{flight.destination}</h4>
          </div>
        </div>
        <div className='flight-detail'>
          <div className='ailines-detail'>
            <img src={flight.airline.logo} alt={flight.airline.name} className="airline-logo" />
            <h4>{flight.airline.name} Airlines</h4>
          </div>
          <p>{flight.flightID} Economy</p>
          <p>Flight time: {flight.duration} hours</p>
        </div>
      </div>
      <div className='baggage-detail'>
        <div className='baggage-left'>
          <h4>Included baggage</h4>
          <p>The total baggage included in the price</p>
        </div>
        <div className='baggage-right'>
          <div className='bags-icons'>
            <Backpack className="right-i" style={{ fontSize: '18px', color: '#333' }} />
            <label>1 personal item</label>
            <p>Fits under the seat in front of you</p>
          </div>
          <div className='bags-icons'>
            <FontAwesomeIcon icon={faSuitcaseRolling} size='1.5x' className="right-i" />
            <label>1 cabin bag</label>
            <p>25 × 35 × 55 cm, up to 8 kg</p>
          </div>
          <div className='bags-icons'>
            <Luggage className="right-i" style={{ fontSize: '20px', color: '#333' }} />
            <label>1 checked bag</label>
            <p>Up to 20 kg</p>
          </div>
        </div>
      </div>
      <div className='price-detail'>
        <div className='price-amount'>
          <h2>₹ {flight.ticketPrice * adults}.00</h2>
          <p>Total price for all travellers</p>
        </div>
        <button onClick={handleSelect}>Select</button>
      </div>
    </div>
  );
}

export default TicketDetails;
