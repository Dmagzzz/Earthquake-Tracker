import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_FRIEND, UPDATE_COORDINATES } from "../utils/mutations";
import { QUERY_USERS_PROFILE_PAGE } from "../utils/queries";
import ProfilePage from "../components/ProfilePage";
import FriendList from "../components/FriendList";

function Profile() {
  const [updateCoordinates] = useMutation(UPDATE_COORDINATES);
  const [addFriend] = useMutation(ADD_FRIEND);
  const [user, setUser] = useState({});
  const [newFriendId, setNewFriendId] = useState("");
  const { loading, data } = useQuery(QUERY_USERS_PROFILE_PAGE);
  // const { loadingUsers, usersWithoutCurr } = useQuery(QUERY_USERS_WITHOUT_CURR);

  useEffect(() => {
    if (data) {
      setUser(data.user);
      setNewFriendId(data.usersWithoutCurr[0]?._id || "");
    }
  }, [data, loading]);

  // set state with inputs
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  // update coordinates when the submit (onClick) is executed
  const handleFormSubmit = async (e) => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    e.preventDefault();
    const mutationResponse = await updateCoordinates({
      variables: {
        coordinates: {
          latitude: parseFloat(user?.latitude),
          longitude: parseFloat(user?.longitude),
          altitude: parseFloat(user?.altitude),
        },
      },
    });
    // Alert the user their coordinates have been updated, clear the inputs
    alert(`Your coordinates have been updated`);
  };

  // dropdown - array
  // actual array is named friends, under models/User.js
  // var standins = [
  //   { firstName: "", lastName: "" },
  //   { firstName: "Ben", lastName: "Dover" },
  //   { firstName: "Hugh", lastName: "Jass" },
  // ];
  const handleAddFriend = async () => {
    const mutationResponse = await addFriend({
      variables: {
        friendId: newFriendId,
      },
    });
    window.location.reload();
  };

  return (
    <div id="middle">
      <>
        <h1 class="mx-1">Profile</h1>
        <ProfilePage user={user} />
      </>

      <p id="middle column"  class="mx-1">Enter your coordinates:</p>
      <form className="form" id="middle column" class="mx-1">
        <input class="mx-1"
          value={user.latitude}
          name="latitude"
          onChange={handleInputChange}
          type="text"
          placeholder="Latitude"
        />
        <input class="mx-1"
          value={user.longitude}
          name="longitude"
          onChange={handleInputChange}
          type="text"
          placeholder="Longitude"
        />
        <input class="mx-1"
          value={user.altitude}
          name="altitude"
          onChange={handleInputChange}
          type="text"
          placeholder="Altitude"
        />
        <button type="button" onClick={handleFormSubmit} class="mx-1">
          Submit
        </button>
      </form>
      <FriendList />
      {data?.usersWithoutCurr?.length && (
        <div id="middle" class="mx-1">
          <select
            onChange={(e) => setNewFriendId(e.target.value)}
            id="dropdown"
          >
            {data.usersWithoutCurr.map((user) => (
              <option key={user?._id} value={user?._id}>
                {user?.firstName} {user?.lastName}
              </option>
            ))}
          </select>
          <button onClick={handleAddFriend}>Add Friend</button>
        </div>
      )}
    </div>
  );
}

export default Profile;
