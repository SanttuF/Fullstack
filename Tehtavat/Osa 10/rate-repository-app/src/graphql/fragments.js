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
