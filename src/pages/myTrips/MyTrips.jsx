import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHotel, faPlane, faTimes, faCalendarDay, faCalendarAlt, faIndianRupeeSign, faKey, faChair } from '@fortawesome/free-solid-svg-icons';
import './myTrips.css';

const airlineMapping = {
  '6E001': { name: 'Indigo', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7AfBfjkvUsX9cQ10mjjE34B1Fy5VXnyQl88V91EBSzs-E9RNp' },
  'UK001': { name: 'Vistara', logo: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTfwV66jeFCjtjgQcZit-0AgqewDs1diyD_talTohXg8MIExmOC' },
  'AI001': { name: 'Air India', logo: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSFQi6DtLy_UjMDa9u-xXhRtf4-x8dlyK58zhyJIKHE4eF2ctYy' },
  'SG001': { name: 'Spice Jet', logo: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS3xUFRdnQQnSVTZbv8GNjMeRI16c9pvGKSAEFGrkwbkNNVyfIQ' },
  'G801-': { name: 'Go First', logo: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT9GAjPKjqRBusMX6pLMD3Xjp21COIhxXZ612gqIKdze4Kwt6gW' },
};

const MyTrips = () => {
  const [activeTab, setActiveTab] = useState('hotels');
  const [trips, setTrips] = useState([]); // Initialize as an empty array
  const [isCancellationModalVisible, setIsCancellationModalVisible] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);
  const [refundAmount, setRefundAmount] = useState(0);

  let token = localStorage.getItem("token");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/bookingportals/booking/`,
        {
          method: "GET",
          headers: {
            projectID: "f104bi07c490",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const jsonData = await response.json();
      setTrips(jsonData.data || []);
    } catch (error) {
      console.error(error.message);
    }
  };

  const cancelBooking = async () => {
    const currentTime = new Date();
    const bookingTime = new Date(bookingToCancel.start_date);
    const timeDifference = (bookingTime - currentTime) / (1000 * 60 * 60); // difference in hours

    // if (timeDifference <= 5) {
    //   alert('Cannot cancel the booking within 5 hours of the start time.');
    //   setIsCancellationModalVisible(false);
    //   return;
    // }

    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/bookingportals/booking/${bookingToCancel._id}`,
        {
          method: "DELETE",
          headers: {
            projectID: "f104bi07c490",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to cancel booking");
      }

      setTrips(trips.filter(trip => trip._id !== bookingToCancel._id));
      setIsCancellationModalVisible(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  const confirmCancelBooking = (trip) => {
    setBookingToCancel(trip);
    const actualPrice = trip.booking_type === 'hotel' ? trip.hotel.rooms[0].costPerNight : trip.flight.ticketPrice;
    const refund = (actualPrice * 0.8).toFixed(2); 
    setRefundAmount(refund);
    setIsCancellationModalVisible(true);
  };
  

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
    });
  };

  const renderBookings = (type) => {
    const filteredTrips = trips.filter((trip) => trip.booking_type === type);

    const currentDate = new Date();
    const isExpired = (trip) => new Date(trip.end_date) < currentDate;
    const isToday = (trip) => new Date(trip.start_date).toDateString() === currentDate.toDateString();

    if (filteredTrips.length === 0) {
      return (
        <div className="no-bookings-message">
          <FontAwesomeIcon icon={type === 'flight' ? faPlane : faHotel} className="no-bookings-icon" />
          <div className="no-bookings-text">You have no upcoming bookings at the moment ...</div>
        </div>
      );
    }

    return filteredTrips.map((trip) => {
      const tripStatus = isExpired(trip) ? 'Expired' : trip.status;
      const tripSuggestions = isToday(trip) ? "Don't forget to pack essentials!" : "";

      const airlineInfo = trip.booking_type === 'flight' ? airlineMapping[trip.flight.flightID.slice(0, 5)] : null;

      return (
        <div key={trip._id} className="booking-item">
          <div className="booking-header">
            <FontAwesomeIcon icon={trip.booking_type === 'flight' ? faPlane : faHotel} className="booking-icon" />
            <h3 className="booking-title">
              Hi {trip.user.name}, See What's Next on Your Travel Agenda!
            </h3>
          </div>
          {trip.booking_type === 'flight' && airlineInfo && (
            <div className="airline-info-trip">
              <img src={airlineInfo.logo} alt={airlineInfo.name} className="airline-logo-trip" />
              <h4>{airlineInfo.name} Airlines</h4>
            </div>
          )}
          <h4 className="booking-name">
            {trip.booking_type === 'hotel' ? `Hotel ${trip.hotel?.name}` : `${trip.flight?.source} to ${trip.flight?.destination}`}
          </h4>
          <p className="booking-location">
            {trip.hotel?.location || `${trip.flight?.departureTime} to ${trip.flight?.arrivalTime}`}
          </p>
          <p className="booking-status">
            <FontAwesomeIcon icon={faCalendarDay} className="status-icon" /> Status: {tripStatus}
          </p>
          <p className="booking-date">
            <FontAwesomeIcon icon={faCalendarAlt} className="date-icon" />
            {trip.booking_type === 'hotel' ? `Check-In-Date : ${formatDate(trip.start_date)} ` : `Date: ${formatDate(trip.start_date)}`}
          </p>
          {trip.booking_type === 'hotel' && (
            <p className="booking-end-date">
              <FontAwesomeIcon icon={faCalendarAlt} className="date-icon" />
              Check-Out-Date : {formatDate(trip.end_date)}
            </p>
          )}
          <p className="booking-price">
            {trip.booking_type === 'hotel'
              ? <><FontAwesomeIcon icon={faIndianRupeeSign} className="price-icon" /> Room Charges: ₹ {trip.hotel.rooms[0].costPerNight}.00  / Per Room</>
              : <><FontAwesomeIcon icon={faIndianRupeeSign} className="price-icon" /> Ticket Price: ₹ {trip.flight.ticketPrice}.00  / Per Person</>
            }
          </p>
          <p className="booking-price">
            {trip.booking_type === 'hotel'
              ? <><FontAwesomeIcon icon={faKey} className="price-icon" /> Room Type: {trip.hotel.rooms[0].roomType} room </>
              : <> <FontAwesomeIcon icon={faChair} className="price-icon" /> Seat Number: AA7452</>
            }
          </p>
          {tripSuggestions && <p className="trip-suggestions">{tripSuggestions}</p>}
          <button
            className="cancel-button"
            onClick={(e) => { e.stopPropagation(); confirmCancelBooking(trip); }}
          >
            <FontAwesomeIcon icon={faTimes} className="cancel-icon" /> Cancel Booking
          </button>
        </div>
      );
    });
  };

  return (
    <div className="my-trips-container">
      <div className="tabs">
        <div
          className={`tab ${activeTab === 'hotels' ? 'active' : ''}`}
          onClick={() => setActiveTab('hotels')}
        >
          Hotels
        </div>
        <div
          className={`tab ${activeTab === 'flights' ? 'active' : ''}`}
          onClick={() => setActiveTab('flights')}
        >
          Flights
        </div>
      </div>

      <div className="tab-content">
        {activeTab === 'hotels' && renderBookings('hotel')}
        {activeTab === 'flights' && renderBookings('flight')}
      </div>

      {isCancellationModalVisible && (
        <div className="cancellation-modal">
          <div className="modal-content">
            <h3>Confirm Cancellation</h3>
            <p>Are you sure you want to cancel this booking?</p>
            <p>Refund Amount: ₹ {refundAmount} </p>
            <button onClick={cancelBooking}>Yes, Cancel</button>
            <button onClick={() => setIsCancellationModalVisible(false)}>No, Keep Booking</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTrips;
