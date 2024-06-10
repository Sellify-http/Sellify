import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        
        const authorize = async () => {
            try {
                const response = await fetch("http://localhost:4000/verify/home", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    console.log('Authorization success');
                } else {
                    navigate('/');
                }
            } catch (error) {
                console.log(error);
                navigate('/login');
            }
        };

        authorize();
    }, [navigate]);

    return (
        <div>Home</div>
    );
};
