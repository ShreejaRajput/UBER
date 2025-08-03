import { createContext, useContext, useState } from 'react';

// Create the context
 export const CaptainDataContext = createContext();

// Create the context provider component
export const CaptainContext = ({ children }) => {
    const [captain, setCaptain] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to login captain
    const loginCaptain = async (credentials) => {
        try {
            setIsLoading(true);
            // Add your API call here
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Function to logout captain
    const logoutCaptain = () => {
        setCaptain(null);
    };

    const value = {
        captain,
        setCaptain,
        isLoading,
        error,
        loginCaptain,
        logoutCaptain
    };

    return (
        <CaptainDataContext.Provider value={value}>
            {children}
        </CaptainDataContext.Provider>
    );
};


export default CaptainContext;