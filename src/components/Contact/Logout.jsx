import { useSessionContext } from './useSessionStorage';
import { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Logout = () => {

    const [session, setSession] = useSessionContext();
    const navigate = useNavigate()

    useEffect(() => {
        async function logout(){
           await fetch('http://localhost:3030/users/logout', {
            method: 'GET',
            headers: {
                'X-Authorization': sessionStorage.getItem('accessToken')
            }
           })
           setSession(null)
           navigate('/')
        }
       logout()

    }, []);

};

export default memo(Logout);