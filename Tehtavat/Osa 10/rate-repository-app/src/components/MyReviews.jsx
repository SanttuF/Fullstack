import { FlatList, StyleSheet, View } from 'react-native'
import useUser from '../hooks/useUser'
import ReviewItem from './ReviewItem'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
})

const ItemSeparator = () => <View style={styles.separator} />

const MyReviews = () => {
  const { reviews } = useUser(true)

  if (!reviews) {
    return <></>
  }

  const reviewNodes = reviews.edges.map((edge) => edge.node)

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} repo={true} />}
      keyExtractor={({ id }) => id}
    />
  )
}

export default MyReviews
