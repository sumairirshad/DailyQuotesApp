import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../Firebase';

const UserContext = createContext();

const UserProvider = (props) => {
    // user null = loading
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            (authUser ? setUser(authUser) : setUser(false));
        });
        return unsubscribe;
    }, []);

    return (
        <UserContext.Provider
            value={{
                user
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };