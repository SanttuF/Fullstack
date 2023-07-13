import { useMutation } from '@apollo/client'
import { CREATE_REVIEW } from '../graphql/mutations'

const useReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW)

  const createReview = async ({ ownerName, repositoryName, rating, text }) => {
    const r = await mutate({
      variables: { ownerName, repositoryName, rating, text },
    })
    return r
  }

  return [createReview, result]
}

export default useReview
