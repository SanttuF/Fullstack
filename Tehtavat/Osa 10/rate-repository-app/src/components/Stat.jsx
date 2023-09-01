import { StyleSheet, View } from 'react-native'
import Text from './Text'

const Stat = ({ number, label }) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
    },
    text: {
      textAlign: 'center',
    },
  })

  const parseNumber = (n) =>
    n < 1000 ? number : (number / 1000).toFixed(1) + 'k'

  return (
    <View style={styles.container}>
      <Text style={styles.text} fontWeight="bold">
        {parseNumber(number)}
      </Text>
      <Text style={styles.text}>{label}</Text>
    </View>
  )
}

export default Stat
