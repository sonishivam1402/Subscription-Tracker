import React from 'react'
import axios from 'axios';

const GetSignUp = async (name, email, password) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/auth/sign-up`, { name, email, password })
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export default GetSignUp;