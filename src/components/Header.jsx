import { useSessionContext } from './Contact/useSessionStorage';
import { Link } from "react-router-dom";
import { useErrorContext } from './Helpers/ErrorContext';

const Header = () => {
    const [session, setSession] = useSessionContext();
    const [err, setError] = useErrorContext()

    return (
        <nav>
            <Link className="active" to={"/"}>Home</Link>
             {err ? <span className="errSpan">{err.toString()}</span> : ""}
            <Link to={"/custom-menu"}>Catalog</Link>

           {session ? <div id="user">
                    <span>Welcome, {session.email}</span>
                    <Link to={"/custom-menu2"}>My Profile</Link>
                    <Link id="logout" to={"/logout"}>Logout</Link>
            </div>
                :
            <div id="guest">
                    <Link to={"/login"}>Login</Link>
                    <Link to={"/register"}>Register</Link>
                </div>} 
                
           
        </nav>

    );
};

export default Header;