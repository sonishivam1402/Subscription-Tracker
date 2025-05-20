import React from 'react'
import axios from 'axios'

const addSubscription = async (data) => {
  const token = localStorage.getItem("token"); 
    try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/subscriptions`,data,{
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

export default addSubscription