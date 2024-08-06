import "./uniqueProperties.css"

const UniqueProperties = () => {
  return (
    <div className="up">

        <div className="upItems">
           <img src="https://cf.bstatic.com/xdata/images/hotel/square600/126764303.webp?k=46a8a949ef420510834df06d0d88e293fbaae80cd1e17883cb78c1bba3eb0366&o=" 
            alt="" className="upImg" />  
            <span className="upName">Agriturismo Cabrele</span>
            <span className="upCity">Italy, Santorso</span>
            <div className="upRating">
                <button>9.3</button>
                <span>Superb</span>
            </div>
        </div>

        <div className="upItems">
           <img src="https://cf.bstatic.com/xdata/images/hotel/square600/228714298.webp?k=2e88556aac50ed7e31bdc4f399c385b1c2b3208d8a3c3fc622e770bc6d9b0c98&o=" 
            alt="" className="upImg" />  
            <span className="upName">Harbor View</span>
            <span className="upCity">United Kingdom</span>
            <div className="upRating">
                <button>9.0</button>
                <span>Superb</span>
            </div>
        </div>

        <div className="upItems">
           <img src="https://cf.bstatic.com/xdata/images/hotel/square600/131500906.webp?k=b6f638eadb7c9632498a9e9a15440987a22489684b8825b0cb235bd3c79f07de&o=" 
            alt="" className="upImg" />  
            <span className="upName">Ranczo V Dolinie</span>
            <span className="upCity">Poland, Kiszkowo</span>
            <div className="upRating">
                <button>9.5</button>
                <span>Expectional</span>
            </div>
        </div>

        <div className="upItems">
           <img src="https://cf.bstatic.com/xdata/images/hotel/square600/154543781.webp?k=847c6d1ffe92003d2d7c9cf7043c6acda1c550e6f0c7c981370a6303f12a10cf&o=" 
            alt="" className="upImg" />  
            <span className="upName">Carinya Park</span>
            <span className="upCity">Australia, Gembroo</span>
        
            <div className="upRating">
                <button>9.3</button>
                <span>Superb</span>
            </div>
        </div>
      
    </div>
  )
}

export default UniqueProperties
