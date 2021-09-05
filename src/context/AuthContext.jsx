import { createContext, useContext } from "react";

export const AuthContext = createContext({
    user:null,
    logIn: () => {},
    logOut: () => {},
    meFunc: () => {}
});

export const useUserSession = () => {
    const {user, logIn, logOut, meFunc} = useContext(AuthContext);
    return {user, logIn, logOut, meFunc}
}