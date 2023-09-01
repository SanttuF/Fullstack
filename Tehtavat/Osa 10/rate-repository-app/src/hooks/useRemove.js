import { useMutation } from '@apollo/client'
import { DELETE_REVIEW } from '../graphql/mutations'

const useRemove = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW)

  const deleteReview = async (id) => {
    const r = await mutate({ variables: { id } })
    return r
  }

  return { deleteReview, result }
}

export default useRemove
