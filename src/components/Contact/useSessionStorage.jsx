//https://typeofnan.dev/using-session-storage-in-react-with-hooks/

import { useState, useEffect, useContext, createContext } from 'react';

function getSessionStorageOrDefault(key, defaultValue) {
  const stored = sessionStorage.getItem(key);
  if (!stored) {
    return defaultValue;
  }
  console.log(stored)
  return JSON.parse(stored);
}

export function useSessionStorage(key, defaultValue) {
  const [value, setValue] = useState(
    getSessionStorageOrDefault(key, defaultValue)
  );

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}


const SessionContext = createContext({session: undefined, setSession: () => {}})
export function useSessionContext() {
    const {session, setSession} = useContext(SessionContext)
    return [session, setSession];
  }

export function SessionProvider({children}){
  const [session, setSession] = useSessionStorage('session', null);
  return (
    <SessionContext.Provider value={{session, setSession}}>
      {children}
    </SessionContext.Provider>
  )
}
