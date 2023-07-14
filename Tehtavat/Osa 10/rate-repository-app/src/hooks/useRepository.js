import { useQuery } from '@apollo/client'
import { REPOSITORY } from '../graphql/queries'

const useRepository = (id) => {
  const { data, loading, refetch } = useQuery(REPOSITORY, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
  })

  if (loading) {
    return { repository: null, loading }
  }

  return { repository: data.repository, refetch }
}

export default useRepository
