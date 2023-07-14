import { RepositoryItem } from './RepositoryItem'
import { useParams } from 'react-router-native'
import useRepository from '../hooks/useRepository'
import { StyleSheet, View, FlatList } from 'react-native'
import ReviewItem from './ReviewItem'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
})

const ItemSeparator = () => <View style={styles.separator} />

const RepositoryInfo = ({ repository }) => {
  return (
    <View>
      <RepositoryItem item={repository} />
      <ItemSeparator />
    </View>
  )
}

const SingleRepository = () => {
  const id = useParams().id
  const { repository } = useRepository(id)

  if (!repository) {
    return <></>
  }

  const reviews = repository.reviews.edges.map((edge) => edge.node)

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} repo={false} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  )
}

export default SingleRepository
