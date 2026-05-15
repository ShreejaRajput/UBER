import React, { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../context/userContext";
import { useNavigate } from 'react-router-dom';
import api from '../utils/axiosInstance';

const UserProtectedWrapper = ({ children }) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const { setUser } = useContext(UserDataContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }

        api.get('/users/profile').then(response => {
            if (response.status === 200) {
                setUser(response.data.user);
                setIsLoading(false);
            }
        }).catch(err => {
            console.log(err);
            if (err.response?.status === 401) {
                localStorage.removeItem('token');
                navigate('/login');
            } else {
                setIsLoading(false);
            }
        });
    }, [token]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <>{children}</>;
}

export default UserProtectedWrapper;