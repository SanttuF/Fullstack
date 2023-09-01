import { Pressable, StyleSheet } from 'react-native'
import Text from './Text'
import theme from '../theme'
import { useApolloClient } from '@apollo/client'
import { useNavigate } from 'react-router-native'
import { useAuthStorage } from '../hooks/useAuthStorage'

const styles = StyleSheet.create({
  button: {
    margin: 7,
    color: theme.colors.light,
  },
})

const SingOut = () => {
  const apolloClient = useApolloClient()
  const navigate = useNavigate()
  const authStorage = useAuthStorage()

  const handlePress = () => {
    authStorage.removeAccessToken()
    apolloClient.resetStore()
    navigate('/')
  }

  return (
    <Pressable onPress={handlePress}>
      <Text style={styles.button} fontWeight="bold" fontSize="subheading">
        Sing Out
      </Text>
    </Pressable>
  )
}

export default SingOut
