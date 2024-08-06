import './offerCard.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom';


const OfferCard = () => {
    
  const navigate = useNavigate();

  const haandlClick = () => {
    navigate('/flights')
  }
    // const settings = {
    //     dots: true,
    //     infinite: false,
    //     speed: 500,
    //     slidesToShow: 2,
    //     slidesToScroll: 1
    //   };

  return (
    <div className="offers">
         
        <div className="offer-card first">
        <div className="offer-content">
           <h3>Fly away to your dream holiday</h3>
           <p className='offer-title'>Get inspired, compare and book flights with more flexibility</p>
           <button onClick={haandlClick}>Search for flights</button>
        </div>
        <div className='plane-img'>
            <img src="https://r-xx.bstatic.com/xdata/images/xphoto/500x500/184698944.png?k=6bb1bf3c13db4a7ba3c22a2d1f1051f793c525a78104703b4dec3eb12101f545&o=" alt=''/>
        </div>
        </div>


        <div className="offer-card second">
           <h3>Seize the moment</h3>
           <p>Save 15% or more when you book and stay before 1 October 2024</p>
           <button>Find Getaway Deals</button>
           
        </div>

    
 
      </div>

  );
};

export default OfferCard;