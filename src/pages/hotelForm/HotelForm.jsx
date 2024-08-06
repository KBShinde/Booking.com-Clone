import "./hotelForm.css";
import React, { useState, useEffect } from 'react';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import { useLocation, useNavigate } from "react-router-dom";

const HotelForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    hotel,
    room,
    date,
    options,
    adults = options.adult
  } = location.state || {};

  const tax = room.costDetails.taxesAndFees;
  const total = parseInt(room.costDetails.baseCost) + tax;

  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [travelerDetails, setTravelerDetails] = useState(Array(adults).fill({ firstName: '', lastName: '', gender: '' }));
  const [currentTraveler, setCurrentTraveler] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setTravelerDetails(Array.from({ length: adults }, () => ({ firstName: '', lastName: '', gender: '' })));
    setCurrentTraveler(0);
  }, [adults]);
  console.log("date :", date)
  

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!email.includes('@')) {
      newErrors.email = "Email must include '@'";
    }

    if (!phone) {
      newErrors.phone = "Phone number is required";
    } else if (phone.replace(/\D/g, '').length !== 12) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!travelerDetails[currentTraveler].firstName) newErrors[`firstName_${currentTraveler}`] = "First name is required";
    if (!travelerDetails[currentTraveler].lastName) newErrors[`lastName_${currentTraveler}`] = "Last name is required";
    if (!travelerDetails[currentTraveler].gender) newErrors[`gender_${currentTraveler}`] = "Gender is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTravelerDetailChange = (field, value) => {
    const updatedDetails = [...travelerDetails];
    updatedDetails[currentTraveler][field] = value;
    setTravelerDetails(updatedDetails);
  };
  console.log('Traveler Details on Update:', travelerDetails);
  

  const handleSelect = (value) => {
    handleTravelerDetailChange('gender', value);
    setShowOptions(false);
  };

  const handleBack = () => {
    navigate("/hotels/select");
  };

  const handleNext = () => {
    if (validateForm()) {
      if (currentTraveler < adults - 1) {
        setCurrentTraveler(prevTraveler => prevTraveler + 1);
      } else {
        navigate("/confirmation", {
          state: {
            hotel,
            room,
            date, 
            email,
            phone,
            travelerDetails,
            total
          }
        });
      }
    }
  };
  

  return (
    <div className="details-form">
      <div className="details-container">
        <h2>Fill in your details</h2>
        <h5 className="details-container-p">View details</h5>
        <div className="contact-info">
          <h3>Contact details</h3>
          <div className="email">
            <h5>Contact email</h5>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            {errors.email && <p className="error">{errors.email}</p>}
            <p>We'll send your booking confirmation here</p>
          </div>
          <div className="phone">
            <h5>Phone number</h5>
            <PhoneInput
              containerStyle={{
                marginLeft: '10px',
              }}
              country={'in'}
              value={phone}
              onChange={(phone) => setPhone(phone)}
            />
            {errors.phone && <p className="error">{errors.phone}</p>}
          </div>
        </div>
        <div className="traveller-info">
          <h3>Traveller {currentTraveler + 1} details</h3>
          {travelerDetails.map((traveler, index) => (
            index === currentTraveler && (
              <div key={index} className="traveller-form">
                <div className="input-names">
                  <div>
                    <h5>First name</h5>
                    <input
                      className='first-name'
                      type="text"
                      value={traveler.firstName}
                      onChange={(e) => handleTravelerDetailChange('firstName', e.target.value)}
                      placeholder="Enter first name"
                    />
                    {errors[`firstName_${currentTraveler}`] && <p className="error">{errors[`firstName_${currentTraveler}`]}</p>}
                  </div>
                  <div>
                    <h5>Last name</h5>
                    <input
                      className='last-name'
                      type="text"
                      value={traveler.lastName}
                      onChange={(e) => handleTravelerDetailChange('lastName', e.target.value)}
                      placeholder="Enter last name"
                    />
                    {errors[`lastName_${currentTraveler}`] && <p className="error">{errors[`lastName_${currentTraveler}`]}</p>}
                  </div>
                </div>
                <div className="gender-info" style={{ position: 'relative' }}>
                  <h5>Gender</h5>
                  <input
                    className="gender"
                    type="text"
                    value={traveler.gender}
                    readOnly
                    placeholder="Select Gender"
                    onClick={() => setShowOptions(!showOptions)}
                    style={{
                      padding: '5px',
                      fontSize: '16px',
                      flexGrow: 1,
                      marginRight: '10px',
                      marginTop: '-20px',
                      position: 'relative',
                      cursor: 'pointer',
                      border: '1px solid rgb(190, 188, 188)',
                    }}
                  />
                  {errors[`gender_${currentTraveler}`] && <p className="error">{errors[`gender_${currentTraveler}`]}</p>}
                  <p className="gender-p">We're currently required by hotels and providers to ask for this information</p>
                  {showOptions && (
                    <select
                      onChange={(e) => handleSelect(e.target.value)}
                      onBlur={() => setShowOptions(false)}
                      style={{
                        position: 'absolute',
                        top: '30px',
                        left: 150,
                        padding: '5px',
                        fontSize: '16px',
                        border: 'none',
                        height: '30px',
                        zIndex: 1,
                      }}
                    >
                      <option value=""> </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  )}
                </div>
              </div>
            )
          ))}
          <div className="buttons">
            <button className="back" onClick={handleBack}>Back</button>
            <button className="next" onClick={handleNext}>
              {currentTraveler < adults - 1 ? 'Next' : 'Submit'}
            </button>
          </div>
        </div>
      </div>
      <div className="ticket-info">
         <div className="hotel-form">
          {/* <img src={hotel.image} alt={hotel.hotelName} className="hotel-in-form"/> */}
          <h3 className="hotel-name-form">Hotel {hotel.name},</h3> 
          <p>{hotel.location}</p>
        </div>
        <div className="price-info">
          <h4>Booking ({adults} Adult{adults > 1 ? 's' : ''})</h4>
          <h4>₹ {total}.00</h4>
        </div>
        <div className="flight-fare">
          <p>Room charges</p>
          <p>₹ {room.costDetails.baseCost}.00</p>
        </div>
        <div className="taxes">
          <p>Taxes and charges</p>
          <p>₹ {tax}.00</p>
        </div>
        <div className="price-total">
          <div>
            <h3>Total</h3>
            <p>Includes taxes and charges</p>
          </div>
          <h3>₹ {total}.00</h3>
        </div>
      </div>
    </div>
  );
}

export default HotelForm;
