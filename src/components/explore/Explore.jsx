import React from "react";
import Slider from "react-slick";
import "./explore.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

const Explore = () => {
  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 6,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };


   const exploreList = [
    {
      img : "https://r-xx.bstatic.com/xdata/images/region/170x136/49646.jpg?k=b7f38878b9164ee38e0b99c4d4646dbea76b7bf4add8464b1aa75e4c9d0efc6e&o=",
      h1 : "Goa",
      p : "5,855 properties",
    },
    {
      img : "https://r-xx.bstatic.com/xdata/images/city/170x136/684765.jpg?k=3f7d20034c13ac7686520ac1ccf1621337a1e59860abfd9cbd96f8d66b4fc138&o=",
      h1 : "New Delhi",
      p : "5,835 properties",
    },
    {
      img : "https://r-xx.bstatic.com/xdata/images/region/170x136/68606.jpg?k=4b43b9128b79beaab4ca2e8c038ddf5709b0b90608afbca222cfbe08fabda7d2&o=",
      h1 : "North Goa",
      p : "7,452 properties",
    },
    {
      img : "https://r-xx.bstatic.com/xdata/images/city/170x136/971346.jpg?k=40eeb583a755f2835f4dcb6900cdeba2a46dc9d50e64f2aa04206f5f6fce5671&o=",
      h1 : "Mumbai",
      p : "7,452 properties",
    },
    {
      img : "https://q-xx.bstatic.com/xdata/images/city/170x136/684880.jpg?k=e39b50ba8be4c6c6c413c963af6e0d452dbe0decaf72e13f9f798e65de549107&o=",
      h1 : "Rishikesh",
      p : "475 properties",
    },
    {
      img : "https://r-xx.bstatic.com/xdata/images/city/170x136/684919.jpg?k=0a73fce29109503c055e288c413d9a1c5bd66fdb26f01c1438e8017b0b64b42f&o=",
      h1 : "Ooty",
      p : "470 properties",
    },
    {
      img : "https://q-xx.bstatic.com/xdata/images/city/170x136/684573.jpg?k=81b297662f5c8f9562b0193a71a30b71d56e516eb327d4249db68bc8e9bcf3b8&o=",
      h1 : "Candolim",
      p : "473 properties",
    },
    {
      img : "https://q-xx.bstatic.com/xdata/images/city/170x136/733507.jpg?k=66c8dae717d74c6e7a05e0140e2fe3f87b6061e50b7aa36e317c05b3796cb257&o=",
      h1 : "Vagator",
      p : "165 properties",
    },
    {
      img : "https://q-xx.bstatic.com/xdata/images/city/170x136/684548.jpg?k=6105f1862b8bfa3f98596dc79e917903739517b4d99302d8b38c2723d34bc362&o=",
      h1 : "Anjuna",
      p : "315 properties",
    },
    {
      img : "https://r-xx.bstatic.com/xdata/images/region/170x136/70669.jpg?k=8c2f6c7512748330b72821f9de3a000915e7df4dcef73711e1e4a6b68c42f38e&o=",
      h1 : "Morjim",
      p : "120 properties",
    },
   ]; 
   return (
    <div className="explore">
      <Slider {...settings}>
        {exploreList.map((e, index) => (
          <div key={index}>
            <div className="exploreItem">
              <img
                src={e.img}
                alt=""
                className="exploreImg"
              />
              <div className="exploreTitles">
                <h1>{e.h1}</h1>
                <p>{e.p}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Explore;
