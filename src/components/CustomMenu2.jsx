import { Link } from "react-router-dom";
import { memo } from "react";
import React, { useState } from "react"

const About2 = () => {
  const [isActive, setIsActive] = useState(false)
       
    return (
        <div className="dropdown2" onClick={(e) => {
          setIsActive(!isActive);
        }}>
          <ul className="options" >
          <Link to="/myProfile"><li className="option"><ion-icon name="person-outline"></ion-icon>My Profile</li></Link>
          <Link to="/purchase"><li className="option"><ion-icon name="cash-outline"></ion-icon>My Purchases</li></Link>
          </ul>
        </div>
    );
};

export default memo(About2);