import React, { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'

export const Authorization = () => {

    const navigate = useNavigate()

    useEffect(() => {
        console.log("hhhhhh")
        const url = new URLSearchParams(window.location.search);
        console.log(url.get('code'))
        // https://api.betaseries.com/oauth/access_token
        fetch('https://api.betaseries.com/oauth/access_token?key=bdd22aad23fc', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'client_id': 'bdd22aad23fc',
                'code': url.get('code'),
                'redirect_uri': 'http://localhost:3000/authorization',
                'client_secret': 'be14def1119b6af008e7d3e87708b195',
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                localStorage.setItem("access_token", data.access_token);
                if(data.access_token){
                    navigate("/")
                } else {
                    console.log("error",data.errors)
                }
               
            }
            )
            .catch((error) => {
                console.error('Error:', error);
            }
            );


    }, [])

    return (
        <div>Authorization</div>
    )
}
