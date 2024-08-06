import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Flights from "./pages/flights/Flights";
import SearchItem from "./components/searchItem/SearchItem";
import FTickets from "./pages/fTickets/FTickets";
import TicketDetails from "./pages/ticketDetails/TicketDetails";
import LeftSideList from "./components/leftSideList/LeftSideList";
import Login from "./components/login/logout/Login";
import DetailsForm from "./pages/detailsForm/DetailsForm";
import BookingConfirmation from "./pages/bookingConfirmation/BookingConfirmation";
import Register from "./components/register/Register";
import MyTrips from "./pages/myTrips/MyTrips";
import HotelForm from "./pages/hotelForm/HotelForm";
import Confirmation from "./pages/confirmation/Confirmation";



function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/flights" element={<Flights />} />
          <Route path="/hotels" element={<LeftSideList />} />
          <Route path="/hotels/:id" element={<Hotel />} />
          <Route path="/flights/tickets" element={<FTickets/>}/>
          <Route path="/flights/tickets/details" element={<TicketDetails/>}/>
          <Route path="/signup" element={<Register />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/fill_the_details" element={<DetailsForm />}/>
          <Route path="/booking-confirmation" element={<BookingConfirmation/>}/>
          <Route path="/fill_the_form" element={<HotelForm />}/>
          <Route path="/confirmation" element={<Confirmation />}/>
          <Route path="/my_trips" element={<MyTrips />}/>
          {/* Add more routes as needed */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
