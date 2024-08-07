import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { memo } from "react";
import { useSessionContext } from './useSessionStorage';
import { helpRegister } from "../Helpers/ToyPromises";
import { useErrorContext } from "../Helpers/ErrorContext";

export const RegisterForm = () => {
    const initialValues = {
        email: "",
        password: "",
        confirmPassword: "",
        gender: ""
    };
    const [formValues, setFormValues] = useState(initialValues);
    
    // const [isSubmit, setIsSubmit] = useState(false);
    const [session, setSession] = useSessionContext();
    const [err, setError] = useErrorContext()
    const navigate = useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target; // input poleto
        setFormValues({ ...formValues, [name]: value });
    };

    const onRegister = (e) => {
        e.preventDefault();
        const { email, password,confirmPassword, gender } = formValues
        helpRegister(email, password, confirmPassword, gender).then(x => {
            setSession(x)
            navigate('/')
        }).catch(e => setError(e))
    };   

    return (
<section id="register">
<form id="login-form" method="post">
    <div className="container">
        <h1>Register</h1>
        <label htmlFor="email">Email</label>
        <input id="email" placeholder="Enter Email" name="email" type="text" onChange={handleChange}/>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" placeholder="Enter Password" name="password" onChange={handleChange}/>
        <label htmlFor="repeat-password">Repeat Password</label>
        <input id="repeat-password" type="password" placeholder="Repeat Password" name="confirmPassword" onChange={handleChange}/>
        <label>Gender</label>
        <label><input type="radio" placeholder="Gender" name="gender" value="male" onChange={handleChange}/>
            Male</label>
        
        <label><input type="radio" placeholder="Gender" name="gender" value="female" onChange={handleChange}/>
            Female</label>
        
        <input onClick={onRegister} type="submit" className="registerbtn" value="Register" />
        <div className="container signin">
            <p>Already have an account?<Link to={"/login"}>Sign in</Link></p>
        </div>
    </div>
</form>
</section>      
    );
};

export default memo(RegisterForm);