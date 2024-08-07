import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { memo } from "react";
import { useSessionContext } from './useSessionStorage';
import { useErrorContext } from "../Helpers/ErrorContext";
import { helpLogin } from "../Helpers/ToyPromises";

export const LoginForm = () => {
        const initialValues = {
            username: "",
            email: "",
            password: "",
        };
        const [formValues, setFormValues] = useState(initialValues);
        const [session, setSession] = useSessionContext();
        const [err, setError] = useErrorContext()
        const navigate = useNavigate()

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormValues({ ...formValues, [name]: value });
        };

        const onLogin = (e) => {
            e.preventDefault();
            const { email, password } = formValues
            helpLogin(email, password).then(x => {
                setSession(x)
                navigate('/')
            }).catch(e => setError(e))
        };
    
    return (
<section id="login">
<form id="login-form" method="post">
    <div className="container">
        <h1>Login</h1>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="text" onChange={handleChange}/>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" name="password" onChange={handleChange}/>
        <input onClick={onLogin} type="submit" className="loginbtn" value="Login" />
        <div className="container signup">
            <p>Dont have an account?<Link to={"/register"}>Sign up</Link></p>
        </div>
    </div>
</form>
</section>      
    );
  };


export default memo(LoginForm);