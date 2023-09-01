import { Pressable, StyleSheet } from 'react-native'
import theme from '../theme'
import Text from './Text'
import { openURL } from 'expo-linking'

const styles = StyleSheet.create({
  button: {
    margin: 5,
    padding: 10,
    backgroundColor: theme.colors.primary,
    maxWidth: 600,
    borderRadius: 5,
    flexGrow: 1,
  },
  text: {
    color: theme.colors.light,
    textAlign: 'center',
  },
})

const LinkButton = ({ url }) => {
  return (
    <Pressable style={styles.button} onPress={() => openURL(url)}>
      <Text style={styles.text} fontWeight="bold">
        Open in GitHub
      </Text>
    </Pressable>
  )
}

export default LinkButton
