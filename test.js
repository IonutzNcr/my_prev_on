let obj = {
    name:"ionut",
    age:30, 
    city:"iasi",
    country:"romania"
}


for (let key in obj) {
    console.log("Ca c'est la clef: ", key, ";ca c'est la valeur: ", obj[key])
}

// rapport d'etonnement





// friends
import React, { useEffect, useRef, useState } from 'react'
import Auth from '../Aut';


export const Friends = () => {
    const [members, setMembers] = useState([]);
    const [friends, setFriends] = useState([]);
    const ref = useRef(null)

    useEffect(() => {
        async function getAllData() {
            let f = fetch(`https://api.betaseries.com/friends/list?key=bdd22aad23fc&token=${localStorage.getItem("access_token")}`)
            let r = (await f).json()
            let d = await r
            setFriends(d.users)
            console.log("my_friends", d.users)

            let a = fetch(`https://api.betaseries.com/members/search?key=bdd22aad23fc&login=%yoyo`)
            let b = (await a).json()
            let c = await b 
            setMembers(c.users)
                
        }
        getAllData()
    }, [])

    const searchMember = async () => {
        console.log(ref.current.value)
        let f;
        if (ref.current.value === "") {
            f = fetch(`https://api.betaseries.com/members/search?key=bdd22aad23fc&login=%yo`)
        } else {
            f = fetch(`https://api.betaseries.com/members/search?key=bdd22aad23fc&login=${ref.current.value}`)
        }
        let r = (await f).json()
        let d = await r
        setMembers(d.users)
        console.log(d.users)
    }

    const addFriend = async (user) => {
        console.log(user)

        const apiUrl = "https://api.betaseries.com/friends/friend";
        const apiKey = "bdd22aad23fc";
        let id = user.id;
        const token = "f778cc69c2da";
        
        const headers = {
          "X-BetaSeries-Key": apiKey,
          "Accept": "application/json",
        };
        
        const formData = new FormData();
        formData.append("id", id);
        formData.append("token", token);
        console.log("iciiii",formData)
        
        fetch(apiUrl, {
          method: 'POST',
          headers: headers,
          body: formData,
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            console.log("Response data:", data);
            // Handle the response data here
          })
          .catch(error => {
            console.error("Error:", error);
            // Handle errors here
          });
        

        // let accessToken = localStorage.getItem("access_token")
        // const headers = {
        //     "X-BetaSeries-Key": "bdd22aad23fc",
        //     "Authorization": `Bearer ${accessToken}`,
        //     "Accept": "application/json",
        //   };

        
        // fetch(`https://api.betaseries.com/friends/friend?key=bdd22aad23fc`,{
        //     method: 'POST',
        //     headers: headers,
        //     body: JSON.stringify({
        //         'id': user.id,
        //         'token': accessToken,
                
        //     })
        // })
        // .then(data => data.json())
        // .then(data => {
        //     // setFriends([...friends, data.user])
        //     console.log(data)})
    }

    return (
        <div>
            <Auth></Auth>
            <div className='main_body'>
                <div className='friends_body'>
                    {friends.map(friend => {
                        return (<div className='friend'>

                            <div className='friend_info'>
                                <p>username: {friend.login}</p>
                                <p>user id: {friend.id}</p>
                                <p>xp: {friend.xp}</p>
                            </div>
                        </div>)

                    })}
                </div>

                <div className='members_body'>
                    <div className='barre-recherche'>
                        <input ref={ref} type="text" placeholder="Rechercher un membre" />
                        <button onClick={searchMember} className='btn-recherche'  >Rechercher</button>
                    </div>
                    <div className='members_container'>
                    {members.map(member => {
                        return (<div className='member'>

                            <div className='member_info'>
                                <p>username: {member.login}</p>
                                <p>user id: {member.id}</p>
                                <p>xp: {member.xp}</p>
                                <button onClick = {()=>addFriend(member)} className='add-btn'>Ajouter</button>
                            </div>
                        </div>)

                    })}
                    {
                        members.length === 0 &&
                        <div className='not_found'>
                            <p>user not found with the name: {ref?.current?.value}</p>
                        </div>
                    }
                    </div>
                   

                </div>
            </div>
        </div>
    )
}


// problem: fettching a l'infini