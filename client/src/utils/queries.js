import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      email
      latitude
      longitude
      altitude
    }
  }
`;

export const QUERY_USERS_PROFILE_PAGE = gql`
 query User {
  user {
    _id
    firstName
    lastName
    email
    latitude
    longitude
    altitude
  }
  usersWithoutCurr {
    lastName
    firstName
    _id
  }
}
`;

export const QUERY_FRIENDS = gql`
  query getFriends {
    getFriends {
      _id
      firstName
      lastName
      eqInProximity {
        title
        time
      }
    }
  }`;