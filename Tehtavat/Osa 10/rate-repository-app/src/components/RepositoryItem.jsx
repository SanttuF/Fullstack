import { Image, StyleSheet, View } from 'react-native'
import Text from './Text'
import theme from '../theme'
import Stat from './Stat'

const RepositoryItem = ({ item }) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.light,
      flexDirection: 'column',
      padding: 10,
    },
    header: {
      flexDirection: 'row',
    },
    title: {
      marginLeft: 15,
      flex: 1,
    },
    text: {
      flexWrap: 'wrap',
    },
    stats: {
      flexDirection: 'row',
      marginTop: 15,
      justifyContent: 'space-evenly',
      maxWidth: 600,
      minWidth: 250,
    },
    logo: {
      width: 50,
      height: 50,
      borderRadius: 5,
    },
    image: {},

    language: {
      backgroundColor: theme.colors.primary,
      color: theme.colors.light,
      padding: 5,
      alignSelf: 'flex-start',
      borderRadius: 5,
      marginTop: 5,
    },
  })

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.image}>
          <Image style={styles.logo} source={{ uri: item.ownerAvatarUrl }} />
        </View>
        <View style={styles.title}>
          <Text style={styles.text} fontWeight="bold">
            {item.fullName}
          </Text>
          <Text style={styles.text} color="textSecondary">
            {item.description}
          </Text>
          <Text style={styles.language}>{item.language}</Text>
        </View>
      </View>

      <View style={styles.stats}>
        <Stat label="Stars" number={item.stargazersCount} />
        <Stat label="Forks" number={item.forksCount} />
        <Stat label="Reviews" number={item.reviewCount} />
        <Stat label="Rating" number={item.ratingAverage} />
      </View>
    </View>
  )
}

export default RepositoryItem
