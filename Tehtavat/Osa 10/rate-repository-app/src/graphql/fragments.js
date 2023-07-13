import { gql } from '@apollo/client'

export const BASE_INFO = gql`
  fragment baseInfo on Repository {
    id
    description
    fullName
    forksCount
    language
    ownerAvatarUrl
    ratingAverage
    reviewCount
    stargazersCount
  }
`

export const REVIEW_INFO = gql`
  fragment reviewInfo on Review {
    id
    repositoryId
    text
    rating
    createdAt
    user {
      id
      username
    }
  }
`
