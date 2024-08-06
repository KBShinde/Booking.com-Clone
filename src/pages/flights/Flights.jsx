
import FlightHeader from "../../components/flightHeader/FlightHeader";
import FlightsNear from "../../components/flightsNear/FlightsNear";
import TrendingCity from "../../components/trendingCity/TrendingCity";



const Flights = () => {


  return (
    <div>
    <div className="headingText">
      <h1>Compare and book flights with ease</h1>
      <p>Discover your next dream destination</p>
    </div>
     
    <FlightHeader/>
    <FlightsNear/>
    <TrendingCity/>
    </div>
  );
};

export default Flights;
