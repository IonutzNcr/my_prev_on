import React, { useEffect, useRef, useState } from 'react'
import Auth from '../Aut';
import { Navbar } from './Navbar';


export const Friends = () => {
    const [members, setMembers] = useState([]);
    const [friends, setFriends] = useState([]);
    const ref = useRef(null)

    useEffect(() => {
        async function getAllData() {
           

            let a = fetch(`https://api.betaseries.com/members/search?key=bdd22aad23fc&login=%yoyo`)
            let b = (await a).json()
            let c = await b 
            setMembers(c.users)

            let f = fetch(`https://api.betaseries.com/friends/list?key=bdd22aad23fc&token=${localStorage.getItem("access_token")}`)
            let r = (await f).json()
            let d = await r
            setFriends(d.users)
            console.log("my_friends", d.users)
                
        }
        getAllData()
    }, [])

    useEffect(() => {
        async function getFriendsData() {
            let f = fetch(`https://api.betaseries.com/friends/list?key=bdd22aad23fc&token=${localStorage.getItem("access_token")}`)
            let r = (await f).json()
            let d = await r
            setFriends(d.users)
        }
        getFriendsData()
    }
    , [friends])

    const searchMember = async () => {
        console.log("omg",ref.current.value)
        let f;
        if (ref.current.value === "") {
            f = fetch(`https://api.betaseries.com/members/search?key=bdd22aad23fc&login=%yo`)
        } else {
            f = fetch(`https://api.betaseries.com/members/search?key=bdd22aad23fc&login=${ref.current.value}`)
        }
        let r = (await f).json()
        let d = await r
        setMembers(d.users)
        console.log("omg c'est ocoooo", d.users)
    }

    const addFriend = async (user) => {
        console.log(user)
        let accessToken = localStorage.getItem("access_token")
        console.log(JSON.stringify({
            id: String(user.id),
            token: accessToken,
            
        }), "is the access token")
        const headers = {
            "X-BetaSeries-Key": "bdd22aad23fc",
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            "Accept": "application/json",
          };

    
        fetch(`https://api.betaseries.com/friends/friend?key=bdd22aad23fc`,{
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                id: String(user.id),
                token: accessToken,
                
            })
        })
        .then(data => data.json())
        .then(data => {
            setFriends([...friends, data.user])
            console.log("wtf",data)})
        .catch(err => console.log(err))

    
    }

    const removeFriend = async(user) => {
        console.log(user)
        let accessToken = localStorage.getItem("access_token")
        console.log(JSON.stringify({
            id: String(user.id),
            token: accessToken,
            
        }), "is the access token")
        const headers = {
            "X-BetaSeries-Key": "bdd22aad23fc",
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            "Accept": "application/json",
          };

    
        fetch(`https://api.betaseries.com/friends/friend?key=bdd22aad23fc`,{
            method: 'DELETE',
            headers: headers,
            body: JSON.stringify({
                id: String(user.id),
                token: accessToken,
                
            })
        })
        .then(data => data.json())
        .then(data => {
            // setFriends([...friends, data.user])
            console.log("c'est iccccccccccccccciiiii",data)})
        .catch(err => console.log(err))
    }
    return (
        <div>
            <Navbar />
            <div className='main_body'>
                
                <div className='members_body'>
                    <div className='barre-recherche'>
                        <input ref={ref} type="text" placeholder="Rechercher un membre" />
                        <button onClick={searchMember} className='btn-recherche' >Rechercher</button>
                    </div>
                    <div className='members_container'>
                    {members.map((member) => {
                       if(friends.find(friend => friend?.login === member?.login)) return null
                        //make console.log(member) infinite loop
                        return (<div className='member'>

                            <div className='member_info'>
                                <p>username: {member?.login}</p>
                                <p>user id: {member?.id}</p>
                                <p>xp: {member?.xp}</p>
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

                <div className='friends_body'>
                    {friends.map(friend => {
                        return (<div className='friend'>

                            <div className='friend_info'>
                                <div style={{width:"40px", height:"40px"}}>  
                                    <img style ={{width:40, height:40}} src={friend?.avatar} / >
                                </div>
                                <p>username: {friend?.login}</p>
                                <p>user id: {friend?.id}</p>    
                                <p>xp: {friend?.xp}</p>
                                <button onClick={()=>removeFriend(friend)} className='remove-btn'>Supprimer</button>
                            </div>
                        </div>)

                    })}
                </div>

            </div>
        </div>
    )
}
