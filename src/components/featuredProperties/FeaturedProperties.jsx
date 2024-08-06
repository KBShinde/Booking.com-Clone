import "./featuredPropreties.css"

const FeaturedProperties = () => {
  return (
    <div className="fp">

        <div className="fpItem">
            <img src="https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=35b70a7e8a17a71896996cd55d84f742cd15724c3aebaed0d9b5ba19c53c430b&o=" 
            alt="" className="fpImg" />
            <span className="fpName">ApartHotel Stare Miasto</span>
            <span className="fpCity">Old Town, Poland, Krakow</span>
            <span className="fpPrice">starting from ₹ 14,500</span>
            <div className="fpRating">
                <button>8.9</button>
                <span>Excellent</span>
            </div>
        </div>

        <div className="fpItem">
            <img src="https://cf.bstatic.com/xdata/images/hotel/square600/85257658.webp?k=e3f110e4ed0978310a028465a3bdd609149ecbded601555c881106255556b52e&o=" 
            alt="" className="fpImg" />
            <span className="fpName">Leman Locke</span>
            <span className="fpCity">Tower Hamlets, London</span>
            <span className="fpPrice">starting from ₹ 21,974</span>
            <div className="fpRating">
                <button>8.8</button>
                <span>Fabulous</span>
            </div>
        </div>

        <div className="fpItem">
            <img src="https://cf.bstatic.com/xdata/images/hotel/square600/97644401.webp?k=22466a369409724fbe8048f538bc8f218f123494d43ebd449cb848b9b895a2cb&o=" 
            alt="" className="fpImg" />
            <span className="fpName">Romance Al Colosseo</span>
            <span className="fpCity">Rione Monti, Italy, Roma</span>
            <span className="fpPrice">starting from ₹ 37,898</span>
            <div className="fpRating">
                <button>9.7</button>
                <span>Expectional</span>
            </div>
        </div>

        <div className="fpItem">
            <img src="https://cf.bstatic.com/xdata/images/hotel/square600/270323047.webp?k=bade09d7901e1282156f13c3b39e3a8b9c8d45170b2f1184565d3fc304c42d70&o=" 
            alt="" className="fpImg" />
            <span className="fpName">Flora Chiado Apartments</span>
            <span className="fpCity">Santa Maria Maior,Portugal, Lisboa</span>
            <span className="fpPrice">starting from ₹ 43,944</span>
            <div className="fpRating">
                <button>9.7</button>
                <span>Expectional</span>
            </div>
        </div>
      
    </div>
  )
}

export default FeaturedProperties
