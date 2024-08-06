import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faTv, faWifi, faShower, faSnowflake, faCity, faBed, faRulerCombined, faUser, faCheck, faCoffee } from "@fortawesome/free-solid-svg-icons";
import "./hotel.css";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Amenities from "../../components/amenities/Amenities";
import LeftCard from "../../components/leftCard/LeftCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Dialog, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { Link, Element } from 'react-scroll';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ 
        ...style, 
        display: "block",
        background: "none",
        border: "none", 
        outline: "none", 
        color: "grey" 
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ 
        ...style, 
        display: "block",
        background: "none", 
        border: "none", 
        outline: "none", 
        color: "grey" 
      }}
      onClick={onClick}
    />
  );
}

const Hotel = () => {
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const location = useLocation();
  const [destination, setDestination] = useState(location.state?.destination || "");
  const [date, setDate] = useState(location.state?.date || "");
  const [options, setOptions] = useState(location.state?.options || "");
  const adults = options.adult


  const navigate = useNavigate();

  const handleReserve = (room) => {
    navigate("/fill_the_form", {
      state: {
        date,
        room,
        destination,
        options,
        hotel
      }
    });
  };
  const handleClickOpen = (index) => {
    setSelectedIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/bookingportals/hotel/${id}`,
        {
          method: "GET",
          headers: {
            projectID: "f104bi07c490",
            "Content-Type": "application/json",
            Authorization: "Bearer YOUR_ACCESS_TOKEN",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const jsonData = await response.json();
      setHotel(jsonData.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: selectedIndex,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    afterChange: (current) => setSelectedIndex(current),
  };

  const reviewList = [
    {
      description: "“The hospitality of the staffs. Cleanliness, Good behavior, calm and quiet. Breakfast. The owner was really nice to me. He is very frankly person and talk to guest if there is any issue.”",
      name: "  - Faysal, Bangladesh",
    },
    {
      description: "“Very quiet and homely atmosphere. Staff were very helpful and kind. The breakfast was delicious with an Indian speciality offered alongside eggs...”",
      name: "  - Dee, UK",
    },
    {
      description: "“The best stay ever. Special thanks to JITU bhai Jem of a person the way he took care of us was Exceptional. Highly I would recommend everyone to...”",
      name: "  - Raj, India",
    },
    {
      description: "“The staff was friendly and cooperative especially Jeetu. He arranged bikes for us as well as fuel. Owner also met us and we was very communicative...”",
      name: "  - Taher, India",
    },
    {
      description: "“Wonderful room, wonderful stuff After a weird experience from another hotel, we get there and was as if we get to paradise 😁❤️”",
      name: " - Eleni, Greece",
    },
  ];

  return (
    <>
      <div className="top-bar">
        <p className="overview top-bar-text">Overview</p>
        <Link to="infoPrices" smooth={true} duration={300} className="top-bar-text">
          Info&Prices
        </Link>
        <Link to="facilities" smooth={true} duration={300} className="top-bar-text">
          Facilities
        </Link>
        <p className="top-bar-text">House rules</p>
        <p className="top-bar-text">The fine print</p>
        <p className="top-bar-text">Ratings</p>
      </div>
      <div className="hotel-page">
        <div className="left-card">
          <LeftCard destination={destination} date={date} options={options} /> 
        </div>
        <div className="hotel-content">
          <div className="hotel-text">
            <div className="hotel-header">
              <h1 className="hotel-name">{hotel.name}</h1>
              <div className="hotel-location">
                <FontAwesomeIcon icon={faLocationDot} />
                <p>{hotel.location}</p>
              </div>
            </div>
            <Link to="infoPrices" smooth={true} duration={300} className="reserve-button">Reserve</Link>
          </div>

          <div className="hotel-image">
            <ImageList sx={{ width: 770, height: 560, marginTop: "-10px", marginLeft: "-15px" }} cols={2} className="scroll-content">
              {hotel.images.map((item, index) => (
                <ImageListItem key={item} onClick={() => handleClickOpen(index)}>
                  <img
                    srcSet={`${item}`}
                    src={`${item}`}
                    loading="lazy"
                    style={{ cursor: 'pointer', objectFit: 'cover', width: '385px', height: '185px' }}
                  />
                </ImageListItem>
              ))}
            </ImageList>

            <Dialog
              open={open}
              onClose={handleClose}
              maxWidth="md"
              sx={{
                '& .MuiPaper-root': {
                  background: 'transparent',
                  boxShadow: 'none',
                  border: 'none',
                  overflow: 'hidden',
                },
              }}
            >
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: 'black',
                  backgroundColor: 'lightgrey',
                  zIndex: 2,
                }}
              >
                <CloseIcon />
              </IconButton>
              <Slider {...settings}>
                {hotel.images.map((item) => (
                  <div key={item}>
                    <img
                      src={item}
                      alt="Selected"
                      style={{
                        width: '100%',
                        height: '500px',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                ))}
              </Slider>
            </Dialog>
          </div>
        </div>
        <div className="review-card">
          <div className="rating">
            <div className="rating-text">
              <h4>Very good</h4>
              <p>5 reviews</p>
            </div>
            <button>{hotel.rating}</button>
          </div>
          <div className="right-card">
            <h4>See what guests loved the most:</h4>
            <Slider {...settings}>
              {reviewList.map((r) => (
                <div className="reviews" key={r.name}>
                  <div className="review">
                    <p>{r.description}</p>
                    <p className="rName">{r.name}</p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
      <div style={{ marginLeft: '250px' }}>
        <Element name="infoPrices">
          <div className="room-table">
            <table border="1" cellPadding="10" cellSpacing="0">
              <thead>
                <tr>
                  <th>Room type</th>
                  <th>Number of guests</th>
                  <th>Price for 2 nights</th>
                  <th>Your choices</th>
                  <th>Select rooms</th>
                  <th className="empty"></th>
                </tr>
              </thead>
              <tbody>
                {hotel.rooms.map((row, index) => (
                  <tr key={index}>
                    <td className="room-details">
                      <div>
                        <div className="room-type">
                          <p>{row.roomType} Family Room</p>
                        </div>
                        <p>{row.bedDetail}<FontAwesomeIcon icon={faBed} className="icon-bed" /></p>
                        <p><FontAwesomeIcon icon={faRulerCombined} className="icon-green" /><span>{row.roomSize} m²</span></p>
                        <p><FontAwesomeIcon icon={faCity} className="icon-green" /><span>City View</span></p>
                        <p><FontAwesomeIcon icon={faSnowflake} className="icon-green" /><span>Air Conditioning</span></p>
                        <p><FontAwesomeIcon icon={faTv} className="icon-green" /><span>Flat Screen TV</span></p>
                        <p><FontAwesomeIcon icon={faShower} className="icon-green" /><span>Clean Bathroom</span></p>
                        <p><FontAwesomeIcon icon={faWifi} className="icon-green" /><span>Free WiFi</span></p>
                      </div>
                    </td>
                    <td>
                      <FontAwesomeIcon icon={faUser} />
                      <FontAwesomeIcon icon={faUser} />
                    </td>
                    <td className="cost-details">
                      <span className="base-cost">₹{row.costDetails.baseCost}</span>
                      <p className="taxes-fees">+₹ {row.costDetails.taxesAndFees} taxes and charges</p>
                      <p className="deal-info">40% off</p>
                      <p className="deal-info">Gateway deal</p>
                    </td>
                    <td className="cancellation-policy">
                      <FontAwesomeIcon icon={faCoffee} />
                      <span className="bold">Very good breakfast included</span> <br />
                      <FontAwesomeIcon icon={faCheck} />
                      <span className="bold">{row.cancellationPolicy.split(' ').slice(0, 2).join(' ')}</span>{' '}
                      <span className="bold">{row.cancellationPolicy.split(' ').slice(2).join(' ')}</span>
                    </td>
                    <td>
                      <select className="custom-select">
                        <option>1</option>
                        <option>2</option>
                      </select>
                    </td>
                    <td>
                    <button className= "reserve" onClick={() => handleReserve(row)}>Reserve now</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
          </div>
        </Element>
        
        <Element name="facilities">
        <div className="hotel-name-facility">
        <h2>Facilities of Hotel {hotel.name},</h2>
        <p>{hotel.location}</p>
        </div>

        <h3>Most popular facilities</h3>
        <Amenities />
        </Element>
      </div>
    </>
  );
};

export default Hotel;

