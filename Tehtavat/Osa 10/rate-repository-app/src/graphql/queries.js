import { gql } from '@apollo/client'
import { BASE_INFO } from './fragments'

export const GET_REPOSITORIES = gql`
  ${BASE_INFO}
  query {
    repositories {
      edges {
        node {
          ...baseInfo
        }
      }
    }
  }
`

export const ME = gql`
  query {
    me {
      id
      username
    }
  }
`

export const ID = gql`
  ${BASE_INFO}
  query id($id: ID!) {
    repository(id: $id) {
      url
      ...baseInfo
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`
