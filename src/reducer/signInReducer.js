import React from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie'


function signInReducer(state , action) {
    const cookies = new Cookies();
    // let navigator = useNavigate();

    if (action.type == "signIn") {
        return  action.payload
    }
    if (action.type == "signOut") {
        // navigator("/signIn")
        return action.payload
    }
}

export default signInReducer