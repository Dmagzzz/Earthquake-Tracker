import { useState, useEffect } from "react";
// import { useStoreContext } from '../../utils/GlobalState';
import { useQuery } from "@apollo/client";
import { QUERY_FRIENDS } from "../../utils/queries";
// import { idbPromise } from '../../utils/helpers';
import spinner from "../../assets/spinner.gif";

function FriendList() {
  const [getFriend, setGetFriend] = useState([]);

  const { loading, data } = useQuery(QUERY_FRIENDS);
  console.log(data);
  useEffect(() => {
    if (data) {
      setGetFriend(data.getFriends);
    }
    //   else if (!loading) {
    //     idbPromise('products', 'get').then((products) => {
    //       dispatch({
    //         type: UPDATE_PRODUCTS,
    //         products: products,
    //       });
    //     });
    //   }
  }, [data, loading]);

  // If we use this, we need to create a QUERY_FRIENDS query.

  return (
    <div className="my-2">
      <h2>Friends:</h2>
      {getFriend?.length ? (
        <div className="flex-row">
          {getFriend.map((friend) => (
            <>
              <p>{friend.firstName} {friend.lastName}</p>
              { console.log(friend.eqInProximity)}
              <table className="distanceData">

              {friend.eqInProximity.map(eq => {
              return <div className="eq-wrapper">
              <div className="eqTitle">
                <p>{eq?.title}</p>
                </div>
                <div className="eqTime">
                  <p> {eq?.time} </p>
                </div> 
                </div>

              })}
            </table>
          
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
