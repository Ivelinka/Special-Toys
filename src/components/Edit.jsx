import { useSessionContext } from './Contact/useSessionStorage';
import React, { useEffect, useState } from "react"
import { memo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editToy, fetchToy } from './Helpers/ToyPromises';
import './Dashboard-Profile/Details'

export const DetailsTemplate = () => {
    const [session, setSession] = useSessionContext()
    const [toy, setToy] = useState([]);
   let id = useParams().id
//    let {id} = useParams()

    const navigate = useNavigate()
  
    useEffect(() => {
		fetchToy(id).then(setToy); 
    }, [id]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setToy({ ...toy, [name]: value }); // !!!
    };
    const onEdit = async (e) => {
        e.preventDefault();
        const { name, description, imageUrl, category } = toy // !!!
        editToy(id, session, name, description, imageUrl, category)
                .then(() => navigate(`/dashboard/${category}`))
    };   

    return (
    <section id="edit-details">
            <form id="edit-form">
  <div className="container">
      <h2>Edit Toys</h2><br/>
      <label htmlFor="name">Name</label>
      <input id="name" type="text" placeholder="Enter Name" name="name" 
      value={toy.name} onChange={handleChange}/>
      <label htmlFor="description">Description</label>
      <textarea id="description" placeholder="Enter Description" name="description" 
      value={toy.description} onChange={handleChange}></textarea>
      <label htmlFor="imageUrl">Toy Image</label>
      <input id="imageUrl" type="text" placeholder="Enter toy ImageUrl" name="imageUrl" 
      value={toy.imageUrl} onChange={handleChange}/>
      <input onClick={onEdit} type="submit" className="createbtn" value="Edit toy"/>
  </div>
</form>

</section>            
        
    );
};
export default memo(DetailsTemplate);