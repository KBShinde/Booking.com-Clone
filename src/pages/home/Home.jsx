import "./home.css";
import React from "react";
import HeaderB from "../../components/headerB/HeaderB";
import Featured from "../../components/featured/Featured";
import Property from "../../components/propertyList/Property";
import Explore from "../../components/explore/Explore";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import UniqueProperties from "../../components/uniqueProperties/UniqueProperties";
import MailList from "../../components/mailList/MailList";
import OfferCard from "../../components/offerCard/OfferCard";

const Home = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <HeaderB />
      <div className="homeContainer">
      <h1 className="homeTitle">Offers</h1>
      <p className="homeText">Promotions, deals and special offers for you</p>
      
      <OfferCard/>
  
        <h1 className="homeTitle">Trending destinations</h1>
        <p className="homeText">
          Most popular choices for travellers from India
        </p>
        <Featured />

        <h1 className="homeTitle">Explore india</h1>
        <p className="homeText">
          These popular destinations have a lot to offer
        </p>
        <Explore />

        <h1 className="homeTitle">Browse by property type</h1>
        <Property />

        <h1 className="homeTitle">Stay at our top unique properties</h1>
        <p className="homeText">
          From castles and villas to boats and igloos, we've got it all
        </p>
        <UniqueProperties />

        <h1 className="homeTitle">Homes guests love</h1>
        <FeaturedProperties />
        <MailList />
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Home;
