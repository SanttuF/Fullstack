import { StyleSheet } from 'react-native'
import Text from './Text'
import theme from '../theme'
import { Link } from 'react-router-native'

const AppBarTab = ({ path, ...props }) => {
  const styles = StyleSheet.create({
    text: { color: theme.colors.light, margin: 7 },
  })

  return (
    <Link to={path}>
      <Text
        style={styles.text}
        fontWeight="bold"
        fontSize="subheading"
        {...props}
      />
    </Link>
  )
}

export default AppBarTab
