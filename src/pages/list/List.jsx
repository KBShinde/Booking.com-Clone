import "./list.css";
import SearchItem from "../../components/searchItem/SearchItem";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Slider, Box, Typography } from '@mui/material';

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state?.destination || "");
  const [filter, setFilter] = useState(-1);
  const [fliterTemp, setFilterTemp] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [value, setValue] = useState([1000, 10000]);

  const handleChange = (e, newValue) => {
    setValue(newValue);
    console.log(e.target.value)
  };

  const [checkedItems, setCheckedItems] = useState({
    "1": false,
    "2": false,
    "3": false,
    "4": false,
    "5": false,
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    const updatedCheckedItems = { ...checkedItems, [name]: checked };
    setCheckedItems(updatedCheckedItems);

    const allUnchecked = Object.values(updatedCheckedItems).every(item => item === false);

      fetchRating(name); 
      // setFilter(name);
    
  };

  const fetchRating = async (rating) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${destination}"}&filter={"rating":${rating}}`,
        {
          method: "GET",
          headers: {
            projectID: "f104bi07c490",
            "Content-Type": "application/json",
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
  
      const jsonData = await response.json();
      console.log("Fetched data:", jsonData);
      setFilter(jsonData.data || []);
      setFilterTemp(jsonData.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const filterItemsRating = [
    { id: '1', label: "1 star", count: 5 },
    { id: '2', label: '2 star', count: 22 },
    { id: '3', label: '3 star', count: 8 },
    { id: '4', label: '4 star', count: 1 },
    { id: '5', label: '5 star', count: 1 },
  ];
  
  const filterItemsRoom = [
    { id: 'Suite', label: "Suite", count: 4 },
    { id: 'Double', label: 'Double', count: 14 },
    { id: 'Deluxe ', label: 'Deluxe ', count: 13 },
    { id: 'Single', label: 'Single', count: 18},
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
                  onChange={handleChange}
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
                checked={checkedItems[item.id]}
                onChange={handleCheckboxChange}
              />
              <label htmlFor={item.id}>{item.label}</label>
              <p>{item.count}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="listResult">
        <SearchItem rating={filter}/>
      </div>
    </div>
  );
};

export default List;
