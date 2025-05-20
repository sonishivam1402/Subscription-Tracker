import axios from 'axios'
import React from 'react'

const GetLogin = async (email, password) => {
  
    try{
        const response  = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/auth/sign-in`,{email, password})
        console.log(response.data);
        return response.data;
    } catch(err){
        console.log(err);
    }
}

export default GetLogin