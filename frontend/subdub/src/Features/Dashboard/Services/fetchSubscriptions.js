import React from 'react'
import axios from 'axios';

const fetchSubscriptions = async (id) => {
    const token = localStorage.getItem("token"); 
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/subscriptions/user/${id}`,{
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
        console.log(response.data);
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export default fetchSubscriptions