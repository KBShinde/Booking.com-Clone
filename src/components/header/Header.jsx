import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange } from "react-date-range";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [errors, setErrors] = useState({});
  const [activeItem, setActiveItem] = useState("Stays");

  const navigate = useNavigate();

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleSearch = () => {
    const newErrors = {};

    // Check if destination is not empty and contains only valid characters
    const isValidDestination = /^[\w\s,.]+$/.test(destination.trim());
    if (destination.trim() === "" || !isValidDestination) {
      newErrors.destination = "Please enter a valid destination.";
    }

    // Check if dates are valid (startDate should be before endDate)
    const isValidDateRange = date[0].startDate <= date[0].endDate;
    if (!isValidDateRange) {
      newErrors.date = "Please select a valid date range.";
    }

    // If there are errors, set them in state
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // If everything is valid, navigate to the hotels page
    navigate("/hotels", { state: { destination, date, options } });
  };

  // Function to check if all textboxes are filled and valid
  const isSearchDisabled = () => {
    const isValidDestination = /^[\w\s,.]+$/.test(destination.trim());
    const isValidDateRange = date[0].startDate <= date[0].endDate;
    return (
      destination.trim() === "" || !isValidDestination || !isValidDateRange
    );
  };

  const handleNavigate = (page) => {
    const activeTab = page === "/" ? "Stays" : page.replace("/", ""); // Determine active tab based on the route
    setActiveItem(activeTab); // Update active item state

    // Navigate to the appropriate route
    navigate(
      page === "/" ? "/" : `/${page.toLowerCase().replace(/\s+/g, "-")}`
    );
  };

  return (
    <div className="custom-header">
      <div
        className={
          type === "list" ? "custom-headerContainer listMode" : "custom-headerContainer"
        }
      >
        <div className="custom-headerList">
          <div
            className={`custom-headerListItem ${
              activeItem === "Stays" ? "active" : ""
            }`}
            onClick={() => handleNavigate("/")}
          >
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div
            className={`custom-headerListItem ${
              activeItem === "Flights" ? "active" : ""
            }`}
            onClick={() => handleNavigate("Flights")}
          >
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
