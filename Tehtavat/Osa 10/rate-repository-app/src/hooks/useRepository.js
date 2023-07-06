import { useQuery } from '@apollo/client'
import { ID } from '../graphql/queries'

const useRepository = ({ id }) => {
  const { data, loading } = useQuery(ID, { variables: { id } })

  if (loading) {
    return null
  }

  return data
}
