import { useQuery } from '@apollo/client'
import { REPOSITORY } from '../graphql/queries'

const useRepository = (id) => {
  const { data, loading } = useQuery(REPOSITORY, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
  })

  if (loading) {
    return { repository: null, loading }
  }

  return { repository: data.repository, loading }
}

export default useRepository
