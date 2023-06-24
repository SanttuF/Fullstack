import { Pressable, StyleSheet } from 'react-native'
import Text from './Text'

const AppBarTab = ({ ...props }) => {
  const styles = StyleSheet.create({
    text: { color: 'white' },
  })

  return (
    <Pressable onPress={() => console.log('abc')}>
      <Text
        style={styles.text}
        fontWeight="bold"
        fontSize="subheading"
        {...props}
      />
    </Pressable>
  )
}
export default AppBarTab
