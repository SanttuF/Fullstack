import { useQuery } from '@apollo/client'
import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = (order, searchKeyword) => {
  let orderBy = ''
  let orderDirection = ''
  switch (order) {
    case 'latest':
      orderBy = 'CREATED_AT'
      orderDirection = 'DESC'
      break
    case 'highest':
      orderBy = 'RATING_AVERAGE'
      orderDirection = 'DESC'
      break
    case 'lowest':
      orderBy = 'RATING_AVERAGE'
      orderDirection = 'ASC'
      break
  }

  const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: { orderBy, orderDirection, searchKeyword },
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
