import { Image, Pressable, StyleSheet, View } from 'react-native'
import Text from './Text'
import theme from '../theme'
import Stat from './Stat'
import { useNavigate } from 'react-router-native'
import LinkButton from './LinkButton'

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
  language: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.light,
    padding: 5,
    alignSelf: 'flex-start',
    borderRadius: 5,
    marginTop: 5,
  },
})

export const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container} testID="repositoryItem">
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
      {item.url !== undefined ? <LinkButton url={item.url} /> : null}
    </View>
  )
}

const RepositoryItemWrap = ({ item }) => {
  const navigate = useNavigate()
  return (
    <Pressable onPress={() => navigate(`/${item.id}`)}>
      <RepositoryItem item={item} />
    </Pressable>
  )
}

// for some reason needed to make useNavigate hook work,
const RepositoryItemWrapWrap = ({ item }) => {
  return <RepositoryItemWrap item={item} />
}

export default RepositoryItemWrapWrap
