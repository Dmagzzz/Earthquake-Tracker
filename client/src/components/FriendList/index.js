// import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_FRIENDS } from "../../utils/queries";
import spinner from "../../assets/spinner.gif";

function FriendList() {
  // const [getFriend, setGetFriend] = useState([]);

// Using the query QUERY_FRIENDS to get the data
  const { loading, data } = useQuery(QUERY_FRIENDS);
  const getFriend = data?.getFriends || [];
  // console.log(data);
  // useEffect(() => {
  //   if (data) {
  //     setGetFriend(data.getFriends);
  // }, [data, loading]);

  // If we use this, we need to create a QUERY_FRIENDS query.

  // Using maps, we can get the friend data of their names, close earthquake titles and dates. 
  return (
    <div className="my-2">
      <h2>Friends:</h2>
      {getFriend?.length ? (
        <div className="flex-row">
          {getFriend.map((friend) => (
            <>
              <p>{friend.firstName} {friend.lastName}</p>
              { console.log(friend.eqInProximity)}
              <div className="distanceData">

              {friend.eqInProximity.slice(0,5).map(eq => {
              return <div className="eq-wrapper">
              <div className="eqTitle">
                <p>Title: {eq?.title}</p>
                </div>
                <div className="eqTime">
                  <p> Date: {eq?.time} </p>
                </div> 
                </div>

              })}
            </div>
          
            </>

          ))}
        </div>
      ) : (
        <h3>You haven't added any friends yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default FriendList;
