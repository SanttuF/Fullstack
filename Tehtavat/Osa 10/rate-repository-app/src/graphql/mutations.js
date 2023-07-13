import { gql } from '@apollo/client'
import { REVIEW_INFO } from './fragments'

export const SIGN_IN = gql`
  mutation singIn($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`

export const CREATE_REVIEW = gql`
  ${REVIEW_INFO}
  mutation createReview(
    $ownerName: String!
    $repositoryName: String!
    $rating: Int!
    $text: String
  ) {
    createReview(
      review: {
        ownerName: $ownerName
        repositoryName: $repositoryName
        rating: $rating
        text: $text
      }
    ) {
      ...reviewInfo
    }
  }
`

export const SIGN_UP = gql`
  mutation signUp($username: String!, $password: String!) {
    createUser(user: { username: $username, password: $password }) {
      username
    }
  }
`
