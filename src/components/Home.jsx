import { useSessionContext } from './Contact/useSessionStorage';
import { useNavigate } from "react-router-dom";
import { memo, useState } from "react";
import Search from './Dashboard-Profile/Search'
import { createToy } from './Helpers/ToyPromises';

export const Banner = () => {
    const [session, setSession] = useSessionContext();
    const[invis, setInvis] = useState(true)

    const navigate = useNavigate()
    
        const initialValues = {
            name: "",
            description: "",
            imageUrl: "",
        };
        const [formValues, setFormValues] = useState(initialValues);

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormValues({ ...formValues, [name]: value });
        };
        const onCreate = (e) => {
            e.preventDefault();
            const { name, description, imageUrl } = formValues
            let category = "Other"
            let count = 0
            if(name.match(/bear/i)){ 
                category = "CareBears"
                count++
            }
            if(name.match(/rainbow/i)){ 
                category = "RainbowBrite"
                count++
            }
            if(count > 1){
               throw new Error('too many matches') 
            }
            createToy(session, name, description, imageUrl, category)
                .then(() => navigate(`/dashboard/${category}`))
        };   

    return (
        <section id="welcome">   
            
            {session ? 
            (invis ?
               <button id="add" onClick={() => {setInvis(!invis)}}>Add Your Toys For Sale</button>
               : '')            
             : 
             <div id="welcome-container">
                <h1 id="neon">Welcome To The Special Toys Shop!</h1>
             
             <Search search={invis}/>
             </div>
        }
         {invis ?  '' :<>
         <section id="create">
         <form id="create-form">
  <div className="container">
      <h2>Add Toys</h2><br/>
      <label htmlFor="name">Name</label>
      <input id="name" type="text" placeholder="Enter Name" name="name" onChange={handleChange}/>
      <label htmlFor="description">Description</label>
      <textarea id="description" placeholder="Enter Description" name="description" onChange={handleChange}></textarea>
      <label htmlFor="imageUrl">Toy Image</label>
      <input id="imageUrl" type="text" placeholder="Enter toy ImageUrl" name="imageUrl" onChange={handleChange}/>
      <input onClick={onCreate} type="submit" className="createbtn" value="Create toy"/>
  </div>
</form>
         </section>
	  </>}

        </section>
    );
};
export default memo(Banner);