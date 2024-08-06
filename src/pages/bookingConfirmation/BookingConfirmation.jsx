import "./bookingConfirmation.css";
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faPerson, faSuitcaseRolling } from "@fortawesome/free-solid-svg-icons";
import { Luggage, Backpack } from '@mui/icons-material';
import { useState } from "react";

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    flight = {},
    day = '',
    formattedDate = '',
    email = '',
    phone = '',
    travelerDetails = [], 
    total = 0,
    startDate = '',
  } = location.state || {};
  console.log("traveller details :", travelerDetails)

  const [error, setError] = useState("");

  const payNow = async () => {
    let token = localStorage.getItem("token");

    const convertDate = (inputDate, end) => {
      let date = new Date(inputDate);
      if (end) {
        date = new Date(date.getTime() + (4 * 60 * 60 * 1000));
      }
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, '0');
      const day = String(date.getUTCDate()).padStart(2, '0');
      const hours = String(date.getUTCHours()).padStart(2, '0');
      const minutes = String(date.getUTCMinutes()).padStart(2, '0');
      const seconds = String(date.getUTCSeconds()).padStart(2, '0');
      const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');

      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}+00:00`;
    }

    try {
      const response = await fetch('https://academics.newtonschool.co/api/v1/bookingportals/booking', {
        method: 'POST',
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'projectID': 'f104bi07c490'
        },
        body: JSON.stringify({
          "bookingType": "flight",
          "bookingDetails": {
            "flightId": flight._id,
            "startDate": convertDate(startDate, false),
            "endDate": convertDate(startDate, true)
          }
        })
      });

      if (!response.ok) {
        throw new Error('Booking failed. Please try again.');
      }

      navigate("/my_trips", {
        state: {
          flight,
          day,
          formattedDate,
          email,
          phone,
          travelerDetails, 
          total,
          startDate
        }
      });
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className='booking-confirmation-page'>
      
      <div className='booking-confirmation-contact'>
        <h2>Contact details</h2>
        <p>+{phone}</p>
        <p className="booking-confirmation-email">{email}</p>
      </div>

      <div className="booking-confirmation-total">
        <div className="booking-ticket-total">
          <h3>Total :</h3>
          <h3>₹ {total}.00</h3>
        </div>
        <p>Includes taxes and charges</p>
      </div>

      <div className='booking-confirmation-traveller'>
        <h2>Traveller details</h2>
        {travelerDetails.length > 0 ? (
          travelerDetails.map((traveler, index) => (
            <div key={index}>
              <p><FontAwesomeIcon icon={faPerson} /> {traveler.firstName} {traveler.lastName}</p>
              <p className="booking-confirmation-email">Adult - {traveler.gender}</p>
            </div>
          ))
        ) : (
          <p>No traveler details available</p>
        )}
      </div>

      <div className="booking-confirmation-baggage">
        <h2>Baggage</h2>
        <p>Total numbers of bags included for traveller</p>
        <h4>Flight to {flight.destination}</h4>

        <div className='booking-confirmation-bags'>
          <div className='booking-confirmation-bag'>
            <Backpack className="bag-icon" style={{ fontSize: '18px', color: '#333' }} />
            <label>1 personal item</label>
            <p>Fits under the seats in front of you</p>
          </div>
          <div className='booking-confirmation-bag'>
            <FontAwesomeIcon icon={faSuitcaseRolling} size='1.5x' className="bag-icon" />
            <label>1 cabin bag</label>
            <p>25 × 35 × 55 cm Up to 8 kg</p>
          </div>
          <div className='booking-confirmation-bag'>
            <Luggage className="bag-icon" style={{ fontSize: '20px', color: '#333' }} />
            <label>1 checked bag</label>
            <p>Up to 20 kg</p>
          </div>
        </div>
      </div>

      <div className="booking-confirmation-payment">
        <div className="payment-heading">
          <h2>Your payment</h2>
          <p>Simple, safe and secure</p>
        </div>
        <div className="booking-confirmation-card">
          <h4>How would you like to pay?</h4>
          <div className="payment-cards">
            <img src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTkmURy2iozkcpb3qQ9KV7glYz5iqrGRr0MmcRkI8DCRcv8Sgng" alt="Card" />
            <p>Card holder's name</p>
            <input placeholder={travelerDetails[0]?.firstName || ''} readOnly />
            <p>Card number</p>
            {/* <FontAwesomeIcon icon={faCreditCard} className="card-icon" /> */}
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

      <div className="booking-buttons-pay">
        <button className="booking-prev-button" onClick={() => navigate(-1)}>Back</button>
        <button className="booking-pay-button" onClick={payNow}><FontAwesomeIcon icon={faLock} /> Pay now</button>
      </div>
      
      {error && <p className="booking-error-message">{error}</p>}
    </div>
  );
}

export default BookingConfirmation;
