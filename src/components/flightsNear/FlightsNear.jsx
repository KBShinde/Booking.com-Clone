
import "./flightsNear.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";

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
        background: "none", 
        border: "none", 
        outline: "none", 
        color: "grey"
      }}
      onClick={onClick}
    />
  );
}


const FlightsNear= () => {

  const [isInternational, setIsInternational] = useState(true);
  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const internationalFlightList = [
    {
      img: "https://q-xx.bstatic.com/xdata/images/city/526x420/977219.webp?k=5195e2536fa76cce99b3832db957dd594556791764839bb4ac3a64278c99ff4d&o=",
      name: "Pune to Dubai",
    },
    {
      img: "https://q-xx.bstatic.com/xdata/images/city/526x420/619666.webp?k=e68cd0f0f986f206e34c7ea54851b18b3735e66f224f592fdaf918a70239c728&o=",
      name: "Pune to Singapore",
    },
    {
      img: "https://q-xx.bstatic.com/xdata/images/city/526x420/977254.webp?k=d99a8fcc0facc5e5c006e5e18ef70909f256a04e8b21204ee861e06f4fcc97da&o=",
      name: "Pune to Bangkok",
    },
    {
      img: "https://q-xx.bstatic.com/xdata/images/city/526x420/674773.webp?k=0c4fe8a8ffb0fa76c01b2bddfe7c2fdb08925f733c3620aab1c38db152036d13&o=",
      name: "Pune to Male City",
    },
    {
      img: "https://q-xx.bstatic.com/xdata/images/city/526x420/688060.webp?k=a2f679e503f65c893781a1156c8800f1b649e5f5856ccd192f86ddcb4e46bf85&o=",
      name: "Pune to Kuta",
    },
  ];

  const domesticFlightList = [
    {
      img: "https://q-xx.bstatic.com/xdata/images/city/526x420/684757.webp?k=7f36d2b34248c1f6298747b3048f56708682070ce0ff57af8103d932ff708326&o=",
      name: "Pune to Dabolim",
    },
    {
      img: "https://q-xx.bstatic.com/xdata/images/city/526x420/684511.webp?k=a8caf2fc84deacb22c446a43319953acec2eff3095a0acce499a37fd4ae7c572&o=",
      name: "Pune to Ahmedabad",
    },
    {
      img: "https://q-xx.bstatic.com/xdata/images/city/526x420/684652.webp?k=f7bbe81b8ce84faaac3995f7ba38176bb745f175a959054645d5f488725de911&o=",
      name: "Pune to Hyderabad",
    },
    {
      img: "https://q-xx.bstatic.com/xdata/images/city/526x420/684533.webp?k=67972bfc01525b685792e2719666319e1d719b2cba91ba9a4a145f37f19655b8&o=",
      name: "Pune to Bangalore",
    },
    {
      img: "https://q-xx.bstatic.com/xdata/images/city/526x420/684764.webp?k=49cc399ccbdec7d3a1419b46e85b917d9b7ecf8940cdc826c5e41e1c8c23e356&o=",
      name: "Pune to New Delhi",
    },
    {
      img: "https://q-xx.bstatic.com/xdata/images/city/526x420/684727.webp?k=5a88716070492e8adc87750c9e2c3cc74c0e00eef153fc7f66cbf18bdcbf958c&o=",
      name: "Pune to Chennai",
    },
    {
      img: "https://q-xx.bstatic.com/xdata/images/city/526x420/815249.webp?k=a88090e45345342d4a7d5bbadf60e2f592725f0f7634053ecce3670ced617ddc&o=",
      name: "Pune to Nagpur",
    },
    {
      img: "https://q-xx.bstatic.com/xdata/images/city/526x420/684655.webp?k=577220cc0a362104bbc2d957636018c45584af938883a263e19bb153307d5bbd&o=",
      name: "Pune to Jaipur",
    },
    {
      img: "https://q-xx.bstatic.com/xdata/images/city/526x420/684638.webp?k=701961820411fcd87bb9bc6b4c6d2093c4dda8ce890fa861a7d3cc597b6fcd13&o=",
      name: "Pune to Indore",
    },
    {
      img: "https://q-xx.bstatic.com/xdata/images/city/526x420/684569.webp?k=5a54e1ff7cb10d54a2a7d74c4d1c3548dfd590b9ca7c1fb2272552b0741bd677&o=",
      name: "Pune to Cochin",
    },
  ];

  return (
    <div className="interList">
      <div className="interListText">
        <h2>Popular flights near you</h2>
        <p>Find deals on domestic and international flights</p>
      </div>
      <div className="flightType">
        <p
          className={isInternational ? 'active' : ''}
          onClick={() => setIsInternational(true)}
        >
          International
        </p>
        <p
          className={!isInternational ? 'active' : ''}
          onClick={() => setIsInternational(false)}
        >
          Domestic
        </p>
      </div>

      <Slider {...settings}>
        {(isInternational ? internationalFlightList : domesticFlightList).map((p, index) => (
          <div className="interListItem" key={index}>
            <img src={p.img} alt={p.name} className="interListImg" />
            <div className="interListTitles">
              <h1>{p.name}</h1>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};
export default FlightsNear;
