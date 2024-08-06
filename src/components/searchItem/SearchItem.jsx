import "./searchItem.css";
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

const SearchItem = ({rating}) => {
  const [hotels, setHotels] = useState([]);
  const location = useLocation();
  const [destination, setDestination] = useState(location.state?.destination || "");

  useEffect(() => {
    fetchData();
  }, [destination,rating]);
  const fetchData = async () => {
    
    if (destination) {
      let url=`https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${destination}"}`
      if(rating!=-1){
        console.log("rating :", rating)
        url=`https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${destination}"}&filter={"rating":${rating}}`
      }
      //console.log(`https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${destination}"}`)
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

        } else {
          console.error('Invalid response format:', jsonData);
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    }
  };


  return (
    <div>
      {hotels && hotels.map((hotel, index) => (
        <div className="searchItem" key={index}>
         <img src={hotel.images[0]} alt="" className="siImg" />

         
          <div className="siDesc">
            <h1 className="siTitle">{hotel.name}</h1>
            <span className="siDistance">Location: {hotel.location}</span>
            
            <span className="siSubtitle">{hotel.amenities.join(', ')}</span>
            <span className="siFeatures">
              Room Type: {hotel.rooms[0].roomType} • Size: {hotel.rooms[0].roomSize} sqm • Beds: {hotel.rooms[0].bedDetail}
            </span>
            <span className="siCancelOp">{hotel.rooms[0].cancellationPolicy}</span>
          </div>

        
          <div className="siDetails">
            <div className="siRating">
              <span>Rating: </span>
              <button>{hotel.rating}</button>
            </div>
            <div className="siDetailTexts">
              <span className="siPrice">₹{hotel.rooms[0].price}</span>
              <span className="siTaxOp">Includes taxes and fees</span>
              
              <NavLink to={`/hotels/${hotel._id}`}>
                <button className="siCheckButton">
                  See availability
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchItem;
