import { format } from "date-fns";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import "./flightHeader.css";
import { useNavigate } from "react-router-dom";
import {
  faCalendarDays,
  faPerson,
  faPlaneArrival,
  faPlaneDeparture,
  faRightLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, useRef } from "react";
import { Calendar } from "react-date-range";
import debounce from 'lodash.debounce';

const FlightHeader = () => {
  const navigate = useNavigate();
  const [tripType, setTripType] = useState("round-trip");
  const [classType, setClassType] = useState("economy");
  const [directOnly, setDirectOnly] = useState(false);
  const [errors, setErrors] = useState({});
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [fromCode, setFromCode] = useState("");
  const [toCode, setToCode] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState(new Date());
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const fromRef = useRef();
  const toRef = useRef();

  const fetchAirportData = async (searchQuery, setter) => {
    try {
      const response = await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/airport?search={"city":"${searchQuery}"}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'projectID': 'f104bi07c490'
        }
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setter(data.data.airports);
    } catch (error) {
      console.error('Error fetching airport data:', error);
      setter([]);
    }
  };

  const debouncedFetchFromSuggestions = useRef(debounce((query) => fetchAirportData(query, setFromSuggestions), 500)).current;
  const debouncedFetchToSuggestions = useRef(debounce((query) => fetchAirportData(query, setToSuggestions), 500)).current;

  useEffect(() => {
    if (from) {
      debouncedFetchFromSuggestions(from);
    } else {
      setFromSuggestions([]);
    }
  }, [debouncedFetchFromSuggestions, from]);

  useEffect(() => {
    if (to) {
      debouncedFetchToSuggestions(to);
    } else {
      setToSuggestions([]);
    }
  }, [debouncedFetchToSuggestions, to]);

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const validateInputs = () => {
    const newErrors = {};
    if (!from) newErrors.from = "Please enter a departure location.";
    if (!to) newErrors.to = "Please enter a destination.";
    if (!date) newErrors.date = "Please select a date.";
    return newErrors;
  };

  const handleSearch = () => {
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const day = format(date, "EEE");
      const queryParams = new URLSearchParams({
        source: fromCode,
        destination: toCode,
        day: day,
        startDate: date.toISOString(),
        options: JSON.stringify(options),
      }).toString();
      navigate(`/flights/tickets?${queryParams}`);
    }
  };

  const handleDateChange = (item) => {
    setDate(item);
    setErrors((prev) => ({ ...prev, date: "" }));
    setOpenDate(false);
  };

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  const setFromValue = (item) => {
    setFrom(item.city);
    setFromCode(item.iata_code);
    setFromSuggestions([]);
    setErrors({ ...errors, from: '' });
  };

  const setToValue = (item) => {
    setTo(item.city);
    setToCode(item.iata_code);
    setToSuggestions([]);
    setErrors({ ...errors, to: '' });
  };

  return (
    <div className="flights">
      <div className="section">
        <div className="trip-types">
          <label>
            <input
              type="radio"
              value="one-way"
              checked={tripType === "one-way"}
              onChange={() => setTripType("one-way")}
            />
            One way
          </label>
          <label>
            <input
              type="radio"
              value="multi-city"
              checked={tripType === "multi-city"}
              onChange={() => setTripType("multi-city")}
            />
            Multi-city
          </label>
        </div>
        <div className="class-types">
          <label>
            <select
              value={classType}
              onChange={(e) => setClassType(e.target.value)}
            >
              <option value="economy">Economy</option>
              <option value="business">Business</option>
              <option value="first-class">First Class</option>
            </select>
          </label>
        </div>
        <div className="direct-flights">
          <label>
            <input
              type="checkbox"
              checked={directOnly}
              onChange={() => setDirectOnly(!directOnly)}
            />
            Direct flights only
          </label>
        </div>
      </div>
      <div className="headerFlight">
        <div className="headerContainer">
          <div className="headerSearchFlight">
            <div className="headerSearchItem">
              <FontAwesomeIcon icon={faPlaneDeparture} className="headerIcon" />
              <input
                type="text"
                placeholder="Where from?"
                className="headerSearchInput"
                value={from}
                onChange={(e) => {
                  setFrom(e.target.value);
                  setErrors({ ...errors, from: "" });
                }}
                ref={fromRef}
              />
              {fromSuggestions.length > 0 && (
                <div className="suggestions">
                  {fromSuggestions.map((item, index) => (
                    <div
                      key={index}
                      className="suggestion"
                      onClick={() => setFromValue(item)}
                    >
                      <div className="pop-up-data">

                      <h4> {item.iata_code}</h4> <p>- {item.name}, {item.city}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {errors.from && <span className="errorMessage">{errors.from}</span>}
            </div>
            <div className="headerSearchItem">
              <FontAwesomeIcon
                icon={faRightLeft}
                style={{
                  color: "#0071c2",
                  fontSize: "18px",
                  marginRight: "60px",
                  cursor: "pointer",
                }}
                onClick={swap}
              />
            </div>
            <div className="headerSearchItem">
              <FontAwesomeIcon icon={faPlaneArrival} className="headerIcon" />
              <input
                type="text"
                placeholder="Where to?"
                className="headerSearchInput"
                value={to}
                onChange={(e) => {
                  setTo(e.target.value);
                  setErrors({ ...errors, to: "" });
                }}
                ref={toRef}
              />
              {toSuggestions.length > 0 && (
                <div className="suggestions">
                  {toSuggestions.map((item, index) => (
                    <div
                      key={index}
                      className="suggestion"
                      onClick={() => setToValue(item)}
                    >
                  <div className="pop-up-data">
                       <h4> {item.iata_code}</h4> <p>- {item.name}, {item.city}</p>
                   </div>
                    </div>
                  ))}
                </div>
              )}
              {errors.to && <span className="errorMessage">{errors.to}</span>}
            </div>
            <div className="headerSearchItem">
              <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
              <span
                onClick={() => setOpenDate(!openDate)}
                className="headerSearchText"
              >
                {`${format(date, "dd/MM/yyyy")}`}
              </span>
              {openDate && (
                <div style={{ position: 'absolute', top: '75%', left: '480px', zIndex: '1000', width: '200px' }}>
                  <Calendar
                    date={date}
                    onChange={handleDateChange}
                    style={{ height: '230px', width: '250px', overflow: 'auto' }}
                  />
                </div>
              )}
              {errors.date && <span className="errorMessage">{errors.date}</span>}
            </div>
            <div className="headerSearchItem">
              <FontAwesomeIcon icon={faPerson} className="headerIcon" />
              <span
                onClick={() => setOpenOptions(!openOptions)}
                className="headerSearchText"
              >
                {`${options.adult} adult · ${options.children} children`}
              </span>
              {openOptions && (
                <div className="options">
                  <div className="optionItem">
                    <span className="optionText">Adult</span>
                    <div className="optionCounter">
                      <button
                        disabled={options.adult <= 1}
                        className="optionCounterButton"
                        onClick={() => handleOption("adult", "d")}
                      >
                        -
                      </button>
                      <span className="optionCounterNumber">
                        {options.adult}
                      </span>
                      <button
                        className="optionCounterButton"
                        onClick={() => handleOption("adult", "i")}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="optionItem">
                    <span className="optionText">Children</span>
                    <div className="optionCounter">
                      <button
                        disabled={options.children <= 0}
                        className="optionCounterButton"
                        onClick={() => handleOption("children", "d")}
                      >
                        -
                      </button>
                      <span className="optionCounterNumber">
                        {options.children}
                      </span>
                      <button
                        className="optionCounterButton"
                        onClick={() => handleOption("children", "i")}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <button className="headerBtn" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightHeader;

