import { useApolloClient, useMutation } from '@apollo/client'
import { SIGN_IN } from '../graphql/mutations'
import { useAuthStorage } from '../hooks/useAuthStorage'

const useSignIn = () => {
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()
  const [mutate, result] = useMutation(SIGN_IN)

  const signIn = async ({ username, password }) => {
    const r = await mutate({ variables: { username, password } })
    await authStorage.setAccessToken(r.data.authenticate.accessToken)
    apolloClient.resetStore()
    return r
  }

  return [signIn, result]
}

export default useSignIn
