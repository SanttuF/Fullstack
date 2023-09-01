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
  const repositoryId = useParams().id
  const { repository, fetchMore } = useRepository({
    repositoryId,
    first: 8,
  })

  if (!repository) {
    return <></>
  }

  const reviews = repository.reviews.edges.map((edge) => edge.node)

  const onEndReach = () => {
    fetchMore()
  }

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} repo={false} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  )
}

export default SingleRepository
