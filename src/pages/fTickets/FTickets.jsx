import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './fTickets.css';
import FlightHeader from '../../components/flightHeader/FlightHeader';
import { Luggage, BusinessCenter, Backpack } from '@mui/icons-material';
import { Dialog, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import TicketDetails from '../ticketDetails/TicketDetails';
import { Slider, Box } from '@mui/material';

const airlineMapping = {
  '6E001': { name: 'Indigo', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7AfBfjkvUsX9cQ10mjjE34B1Fy5VXnyQl88V91EBSzs-E9RNp' },
  'UK001': { name: 'Vistara', logo: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTfwV66jeFCjtjgQcZit-0AgqewDs1diyD_talTohXg8MIExmOC' },
  'AI001': { name: 'Air India', logo: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSFQi6DtLy_UjMDa9u-xXhRtf4-x8dlyK58zhyJIKHE4eF2ctYy' },
  'SG001': { name: 'Spice Jet', logo: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS3xUFRdnQQnSVTZbv8GNjMeRI16c9pvGKSAEFGrkwbkNNVyfIQ' },
  'G801-': { name: 'Go First', logo: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT9GAjPKjqRBusMX6pLMD3Xjp21COIhxXZ612gqIKdze4Kwt6gW' },
  'FL651': { name: 'Air India', logo: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSFQi6DtLy_UjMDa9u-xXhRtf4-x8dlyK58zhyJIKHE4eF2ctYy' },
};

const FTickets = () => {
  const location = useLocation();
  const [flights, setFlights] = useState([]);
  const [initialFlights, setInitialFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [activeFilter, setActiveFilter] = useState('best');
  const [value, setValue] = useState([2000, 2500]);
  const [sortOrder, setSortOrder] = useState(null);
  const [stopsFilter, setStopsFilter] = useState([]);
  const [airlineFilter, setAirlineFilter] = useState([]);

  const params = new URLSearchParams(location.search);
  const source = params.get('source') || 'Unknown Source';
  const destination = params.get('destination') || 'Unknown Destination';
  const day = params.get('day') || 'Unknown Day';
  const city = params.get('city') || 'Unknown City';
  const startDate = new Date(params.get('startDate') || new Date());
  const options = JSON.parse(params.get('options') || '{}');
  const adults = location?.state?.adults || 1;

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await fetch(
          `https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"source":"${source}","destination":"${destination}"}&day=${day}`,
          {
            method: 'GET',
            headers: {
              projectID: 'f104bi07c490',
            },
          }
        );
        const data = await response.json();
        if (data.status === 'success') {
          setFlights(data.data.flights);
          setInitialFlights(data.data.flights);
        } else {
          setError('Failed to fetch flights.');
        }
      } catch (err) {
        setError('An error occurred while fetching flights.');
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [location.search, source, destination, day]); // Include `source`, `destination`, and `day` as dependencies

  const handleCheapestPrice = () => {
    const sortedFlights = [...flights].sort((a, b) => a.ticketPrice - b.ticketPrice);
    setFlights(sortedFlights);
    setActiveFilter('cheapest');
  };

  const handleFastest = () => {
    const sortedFlights = [...flights].sort((a, b) => a.duration - b.duration);
    setFlights(sortedFlights);
    setActiveFilter('fastest');
  };

  const handleBest = () => {
    setFlights(initialFlights);
    setActiveFilter('best');
    setSortOrder(null);
    setStopsFilter([]);
    setAirlineFilter([]);
  };

  const handleSortOrderChange = (order) => {
    if (sortOrder === order) {
      handleBest();
    } else {
      setSortOrder(order);
      if (order === 'lowToHigh') {
        const sortedFlights = [...flights].sort((a, b) => a.ticketPrice - b.ticketPrice);
        setFlights(sortedFlights);
      } else if (order === 'highToLow') {
        const sortedFlights = [...flights].sort((a, b) => b.ticketPrice - a.ticketPrice);
        setFlights(sortedFlights);
      }
    }
  };

  const handleStopsChange = (stops) => {
    let updatedStopsFilter = [...stopsFilter];
    if (updatedStopsFilter.includes(stops)) {
      updatedStopsFilter = updatedStopsFilter.filter(item => item !== stops);
      setStopsFilter(updatedStopsFilter);
      if (updatedStopsFilter.length === 0 && airlineFilter.length === 0) {
        handleBest();
      } else {
        const filteredFlights = initialFlights.filter(flight => updatedStopsFilter.includes(flight.stops));
        setFlights(filteredFlights);
      }
    } else {
      updatedStopsFilter.push(stops);
      setStopsFilter(updatedStopsFilter);
      const filteredFlights = initialFlights.filter(flight => updatedStopsFilter.includes(flight.stops));
      setFlights(filteredFlights);
    }
  };

  const handleAirlineChange = (airline) => {
    let updatedAirlineFilter = [...airlineFilter];
    if (updatedAirlineFilter.includes(airline)) {
      updatedAirlineFilter = updatedAirlineFilter.filter(item => item !== airline);
      setAirlineFilter(updatedAirlineFilter);
      if (updatedAirlineFilter.length === 0 && stopsFilter.length === 0) {
        handleBest();
      } else {
        const filteredFlights = initialFlights.filter(flight => updatedAirlineFilter.includes(flight.flightID.slice(0, 5)));
        setFlights(filteredFlights);
      }
    } else {
      updatedAirlineFilter.push(airline);
      setAirlineFilter(updatedAirlineFilter);
      const filteredFlights = initialFlights.filter(flight => updatedAirlineFilter.includes(flight.flightID.slice(0, 5)));
      setFlights(filteredFlights);
    }
  };

  const handlePriceRangeChange = (e, newValue) => {
    let [minValue, maxValue] = newValue;
    if (minValue > maxValue) {
      [minValue, maxValue] = [maxValue, minValue];
    }
    setValue([minValue, maxValue]);
    let filteredPriceData = initialFlights.filter(flight =>
      flight.ticketPrice >= minValue && flight.ticketPrice <= maxValue
    );
    setFlights(filteredPriceData);
  };

  const handleClickOpen = (flight) => {
    const airlineCode = flight.flightID.slice(0, 5);
    const selectedAirline = airlineMapping[airlineCode] || { name: 'Unknown', logo: 'default-logo.png' };
    setSelectedFlight({ ...flight, airline: selectedAirline });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formattedDate = startDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });

  return (
    <>
      <FlightHeader />
      <div className='ticket-container'>
        <div className='left-side'>
          <div className="filterText">
            <h3>Popular filters</h3>
          </div>
          <div className="filterBudget">
            <h4>Your budget </h4>
            <p>₹ {value[0]} - ₹ {value[1]}</p>
            <Box sx={{ width: 250 }}>
              <Slider
                value={value}
                onChange={handlePriceRangeChange}
                aria-labelledby="range-slider"
                min={2000}
                max={2500}
              />
            </Box>
          </div>
          <div className='sort-price'>
            <h4>Sort by price</h4>
            <div className='low-high'>
              <input
                type="checkbox"
                checked={sortOrder === 'lowToHigh'}
                onChange={() => handleSortOrderChange('lowToHigh')}
              />
              <label>Low to high</label>
            </div>
            <div className='high-low'>
              <input
                type="checkbox"
                checked={sortOrder === 'highToLow'}
                onChange={() => handleSortOrderChange('highToLow')}
              />
              <label>High to low</label>
            </div>
          </div>
          <div className='sort-price'>
            <h4>Stops</h4>
            <div className='low-high'>
              <input
                type="checkbox"
                checked={stopsFilter.includes(0)}
                onChange={() => handleStopsChange(0)}
              />
              <label>Non stops</label>
            </div>
            <div className='high-low'>
              <input
                type="checkbox"
                checked={stopsFilter.includes(1)}
                onChange={() => handleStopsChange(1)}
              />
              <label>Stops 1</label>
            </div>
            <div className='high'>
              <input
                type="checkbox"
                checked={stopsFilter.includes(2)}
                onChange={() => handleStopsChange(2)}
              />
              <label>Stops 2</label>
            </div>
          </div>
          <div className='airlines-sort'>
            <h4>Airlines</h4>
            {Object.entries(airlineMapping).map(([id, airline]) => (
              <div key={id}>
                <input
                  type="checkbox"
                  checked={airlineFilter.includes(id)}
                  onChange={() => handleAirlineChange(id)}
                  className='airline-input'
                />
                <img className="airline-images" src={airline.logo} alt={airline.name} />
                <label className='airline-name'>{airline.name}</label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className='filter-options'>
            <button
              className={`filter-option ${activeFilter === 'best' ? 'active' : ''}`}
              onClick={handleBest}
            >
              Best
            </button>
            <button
              className={`filter-option ${activeFilter === 'cheapest' ? 'active' : ''}`}
              onClick={handleCheapestPrice}
            >
              Cheapest
            </button>
            <button
              className={`filter-option ${activeFilter === 'fastest' ? 'active' : ''}`}
              onClick={handleFastest}
            >
              Fastest
            </button>
          </div>
          {!loading && !error && flights.length === 0 && (
            <p>No flights available for the selected criteria.</p>
          )}
          {flights.map((flight, index) => (
            <div className='right-side' key={index}>
              <div className='ticket-list'>
                <div className='plane-icon'>
                  <img className="airline-img" src={airlineMapping[flight.flightID.slice(0, 5)]?.logo || 'default-logo.png'} alt={airlineMapping[flight.flightID.slice(0, 5)]?.name || 'Unknown Airline'} />
                  <h4>{airlineMapping[flight.flightID.slice(0, 5)]?.name || 'Unknown Airline'}</h4>
                </div>
                <div className='depart-time'>
                  <h4>{flight.departureTime}</h4>
                  <p>{flight.source} {formattedDate}</p>
                </div>
                <div className='duration'>
                  <p className='duration-text'>{flight.duration} hours</p>
                  <p className='flight-type'>{flight.stops} stops</p>
                </div>
                <div className='arrive-time'>
                  <h4>{flight.arrivalTime}</h4>
                  <p>{flight.destination} {formattedDate}</p>
                </div>
              </div>
              <div className='ticket-details'>
                <div className='bag-icons'>
                  <Backpack />
                  <BusinessCenter />
                  <Luggage />
                </div>
                <p className='icon-text'>{flight.amenities[0]}, {flight.amenities[1]}</p>
                <p className='seats-left'>{flight.availableSeats} Seats left </p>
                <div className='ticket-price'>
                  <h2>₹ {flight.ticketPrice * adults} .00</h2>
                  <p>Total price for all travelers</p>
                </div>
                <button className='details-button' onClick={() => handleClickOpen(flight)}>View Details</button>
              </div>
            </div>
          ))}
          <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
            sx={{
              '& .MuiDialog-paper': {
                width: '600px',
                maxHeight: '660px',
                overflow: 'hidden',
                borderRadius: '10px',
              },
            }}
          >
            <IconButton aria-label="close" onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 2,
                top: 2,
                color: 'black',
                zIndex: 2,
              }}
              className='dialog-close-button'
            >
              <CloseIcon />
            </IconButton>
            <TicketDetails flight={selectedFlight} day={day} formattedDate={formattedDate} city={city} startDate={startDate} options={options} />
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default FTickets;
