import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_COORDINATES  } from "../utils/mutations";
import { QUERY_USER } from '../utils/queries';
import ProfilePage from "../components/ProfilePage";
import FriendList from "../components/FriendList";

function Profile() {
  const [updateCoordinates] = useMutation(UPDATE_COORDINATES);
  const [user, setUser] = useState({});
  const { loading, data } = useQuery(QUERY_USER);

  useEffect(() => {
    if (data) {
      setUser(data.user);
    }
  }, [data, loading]);


  // set state with inputs
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: parseFloat(value),
    });
  };
  // update coordinates when the submit (onClick) is executed
  const handleFormSubmit = async (e) => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    e.preventDefault();
    const mutationResponse = await updateCoordinates({
      variables: {
        coordinates: {
          latitude: user.latitude,
          longitude: user.longitude,
          altitude: user.altitude,
        },
      },
    });
    // Alert the user their coordinates have been updated, clear the inputs
    alert(`Your coordinates have been updated`);
  };

  // dropdown - array
  // actual array is named friends, under models/User.js
  var standins = [
    { firstName: "", lastName: "" },
    { firstName: "Ben", lastName: "Dover" },
    { firstName: "Hugh", lastName: "Jass" },
  ];

  return (
    <div>
      <>
        <h2>Profile</h2>
      </>
      <p>Enter your coordinates:</p>
      <form className="form">
        <input
          value={user.latitude}
          name="latitude"
          onChange={handleInputChange}
          type="text"
          placeholder="Latitude"
        />
        <input
          value={user.longitude}
          name="longitude"
          onChange={handleInputChange}
          type="text"
          placeholder="Longitude"
        />
        <input
          value={user.altitude}
          name="altitude"
          onChange={handleInputChange}
          type="text"
          placeholder="Altitude"
        />
        <button type="button" onClick={handleFormSubmit}>
          Submit
        </button>
      </form>

      <ProfilePage user={user} />

      <FriendList />

      {/* dropdown menu for friends */}
      {/* <form id = "friendslist">

          <select id="dropdown">
            {standins.map((item) => (
              <option key={item.firstName} value={item.lastName}>
                {item.firstName} {item.lastName}
              </option>
            ))}
          </select>
          <input type="submit" id="submitfriend">Submit</input>
      </form> */}
    </div>
  );
}

export default Profile;
