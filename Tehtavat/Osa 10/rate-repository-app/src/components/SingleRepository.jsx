import { RepositoryItem } from './RepositoryItem'
import { useParams } from 'react-router-native'
import useRepository from '../hooks/useRepository'
import { StyleSheet, View, FlatList } from 'react-native'
import Text from './Text'
import theme from '../theme'
import { format } from 'date-fns'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  review: {
    container: {
      paddingTop: 10,
      paddingBottom: 10,
      backgroundColor: theme.colors.light,
      flexDirection: 'row',
    },
    rating: {
      display: 'flex',
      height: 60,
      width: 60,
      borderRadius: 30,
      borderStyle: 'solid',
      borderColor: theme.colors.secondaryBlue,
      borderWidth: 3,
      margin: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    ratingText: {
      fontSize: 20,
      color: theme.colors.secondaryBlue,
    },
    right: {
      flexDirection: 'column',
      flex: 1,
    },
    date: {
      color: theme.colors.textSecondary,
      marginTop: 1,
      marginBottom: 2,
    },
    text: {
      flexWrap: 'wrap',
      maxWidth: 540,
    },
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

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.review.container}>
      <View style={styles.review.rating}>
        <Text style={styles.review.ratingText} fontWeight="bold">
          {review.rating}
        </Text>
      </View>
      <View style={styles.review.right}>
        <Text fontWeight="bold">{review.user.username}</Text>
        <Text style={styles.review.date}>
          {format(new Date(review.createdAt), 'dd.mm.yyyy')}
        </Text>
        <Text style={styles.review.text}>{review.text}</Text>
      </View>
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
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id || console.log(id)}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  )
}

export default SingleRepository
