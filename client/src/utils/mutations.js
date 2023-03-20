import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const UPDATE_COORDINATES = gql`
  mutation updateCoordinates($coordinates: CoordinatesInput!) {
    updateCoordinates(coordinates: $coordinates) {
        latitude
        longitude
        altitude
      }
    
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation addFriend(
    $firstName: String!
    $lastName: String!
    $latitude: Number!
    $longitude: Number!
    $altitude: Number!
    $userStatus: Boolean!

  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      latitude: $latitude
      longitude: $longitude
      altitude: $altitude
      userStatus: $userStatus
    ) {
      token
      user {
        _id
      }
    }
  }
`;