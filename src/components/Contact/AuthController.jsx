import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { useSessionContext } from './useSessionStorage';

import * as authService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({
    children,
}) => {
    const navigate = useNavigate();
    const [user, setUser] = useSessionContext("user",{});

    const isAdmin = Boolean(user.role === "admin");
    
    const onLogin = async (values) => {
        let newUser = {};
        try {
            newUser = await authService.login(values);
        } catch (error) {
            return alert(error.message);
        }
        setUser(newUser);
        navigate('/catalog');
    };
    
    const onLogout = async () => {
        try {
            await authService.logout();
        } catch (error) {
        }
        setUser({});
        localStorage.clear();
    };
    
    const onRegister = async (values) => {
        let newUser = {};
        const { repeatPassword, ...registerData } = values;
 
        try {
            if (repeatPassword !== registerData.password) {
                throw new Error ("Passwords don't match!")
            };

            newUser = await authService.register(registerData);
            
        } catch (error) {
            return alert(error.message);
        }
        setUser(newUser);
        navigate('/catalog');
    };

    const authContextValues = {
        onLogin,
        onLogout,
        onRegister,
        isAdmin,
        userId: user._id,
        token: user.accessToken,
        userEmail: user.email,
        isAuthenticated: !!user.accessToken,
    }
    
    return (
        <>
            <AuthContext.Provider value={authContextValues}>
                {children}
            </AuthContext.Provider>
        </>
    );
};