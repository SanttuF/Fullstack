import { TextInput as NativeTextInput, StyleSheet } from 'react-native'
import theme from '../theme'

const TextInput = ({ style, error, ...props }) => {
  const styles = StyleSheet.create({
    inputField: {
      borderColor: error ? theme.colors.error : theme.colors.textSecondary,
    },
  })

  const textInputStyle = [styles.inputField, style]

  return <NativeTextInput style={textInputStyle} {...props} />
}

export default TextInput
