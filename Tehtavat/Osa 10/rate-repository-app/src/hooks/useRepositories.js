import { useQuery } from '@apollo/client'
import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = () => {
  const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  })

  if (loading) {
    return { repositories: null, loading, refetch }
  }

  if (error) {
    console.error(error)
  }

  return { repositories: data.repositories, loading, refetch }
}

export default useRepositories
