import Text from './Text'
import { format } from 'date-fns'
import { Alert, Pressable, StyleSheet, View } from 'react-native'
import theme from '../theme'
import { useNavigate } from 'react-router-native'
import useRemove from '../hooks/useRemove'
import useUser from '../hooks/useUser'

const styles = StyleSheet.create({
  review: {
    container: {
      paddingTop: 10,
      paddingBottom: 10,
      backgroundColor: theme.colors.light,
      flexDirection: 'column',
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
    upper: {
      flexDirection: 'row',
    },
    lower: {
      flexDirection: 'row',
    },
    button: {
      padding: 12,
      marginLeft: 10,
      borderRadius: 3,
    },
  },
})

const ReviewItem = ({ review, repo }) => {
  const navigate = useNavigate()
  const { deleteReview } = useRemove()
  const { refetch } = useUser(true)

  const removeReview = (id) => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review',
      [
        {
          text: 'CANCEL',
          style: 'cancel',
        },
        {
          text: 'DELETE',
          onPress: () => {
            deleteReview(id)
            refetch()
          },
        },
      ]
    )
  }

  return (
    <View style={styles.review.container}>
      <View style={styles.review.upper}>
        <View style={styles.review.rating}>
          <Text style={styles.review.ratingText} fontWeight="bold">
            {review.rating}
          </Text>
        </View>
        <View style={styles.review.right}>
          <Text fontWeight="bold">
            {repo ? review.repository.fullName : review.user.username}
          </Text>
          <Text style={styles.review.date}>
            {format(new Date(review.createdAt), 'dd.mm.yyyy')}
          </Text>
          <Text style={styles.review.text}>{review.text}</Text>
        </View>
      </View>
      {repo ? (
        <View style={styles.review.lower}>
          <Pressable
            style={[
              { backgroundColor: theme.colors.primary },
              styles.review.button,
            ]}
            name="view"
            onPress={() => navigate(`/${review.repositoryId}`)}
          >
            <Text fontWeight="bold" style={{ color: theme.colors.light }}>
              View repository
            </Text>
          </Pressable>
          <Pressable
            style={[{ backgroundColor: 'red' }, styles.review.button]}
            name="delete"
            onPress={() => removeReview(review.id)}
          >
            <Text fontWeight="bold" style={{ color: theme.colors.light }}>
              Delete review
            </Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  )
}

export default ReviewItem
