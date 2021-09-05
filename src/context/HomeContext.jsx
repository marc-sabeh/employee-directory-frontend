import { createContext, useContext } from "react";

export const HomeContext = createContext({
    users:null,
    getAllUsers: () => {}
});

export const useHome = () => {
    const {user, getAllUsers} = useContext(HomeContext);
    return {user, getAllUsers}
}