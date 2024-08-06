import "./leftCard.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faSearch } from "@fortawesome/free-solid-svg-icons";

const LeftCard = () => {
    const location = useLocation();
    const [destination] = useState(location.state?.destination || "Destination");
    const [date, setDate] = useState(location.state?.date || [{ startDate: new Date(), endDate: new Date(), key: 'selection' }]);
    const [openDate, setOpenDate] = useState(false);
    const [options] = useState(location.state?.options || { adult: 1, children: 0, room: 1 });

    return (
        <div className="listContainer">
            <div className="listWrapper">
                <div className="listSearch">
                    <h1 className="lsTitle">Your search</h1>
                    <div className="lsItem">
                        <label>Destination</label>
                        <div className="inputWithIcon">
                            <FontAwesomeIcon icon={faSearch} className="inputIcon" />
                            <input value={destination} type="text" readOnly />
                        </div>
                    </div>
                    <div className="lsItem">
                        <label>Check-in Date</label>
                        <div className="inputWithIcon">
                            <FontAwesomeIcon icon={faCalendarDays} className="inputIcon" />
                            <input
                                value={`${format(date[0].startDate, "dd/MM/yyyy")}`}
                                type="text"
                                readOnly
                                onClick={() => setOpenDate(!openDate)}
                            />
                        </div>
                        {openDate && (
                            <DateRange
                                onChange={(item) => setDate([item.selection])}
                                minDate={new Date()}
                                ranges={date}
                                className="custom-calendar"
                            />
                        )}
                    </div>
                    <div className="lsItem">
                        <label>Check-out Date</label>
                        <div className="inputWithIcon">
                            <FontAwesomeIcon icon={faCalendarDays} className="inputIcon" />
                            <input
                                value={`${format(date[0].endDate, "dd/MM/yyyy")}`}
                                type="text"
                                readOnly
                                onClick={() => setOpenDate(!openDate)}
                            />
                        </div>
                        {openDate && (
                            <DateRange
                                onChange={(item) => setDate([item.selection])}
                                minDate={new Date()}
                                ranges={date}
                                className="custom-calendar"
                            />
                        )}
                    </div>
                    <div className="lsItem">
                        <label>Options</label>
                        <div className="lsOptions">
                            <div className="lsOptionItem">
                                <span className="lsOptionText">Adult</span>
                                <input
                                    type="number"
                                    min={1}
                                    className="lsOptionInput"
                                    value={options.adult}
                                    readOnly
                                />
                            </div>
                            <div className="lsOptionItem">
                                <span className="lsOptionText">Children</span>
                                <input
                                    type="number"
                                    min={0}
                                    className="lsOptionInput"
                                    value={options.children}
                                    readOnly
                                />
                            </div>
                            <div className="lsOptionItem">
                                <span className="lsOptionText">Room</span>
                                <input
                                    type="number"
                                    min={1}
                                    className="lsOptionInput"
                                    value={options.room}
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
                    <button>Search</button>
                </div>
            </div>
        </div>
    );
};

export default LeftCard;
