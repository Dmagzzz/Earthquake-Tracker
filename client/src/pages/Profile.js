import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import { UPDATE_COORDINATES } from '../utils/mutations';
import ProfilePage from "../components/ProfilePage";
import FriendList from "../components/FriendList";


function Profile() {
  const [updateCoordinates] = useMutation(UPDATE_COORDINATES);
  // Here we set two state variables for firstName and lastName using `useState`
  const [formState, setFormState] = useState({
    latitude: "",
    longitude: "",
    altitude: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: parseFloat(value),
    });
  };

  const handleFormSubmit = async (e) => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    e.preventDefault();
    const mutationResponse = await updateCoordinates({
      variables: {
        coordinates: formState
      }
    });
    // Alert the user their coordinates have been updated, clear the inputs
    alert(`Your coordinates have been updated`);
    // setFormState({
    //   latitude: "",
    //   longitude: "",
    //   altitude: "",
    // });
  };

  // dropdown - array
  // actual array is named friends, under models/User.js
  var standins = [{firstName: "", lastName: ""},{firstName: "Ben", lastName: "Dover"}, {firstName: "Hugh", lastName: "Jass"}] 

  return (
    <div>
      <p>Enter your coordinates:</p>
      <form className="form">
        <input
          value={formState.latitude}
          name="latitude"
          onChange={handleInputChange}
          type="text"
          placeholder="Latitude"
        />
        <input
          value={formState.longitude}
          name="longitude"
          onChange={handleInputChange}
          type="text"
          placeholder="Longitude"
        />
        <input
          value={formState.altitude}
          name="altitude"
          onChange={handleInputChange}
          type="text"
          placeholder="Altitude"
        />
        <button type="button" onClick={handleFormSubmit}>
          Submit
        </button>
      </form>


      <ProfilePage/>
      
        <FriendList />

      {/* dropdown menu for friends */}
      <form id = "friendslist">

          <select id="dropdown">
            {standins.map((item) => (
              <option key={item.firstName} value={item.lastName}>
                {item.firstName} {item.lastName}
              </option>
            ))}
          </select>
          <input type="submit" id="submitfriend">Submit</input>
      </form>
    </div>

  );
}

export default Profile;
