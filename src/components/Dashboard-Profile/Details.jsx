import { useSessionContext } from '../Contact/useSessionStorage';
import React, { memo, useEffect, useState } from "react"
import Stars from './Stars';
import { useNavigate, Link, useParams } from "react-router-dom";
import { fetchToy, makePurchase, fetchTotalPurchase, makeComment, fetchComments, deleteToy } from '../Helpers/ToyPromises';
import { useErrorContext } from '../Helpers/ErrorContext';


export const DetailsTemplate = () => {
    const [session, setSession] = useSessionContext()

    const [err, setError] = useErrorContext()

    const [toy, setToy] = useState([]);
   let id = useParams().id

    const[stars, setStars] = useState([])

    const navigate = useNavigate()
  
    
    useEffect(() => {
		fetchToy(id).then(setToy); 
        fetchComments(id).then(x => {
            setComments(x)
        }); 
    }, [id]);  // ako ne slojim id niama da prezaredi efekta

    const [comments, setComments] = useState([])

    let price = 5

    const onBuy = (e) => {
        e.preventDefault();
        const donation = {
            category: toy.category,
            toyId: id,
            amount: price
        }
        makePurchase(donation, session).then(() => {
            setTotalPurchase(totalPurchase + price)
        }).catch(setError)
    }; 

    const [totalPurchase, setTotalPurchase] = useState()
    let userId = session && session.userId 
    let owner = userId && userId == toy._ownerId 
   

    useEffect(() => {
        let userId = session && session.userId
		fetchTotalPurchase(id, userId).then(setTotalPurchase)        
	}, [id, session])

    const initialComent = { comment: ""};
    const [newComments, setNewComments] = useState(initialComent);

    const onCommentSubmitHandler = (e) => {
        const { name, value } = e.target;
            setNewComments({ ...newComments, [name]: value });

    }
    const onCreate = (e) => {
        e.preventDefault();
        const { comment } = newComments
        makeComment(session, comment, id).then(data => {
            setComments([...comments, data]) // za da ne se refreshva vseki put
            setNewComments(initialComent)
        }).catch(setError)
    };   


    const onDelete = (e) => {
        e.preventDefault();
        deleteToy(id, session).then(() => navigate('/dashboard')) 
    };  

    return (
    <section id="toy-details">
        <h1>name: {toy.name}</h1>
        <div className="toy-details">
                <div className="toy-img">
                    <img alt="toy-alt" src={toy.imageUrl}/>
                </div>
                <div className="toy-description">
                    <h2>Toy Description: </h2>
                    <p>{toy.description}</p>
                  
                    {owner ?  <>
                      <Link to={`/edit/${toy._id}`} className="button warning">Edit</Link> 
                      <button onClick={onDelete} className="button danger">Delete</button>
                   
                </>  :   
                <div className="big">
                <div className="item">
    <Stars stars={stars}/>

              <div className="btn purchase"><button onClick={onBuy}>Buy</button></div>
              <h4 className="donation">Price: {price}$</h4>
              <p className="total">Total: {totalPurchase}</p>
        </div>

        
                </div>
              
       
                }       
               
                    </div>
            </div>

            <article className="create-comment">
            <label>Add new comment:</label>
            <form className="form">
                <textarea className="areaComment" name="comment" placeholder="Comment......" onChange={onCommentSubmitHandler}
                value={newComments.comment}></textarea>
                <input onClick={onCreate} className="btn submit" type="submit" value="Add Comment"/>
            </form>
            {Array.isArray(comments) && comments.map(x => <p>{x.comment}</p>)}
        </article>


</section>            
    
    );
};
export default memo(DetailsTemplate);
