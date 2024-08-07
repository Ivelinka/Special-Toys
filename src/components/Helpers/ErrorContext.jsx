//https://reactrouter.com/en/main/hooks/use-location
import { useState, useContext, createContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ErrorContext = createContext({error: undefined, setError: () => {}})

export function ErrorProvider({children}){

  const [error, setError] = useState("");

  let location = useLocation();

  useEffect(() => {
     setError("")
  }, [location]);

  useEffect(() => {
    if(error){
      // clearTimeOut
      setTimeout(() => {
        setError("")
      }, 2000)
    }  
 }, [error]);

  return (
    <ErrorContext.Provider value={{error, setError}}>
      {children}
    </ErrorContext.Provider>
  )
}

export function useErrorContext() {
  const {error, setError} = useContext(ErrorContext)
  return [error, setError];
}