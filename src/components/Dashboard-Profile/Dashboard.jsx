import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import { memo } from "react";
import { fetchPics } from '../Helpers/ToyPromises';

export const DashboardTemplate = () => {

    const [pics, setPics] = useState([]);
    let category = useParams().category

  useEffect(() => {
		fetchPics(category).then(setPics);
    }, [category]);

  const [slide, setSlide] = useState(0)
  const nextSlide = () => {
      setSlide(x => {
        let newIndex = (x + 1) % pics.length;
        return newIndex;
      });
  };
  const prevSlide = () => {
    setSlide(x => {
      let newIndex = (x - 1 + pics.length) % pics.length;
      return newIndex;
    });
}

    return (<>
    <section id="toys-feed">
  <h1 id="h1Dash">{category.replace(/([a-z])([A-Z])/g, "$1 $2")} toys</h1>
  <div className="sliders"> 
        {pics.map((p, index) =>  <>
          <div className="slider" style={{ transform: `translateX(-${slide * 100}%)`, left : `${index * 100}%` }}>
            <img src={p.imageUrl} />
            <div id="data-buttons">
                <button className="button-slider"><Link className="details" to={`/details/${p._id}`}>Details</Link></button>
            </div>
          </div> 
        </>       
                   
 )}
 </div>
    <div className="nav">
    <button onClick={prevSlide}>Previous</button>
    <button onClick={nextSlide}>Next</button>
</div>
    </section>              
    </>
      
    );
};
export default memo(DashboardTemplate);


