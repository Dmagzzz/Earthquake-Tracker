import {useEffect,useState} from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries'; 

function ProfilePage() {
    const [user,setUser]=useState({})
    const [status,setStatus]=useState(false)
    const { loading, data } = useQuery(QUERY_USER);
    
    useEffect(() => {
        if (data) {
            setUser(data.user)
        } 
      }, [data, loading]);
    return (<div> 
        <h1>{user.firstName}</h1>
        <h2>{user.lastName}</h2>
        <button onClick={()=>setStatus(true)}>Are you ok? Click if you are!</button>
        <p>{status ? "I am safe!":"Waiting For Response"}</p>
    </div>)
}

export default ProfilePage;