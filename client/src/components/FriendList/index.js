import { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_FRIENDS } from "../../utils/queries";
import spinner from "../../assets/spinner.gif";
import moment from "moment";

function FriendList() {
  // const [getFriend, setGetFriend] = useState([]);

  // Using the query QUERY_FRIENDS to get the data
  const { loading, data } = useQuery(QUERY_FRIENDS);
  const getFriend = data?.getFriends || [];
  const [show, setShow] = useState([]);
  // console.log(data);
  // useEffect(() => {
  //   if (data) {
  //     setGetFriend(data.getFriends);
  // }, [data, loading]);

  // If we use this, we need to create a QUERY_FRIENDS query.
  if (loading) {
    return "Loading...";
  }

  const handleShow = (id) => {
    const currentShow = [ ...show ]
    const isShowing = currentShow?.find(item => item === id)
    console.log(isShowing, "Hello")
    if (isShowing) {
      const newShow = currentShow.filter(item => item !== id)
      setShow(newShow)
    } else {
      setShow(prev => [...prev, id])
    }
  }
  // Using maps, we can get the friend data of their names, close earthquake titles and dates.
  return (
    <div className="my-2">
      <h2>Friends:</h2>
      {getFriend?.length ? (
        <div className="flex-row">
          {getFriend.map((friend) => {
            const isShow = show?.find(item => item === friend._id)
            return (
            <div key={friend._id}>
              <p>
                {friend.firstName} {friend.lastName}
              </p>
              <button
                onClick={() => handleShow(friend._id)

                }
              >
                {isShow ? "Show Less" : "Show More"}
              </button>
              {isShow && (
                <div className="distanceData">
                  {friend.eqInProximity.slice(0, 5).map((eq) => {
                    return (
                      <div key={eq._id} className="eq_wrapper">
                        <div className="eqTitle">
                          <p>Title: {eq.title}</p>
                        </div>
                        <div className="eqTime">
                          <p>
                            Date:
                            {moment
                              .unix(eq.time / 1000)
                              .format("MM/DD/YYYY hh:mm:ss")}{" "}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )})}
        </div>
      ) : (
        <h3>You haven't added any friends yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default FriendList;
