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
  ${REVIEW_INFO}
  ${BASE_INFO}
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...reviewInfo
            repository {
              ...baseInfo
            }
          }
        }
      }
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
