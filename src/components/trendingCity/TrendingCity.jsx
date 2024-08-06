
import "./trendingCity.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Description } from "@mui/icons-material";

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
  

const TrendingCity = () => {
    const settings = {
        dots: false,
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
      };

      const cityList = [
        {
          img: "https://q-xx.bstatic.com/xdata/images/city/526x420/684568.webp?k=20cdc72d8d6e062a433749ccc57622fcf93f8ba4ed12c214dfd5d2a3ecebe89d&o=",
          name: "Kolkata, India",
        },
        {
          img: "https://q-xx.bstatic.com/xdata/images/city/526x420/684569.webp?k=5a54e1ff7cb10d54a2a7d74c4d1c3548dfd590b9ca7c1fb2272552b0741bd677&o=",
          name: "Cochin, India",
        },
        {
          img: "https://q-xx.bstatic.com/xdata/images/city/526x420/684561.webp?k=5b998c0f30bebb6531eb4e25f05fee9e072564fd4ba15d3a14bc271c7ce7ff7f&o=",
          name: "Chandigarh, India",
        },
        {
          img: "https://q-xx.bstatic.com/xdata/images/city/526x420/684727.webp?k=5a88716070492e8adc87750c9e2c3cc74c0e00eef153fc7f66cbf18bdcbf958c&o=",
          name: "Chennai, India",
        },
        {
          img: "https://q-xx.bstatic.com/xdata/images/city/526x420/977219.webp?k=5195e2536fa76cce99b3832db957dd594556791764839bb4ac3a64278c99ff4d&o=",
          name: "Dubai, UAE",
        },
        {
          img: "https://q-xx.bstatic.com/xdata/images/city/526x420/815249.webp?k=a88090e45345342d4a7d5bbadf60e2f592725f0f7634053ecce3670ced617ddc&o=",
          name: "Nagpur, India",
        },
        {
          img: "https://q-xx.bstatic.com/xdata/images/city/526x420/684533.webp?k=67972bfc01525b685792e2719666319e1d719b2cba91ba9a4a145f37f19655b8&o=",
          name: "Bangalore, India",
        },
        {
          img: "https://q-xx.bstatic.com/xdata/images/city/526x420/684757.webp?k=7f36d2b34248c1f6298747b3048f56708682070ce0ff57af8103d932ff708326&o=",
          name: "Dabolim, India",
        },
        {
          img: "https://q-xx.bstatic.com/xdata/images/city/526x420/684511.webp?k=a8caf2fc84deacb22c446a43319953acec2eff3095a0acce499a37fd4ae7c572&o=",
          name: "Ahmedabad, India",
        },
        {
          img: "https://q-xx.bstatic.com/xdata/images/city/526x420/684764.webp?k=49cc399ccbdec7d3a1419b46e85b917d9b7ecf8940cdc826c5e41e1c8c23e356&o=",
          name: "New Delhi, India",
        },
      ];    
  return (
    <div className="cityList">
      <div className="cityListText">
        <h2>Trending cities</h2>
        <p>Book flights to a destination popular with travellers from India</p>
      </div>
      <Slider {...settings}>
        {cityList.map((p, index) => (
          <div className="cityListItem" key={index}>
            <img src={p.img} alt={p.name} className="cityListImg" />
            <div className="cityListTitles">
              <h1>{p.name}</h1>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TrendingCity
