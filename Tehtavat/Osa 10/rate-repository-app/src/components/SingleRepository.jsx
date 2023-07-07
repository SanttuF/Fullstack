import { RepositoryItem } from './RepositoryItem'
import { useParams } from 'react-router-native'
import useRepository from '../hooks/useRepository'
import { FlatList } from 'react-native-web'
import { StyleSheet, View } from 'react-native'
import Text from './Text'
import theme from '../theme'
import { format } from 'date-fns'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  review: {
    container: {
      display: 'flex',
      backgroundColor: theme.colors.light,
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    rating: {
      display: 'grid',
      height: 60,
      width: 60,
      borderRadius: 30,
      borderStyle: 'solid',
      borderColor: theme.colors.secondaryBlue,
      color: theme.colors.secondaryBlue,
      borderWidth: 3,
      margin: 10,
      textAlign: 'center',
      alignItems: 'center',
      fontSize: 20,
    },
    right: {
      flexDirection: 'column',
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
      <View>
        <Text style={styles.review.rating} fontWeight="bold">
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
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  )
}

export default SingleRepository
