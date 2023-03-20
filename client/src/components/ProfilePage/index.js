import {useState} from 'react';


function ProfilePage({ user}) {
    const [status,setStatus]=useState(false)

    return (<div> 
        <h1>{user.firstName} {user.lastName}</h1>
        <h2>{user.email}</h2>
        <button onClick={()=>setStatus(true)}>Are you ok? Click if you are!</button>
        <p>{status ? "I am safe!":"Waiting For Response"}</p>
    </div>)
}

export default ProfilePage;