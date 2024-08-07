import { Link } from "react-router-dom";
import { memo } from "react";
import React, { useState } from "react"

const About = () => {
  const [isActive, setIsActive] = useState(false)

  const script = document.createElement("script");
  script.src = "https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
  script.src = "https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"
  script.async = true;
  document.body.appendChild(script);

    return (
        <div className="dropdown" onClick={(e) => {
          setIsActive(!isActive);
        }}>
          <ul className="options" >
          <Link to="/dashboard/CareBears"><li className="option"><ion-icon name="heart-outline"></ion-icon>
          CareBears</li></Link>
          <Link to="/dashboard/RainbowBrite"><li className="option"><ion-icon name="rainy-outline"></ion-icon>
          Rainbow Brite</li></Link>
          <Link to="/dashboard/Other"><li className="option"><ion-icon name="duplicate-outline"></ion-icon>Others</li></Link>
          </ul>
        </div>
    );
};

export default memo(About);