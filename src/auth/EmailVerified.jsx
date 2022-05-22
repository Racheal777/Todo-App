import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom";

export default function EmailVerifiedd() {
    const { token } = useParams();
    const { id } = useParams()

    useEffect(() => {
        const checkVerified = async () => {
            const verify = await axios.get(`/api/users/verify-email/${id}/${token}`)
            if(verify){
                console.log(verify.data)
            }
        }
        checkVerified()
    })
  return (
    <div>
        
        
      <div className='success'>
                <h2>Email has been successfully Verified</h2>
                <Link to = "/">Login</Link>
            </div>  
    </div>
  )
}
