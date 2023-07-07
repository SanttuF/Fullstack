import { RepositoryItem } from './RepositoryItem'
import { useParams } from 'react-router-native'
import useRepository from '../hooks/useRepository'

const SingleItem = () => {
  const id = useParams().id
  const { repository } = useRepository(id)

  if (!repository) {
    return <></>
  }

  return <RepositoryItem item={repository}></RepositoryItem>
}

export default SingleItem
