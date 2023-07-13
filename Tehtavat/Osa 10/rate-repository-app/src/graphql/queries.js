import { gql } from '@apollo/client'
import { BASE_INFO, REVIEW_INFO } from './fragments'

export const GET_REPOSITORIES = gql`
  ${BASE_INFO}
  query Repositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
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

export const REPOSITORY = gql`
  ${BASE_INFO}
  ${REVIEW_INFO}
  query Repository($id: ID!) {
    repository(id: $id) {
      url
      ...baseInfo
      reviews {
        edges {
          node {
            ...reviewInfo
          }
        }
      }
    }
  }
`
