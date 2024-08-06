import "./searchItemList.css";
import { NavLink} from 'react-router-dom';
import { useLocation } from "react-router-dom";

const SearchItemList = ({ hotels }) => {
  const location = useLocation();
  const { destination, date, options } = location.state;

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
              <span className="siPrice">₹{Math.round(hotel.avgCostPerNight)}</span>
              <span className="siTaxOp">Includes taxes and fees</span>
              <NavLink 
                to={`/hotels/${hotel._id}`} 
                state={{ destination, date, options }}
              >
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

export default SearchItemList;
