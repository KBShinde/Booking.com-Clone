import "./confirmation.css";
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faPerson, faSuitcaseRolling } from "@fortawesome/free-solid-svg-icons";
import { Luggage, Backpack } from '@mui/icons-material';
import { useState } from "react";

const Confirmation = () => {
  const location = useLocation();
  const {
    room,
    date = [{ startDate: new Date(), endDate: new Date() }],
    hotel,
    email,
    phone,
    travelerDetails = [],
    total
  } = location.state || {};
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Utility function to convert date to ISO string
  const convertDate = (inputDate) => {
    if (!inputDate) return '';
    const date = new Date(inputDate);
    return date.toISOString();
  };

  // Handle payment
  const payNow = async () => {
    const token = localStorage.getItem("token");

    if (!date || !date[0]) {
      setError('Invalid date information.');
      return;
    }

    try {
      const response = await fetch('https://academics.newtonschool.co/api/v1/bookingportals/booking', {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'projectID': 'f104bi07c490'
        },
        body: JSON.stringify({
          bookingType: "hotel",
          bookingDetails: {
            hotelId: hotel._id,
            startDate: convertDate(date[0].startDate),
            endDate: convertDate(date[0].endDate)
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error('Booking failed. Please try again.');
      }

      navigate("/my_trips");

    } catch (error) {
      console.error('Caught Error:', error);
      setError(error.message);
    }
  };

  return (
    <div className='confirm-page'>
      {error && <div className="error-message">{error}</div>} {/* Display error message */}

      <div className='confirm-contact'>
        <h2>Contact Details</h2>
        <p>+{phone}</p>
        <p className="confirm-email">{email}</p>
      </div>
      <div className="confirm-total">
        <div className="ticket-total">
          <h3>Total</h3>
          <h3>₹ {total}.00</h3>
        </div>
        <p>Includes taxes and charges</p>
      </div>

      <div className='confirm-traveller'>
        <h2>Traveller Details</h2>
        {travelerDetails.map((traveler, index) => (
          <div key={index} className="traveler-detail">
            <p><FontAwesomeIcon icon={faPerson} /> {traveler.firstName} {traveler.lastName}</p>
            <p className="confirm-email">Adult - {traveler.gender}</p>
          </div>
        ))}
      </div>
      <div className="confirm-baggage">
        <h2>Baggage</h2>
        <p>Total number of bags included for traveller</p>
        <div className='confirm-hotel'>
          <h4>Booking at {hotel.name}, in {hotel.location}</h4>
          <p>Room type - {room.roomType} room</p>
        </div>
        <div className='confirm-bags'>
          <div className='confirm-bag'>
            <Backpack className="icon" style={{ fontSize: '18px', color: '#333' }} />
            <label>1 personal item</label>
            <p>Fits under the seats in front of you</p>
          </div>
          <div className='confirm-bag'>
            <FontAwesomeIcon icon={faSuitcaseRolling} size='1.5x' className="icon" />
            <label>1 cabin bag</label>
            <p>25 × 35 × 55 cm Up to 8 kg</p>
          </div>
          <div className='confirm-bag'>
            <Luggage className="icon" style={{ fontSize: '20px', color: '#333' }} />
            <label>1 checked bag</label>
            <p>Up to 20 kg</p>
          </div>
        </div>
      </div>

      <div className="confirm-payment">
        <div className="pay-heading">
          <h2>Your Payment</h2>
          <p>Simple, safe and secure</p>
        </div>
        <div className="confirm-card">
          <h4>How would you like to pay?</h4>
          <div className="debit-cards">
            <img src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTkmURy2iozkcpb3qQ9KV7glYz5iqrGRr0MmcRkI8DCRcv8Sgng" alt="Credit Card" />
            <p>Card holder's name</p>
            <input placeholder={travelerDetails[0]?.firstName} readOnly />
            <p>Card number</p>
            <input readOnly className="card-input" />
            <div className="card-info">
              <div>
                <p>Expiry date</p>
                <input placeholder="MM/YY" readOnly />
              </div>
              <div>
                <p>CVV</p>
                <input readOnly />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="buttons-pay">
        <button className="prev-button" onClick={() => navigate(-1)}>Back</button>
        <button className="pay-button" onClick={payNow}><FontAwesomeIcon icon={faLock} /> Pay now</button>
      </div>
    </div>
  );
};

export default Confirmation;
