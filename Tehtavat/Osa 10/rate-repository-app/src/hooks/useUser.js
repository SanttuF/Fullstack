import { useQuery } from '@apollo/client'
import { ME } from '../graphql/queries'

const useUser = (includeReviews = false) => {
  const { data, loading, refetch } = useQuery(ME, {
    variables: { includeReviews },
  })

  if (loading) {
    return { reviews: null }
  }

  return { reviews: data.me.reviews, refetch }
}

export default useUser
