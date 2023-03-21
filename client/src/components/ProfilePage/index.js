import {useState} from 'react';


function ProfilePage({ user}) {
    const [status,setStatus]=useState(false)

    return (<div> 
        <h2 class="mx-1">{user?.firstName} {user?.lastName} - {user?.email}</h2>
        <button class="mx-1" onClick={()=>setStatus(true)}>Are you ok? Click if you are!</button>
        <p class="mx-1">{status ? "I am safe!":"Waiting For Response"}</p>
        <hr></hr>
    </div>)
}

export default ProfilePage;