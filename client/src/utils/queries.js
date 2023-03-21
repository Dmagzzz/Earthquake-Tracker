import { gql } from '@apollo/client';


// export const QUERY_FRIENDS = gql`
//   query getFriend($category: ID) {
//     user(category: $category) {
//       _id
//      firstName
//      lastName
//      latitude
//      longitude
//      altitude
//      userStatus
//     }
//   }
// `;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;

export const QUERY_ALL_PRODUCTS = gql`
  {
    products {
      _id
      name
      description
      price
      quantity
      category {
        name
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

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
  query getFriends{
    getFriends{
      firstName
      lastName
      eqInProximity{ title, time }
    }
  }`;