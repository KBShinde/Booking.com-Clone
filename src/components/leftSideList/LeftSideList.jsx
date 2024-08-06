import "./leftSideList.css";
import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { Slider, Box } from '@mui/material';
import SearchItemList from "../searchItemList/SearchItemList";

const LeftSideList = () => {
  const location = useLocation();
  const destination = location.state?.destination || "";
  const [filterTemp, setFilterTemp] = useState([]);
  const [value, setValue] = useState([1000, 10000]);
  const [hotels, setHotels] = useState([]);

  const [sortByPrice, setSortByPrice] = useState(null);
  const [sortByRating, setSortByRating] = useState(null);

  const [priceCheck, setPriceCheck] = useState({
    low: false,
    high: false,
  });

  const [ratingCheck, setRatingCheck] = useState({
    low: false,
    high: false,
  });

  const [roomTypeCheckedItems, setRoomTypeCheckedItems] = useState({
    suite: false,
    double: false,
    deluxe: false,
    single: false,
  });

  const [checkedItems, setCheckedItems] = useState({
    "1": false,
    "2": false,
    "3": false,
    "4": false,
    "5": false,
  });

  const fetchData = useCallback(async () => {
    if (destination) {
      let url = `https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${destination}"}`;

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'projectID': 'f104bi07c490',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const jsonData = await response.json();
        console.log('Response data:', jsonData);
        if (jsonData && jsonData.data && jsonData.data.hotels) {
          setHotels(jsonData.data.hotels);
          setFilterTemp(jsonData.data.hotels);
        } else {
          console.error('Invalid response format:', jsonData);
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    }
  }, [destination]);

  useEffect(() => {
    fetchData();
  }, [destination, fetchData]);

  const handlePriceRangeChange = (e, newValue) => {
    setValue(newValue);

    let filteredPriceData = hotels.filter(hotel => hotel.avgCostPerNight >= newValue[0] && hotel.avgCostPerNight <= newValue[1]);
    setFilterTemp(filteredPriceData);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    const updatedCheckedItems = { ...checkedItems, [name]: checked };
    const allUnchecked = Object.values(updatedCheckedItems).every(item => item === false);
    if (allUnchecked) {
      fetchData();
    }
    let selected = Object.keys(updatedCheckedItems).filter(key => updatedCheckedItems[key] === true);
    let intArr = selected.map((e) => parseInt(e, 10));
    let limit = {
      "minLimit": Math.min(...intArr),
      "maxLimit": Math.max(...intArr),
    };

    let filteredData = hotels.filter(hotel => hotel.rating >= limit.minLimit && hotel.rating <= limit.maxLimit + 1);
    setFilterTemp(filteredData);
    setCheckedItems(updatedCheckedItems);
  };

  const handleRoomTypeChange = (e) => {
    const { name, checked } = e.target;
    const updatedRoomTypeCheckedItems = { ...roomTypeCheckedItems, [name]: checked };

    const allUnchecked = Object.values(updatedRoomTypeCheckedItems).every(item => item === false);
    if (allUnchecked) {
      fetchData();
    }

    const selectedRoomTypes = Object.keys(updatedRoomTypeCheckedItems)
      .filter(key => updatedRoomTypeCheckedItems[key])
      .map(type => type.toLowerCase());

    const filteredRoomData = hotels.filter(hotel => {
      const roomTypes = hotel.rooms.map(room => room.roomType.toLowerCase());
      return selectedRoomTypes.some(type => roomTypes.includes(type));
    });

    setFilterTemp(filteredRoomData);
    setRoomTypeCheckedItems(updatedRoomTypeCheckedItems);
  };

  const handlePriceSortChange = (option) => {
    setSortByPrice(option);

    if (priceCheck[option]) {
      setPriceCheck({ ...priceCheck, [option]: false });
      fetchData();
      setSortByPrice(null);
    } else if (option === 'low') {
      const sortedHotels = [...filterTemp].sort((a, b) => a.avgCostPerNight - b.avgCostPerNight);
      setFilterTemp(sortedHotels);
      setPriceCheck({ ...priceCheck, low: true, high: false });
    } else if (option === 'high') {
      const sortedHotels = [...filterTemp].sort((a, b) => b.avgCostPerNight - a.avgCostPerNight);
      setFilterTemp(sortedHotels);
      setPriceCheck({ ...priceCheck, low: false, high: true });
    }
  };

  const handleRatingSortChange = (option) => {
    setSortByRating(option);

    if (ratingCheck[option]) {
      setRatingCheck({ ...ratingCheck, [option]: false });
      fetchData();
      setSortByRating(null);
    } else if (option === 'low') {
      const sortedHotels = [...filterTemp].sort((a, b) => a.rating - b.rating);
      setFilterTemp(sortedHotels);
      setRatingCheck({ ...ratingCheck, low: true, high: false });
    } else if (option === 'high') {
      const sortedHotels = [...filterTemp].sort((a, b) => b.rating - a.rating);
      setFilterTemp(sortedHotels);
      setRatingCheck({ ...ratingCheck, low: false, high: true });
    }
  };

  const filterItemsRating = [
    { id: '1', label: "1 star", count: 0 },
    { id: '2', label: '2 star', count: 0 },
    { id: '3', label: '3 star', count: 0 },
    { id: '4', label: '4 star', count: 1 },
    { id: '5', label: '5 star', count: 1 },
  ];

  const filterItemsRoom = [
    { id: 'suite', label: "Suite", count: 4 },
    { id: 'double', label: 'Double', count: 14 },
    { id: 'deluxe', label: 'Deluxe', count: 13 },
    { id: 'single', label: 'Single', count: 18 },
  ];

  return (
    <div className="filterContainer">
      <div className="filterCard">
        <div className="filterText">
          <h3>Filter by:</h3>
        </div>
        <div className="filterBudget">
          <h4>Your budget (per night)</h4>
          <p>₹ {value[0]} - ₹ {value[1]}</p>
          <Box sx={{ width: 250 }}>
            <Slider
              value={value}
              onChange={handlePriceRangeChange}
              aria-labelledby="range-slider"
              min={1000}
              max={10000}
            />
          </Box>
        </div>
        <div className="popular">
          <h3>Property rating</h3>
          {filterItemsRating.map((item) => (
            <div className="filterItem" key={item.id}>
              <input
                type="checkbox"
                id={item.id}
                name={item.id}
                checked={checkedItems[item.id]}
                onChange={handleCheckboxChange}
              />
              <label htmlFor={item.id}>{item.label}</label>
              <p>{item.count}</p>
            </div>
          ))}
        </div>

        <div className="popular">
          <h3>Room type</h3>
          {filterItemsRoom.map((item) => (
            <div className="filterRoom" key={item.id}>
              <input
                type="checkbox"
                id={item.id}
                name={item.id}
                checked={roomTypeCheckedItems[item.id] || false}
                onChange={handleRoomTypeChange}
              />
              <label htmlFor={item.id}>{item.label}</label>
              <p>{item.count}</p>
            </div>
          ))}
        </div>
        <div className="filterText">
          <h3>Sort by:</h3>
        </div>
        <div className="popular">
          <h3>Property price</h3>
          <div className="filterItemPrice">
            <input
              type="checkbox"
              checked={sortByPrice === 'low'}
              onChange={() => handlePriceSortChange('low')}
            />
            <label>Price (low to high)</label>
          </div>
          <div className="filterItemPrice">
            <input
              type="checkbox"
              checked={sortByPrice === 'high'}
              onChange={() => handlePriceSortChange('high')}
            />
            <label>Price (high to low)</label>
          </div>
        </div>
        <div className="popular">
          <h3>Property Rating</h3>
          <div className="filterItemRating">
            <input
              type="checkbox"
              checked={sortByRating === 'low'}
              onChange={() => handleRatingSortChange('low')}
            />
            <label>Rating (low to high)</label>
          </div>
          <div className="filterItemRating">
            <input
              type="checkbox"
              checked={sortByRating === 'high'}
              onChange={() => handleRatingSortChange('high')}
            />
            <label>Rating (high to low)</label>
          </div>
        </div>
      </div>
      <div className="listResult">
        <SearchItemList hotels={filterTemp} />
      </div>
    </div>
  );
};

export default LeftSideList;
