import { gql } from '@apollo/client'
import { BASE_INFO, REVIEW_INFO } from './fragments'

export const GET_REPOSITORIES = gql`
  ${BASE_INFO}
  query Repositories(
    $after: String
    $first: Int
    $orderDirection: OrderDirection
    $orderBy: AllRepositoriesOrderBy
    $searchKeyword: String
  ) {
    repositories(
      after: $after
      first: $first
      orderDirection: $orderDirection
      orderBy: $orderBy
      searchKeyword: $searchKeyword
    ) {
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      edges {
        cursor
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
  query Query($repositoryId: ID!, $first: Int, $after: String) {
    repository(id: $repositoryId) {
      ...baseInfo
      reviews(first: $first, after: $after) {
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
        edges {
          cursor
          node {
            ...reviewInfo
          }
        }
      }
    }
  }
`
