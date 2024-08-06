import React from 'react';
import './amenities.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { 
    faBath, faBed, faTree, faWifi, faUtensils, faCouch, faTv, 
    faConciergeBell, faShieldAlt, faBroom, faDoorOpen, faCar, 
    faBuilding, faWheelchair, faSwimmingPool, faSpa, faLanguage, faCheck 
} from '@fortawesome/free-solid-svg-icons';

const Amenities = () => (
  
  <div className="amenities">
    <div className="aLists">
      <div className="aList">
        <div className="icon-item">
          <FontAwesomeIcon icon={faBath} />
          <span className="icon-label">Bathroom</span>
        </div>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Toilet paper</p>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Towels</p>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Towels/sheets (extra fee)</p>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Bath or shower</p>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Private bathroom</p>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Toilet</p>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Free toiletries</p>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Hairdryer</p>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Shower</p>
      </div>
      <div className="aList">
        <div className="icon-item">
          <FontAwesomeIcon icon={faSpa}/>
          <span className="icon-label">Wellness</span>
        </div>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Yoga classes</p>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Full body massage</p>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} />Hand massage</p>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Head massage</p>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Couples massage</p>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Spa facilities</p>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Pedicure</p>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Manicure</p>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Hair treatments</p>
      </div>
      <div className="aList">
        <div className="icon-item">
          <FontAwesomeIcon icon={faBuilding} />
          <span className="icon-label">General</span>
        </div>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Grocery deliveries</p>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Shared lounge/TV area</p>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Designated smoking area</p>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Air conditioning</p>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Non-smoking throughout</p>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Wake-up service</p>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Tile/marble floor</p>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Car hire</p>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Packed lunches</p>
      </div>

      <div className="aList">
        <div className="icon-item">
          <FontAwesomeIcon icon={faTv} />
          <span className="icon-label">Media & Technology</span>
        </div>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Flat-screen TV</p>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Cable channels</p>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Satellite channels</p>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Telephone</p>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> TV</p>
      </div>
      <div className="aList">
        <div className="icon-item">
          <FontAwesomeIcon icon={faConciergeBell} />
          <span className="icon-label">Food & Drink</span>
        </div>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Kid meals (additional charge)</p>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Special diet menus (on request)</p>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Breakfast in the room</p>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Wine/champagne</p>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Tea/Coffee maker</p>
      </div>
      <div className="aList">
        <div className="icon-item">
          <FontAwesomeIcon icon={faShieldAlt}  />
          <span className="icon-label">Safety & Security</span>
        </div>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> CCTV outside property</p>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> CCTV in common areas</p>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Key access</p>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> 24-hour security</p>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Safety deposit box</p>
      </div>
      <div className="aList">
        <div className="icon-item">
          <FontAwesomeIcon icon={faWifi} />
          <span className="icon-label">Internet</span>
        </div>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> WiFi is available in the rooms and is free of charge.</p>
      </div>
      <div className="aList">
        <div className="icon-item">
          <FontAwesomeIcon icon={faCar}  />
          <span className="icon-label">Parking</span>
        </div>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Free public parking is possible on site (reservation is not needed).</p>
      </div>
      <div className="aList">
        <div className="icon-item">
          <FontAwesomeIcon icon={faWheelchair} />
          <span className="icon-label">Accessibility</span>
        </div>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Upper floors accessible by stairs only</p>
      </div>

      <div className="aList">
        <div className="icon-item">
          <FontAwesomeIcon icon={faTree} />
          <span className="icon-label">Outdoors</span>
        </div>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Outdoor fireplace</p>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Outdoor furniture</p>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Picnic area</p>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Beachfront</p>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Balcony</p>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Garden</p>
      </div>

      <div className="aList">
        <div className="icon-item">
          <FontAwesomeIcon icon={faSwimmingPool} />
          <span className="icon-label">Outdoor Swimming Pool</span>
        </div>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Opening times: Open all year</p>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> All ages welcome</p>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Plunge pool</p>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Swimming pool toys</p>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Pool/beach towels</p>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Sun loungers or beach chairs</p>
      </div>
      <div className="aList">
        <div className="icon-item">
          <FontAwesomeIcon icon={faDoorOpen}  />
          <span className="icon-label">Reception Services</span>
        </div>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Invoice provided</p>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Lockers</p>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Private check-in/check-out</p>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Concierge service</p>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Luggage storage</p>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Express check-in/check-out</p>
      </div>
      <div className="aList">
        <div className="icon-item">
          <FontAwesomeIcon icon={faBed}/>
          <span className="icon-label">Bedroom</span>
        </div>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Linen</p>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Wardrobe or closet</p>
      </div> 
      <div className="aList">
        <div className="icon-item">
          <FontAwesomeIcon icon={faBroom} />
          <span className="icon-label">Cleaning Services</span>
        </div>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Daily housekeeping</p>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Laundry (additional charge)</p>
      </div>
      <div className="aList">
        <div className="icon-item">
          <FontAwesomeIcon icon={faLanguage} />
          <span className="icon-label">Languages Spoken</span>
        </div>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> English</p>
        <p className="aListItem"><FontAwesomeIcon icon={faCheck} /> Hindi</p>
      </div>
    </div>
  </div>
);

export default Amenities;
