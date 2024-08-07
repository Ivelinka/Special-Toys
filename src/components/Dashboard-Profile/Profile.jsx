import { useSessionContext } from '../Contact/useSessionStorage';
import { memo, useEffect, useState } from "react";
import { fetchToysCount } from '../Helpers/ToyPromises';

export const ProfileTemplate = () => {
    const [session, setSession] = useSessionContext();
    const[count, setCount] = useState([]) 

    useEffect(() => {
        let userId = session && session.userId
		fetchToysCount(userId).then(setCount)        
	}, [session])

    return (
        <section id="my-posts-page">
    <article className="user-info">
                <img id="user-avatar-url" alt="user-profile" src={`/images/${session.gender}.png`} />
                <div className="user-content">
                    <p>Email: {session.email}</p>
                    <p>My toys count: {count.length}  </p>
                    <h1 className="title">My toys: {count.map(x => x.name).join(', ')}</h1>
                </div>       
            </article>           
        </section>
    );
};
export default memo(ProfileTemplate);