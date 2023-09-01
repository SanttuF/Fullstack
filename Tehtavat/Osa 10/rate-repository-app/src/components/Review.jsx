import { Pressable, ScrollView, StyleSheet } from 'react-native'
import * as yup from 'yup'
import FormikTextInput from './FormikTextInput'
import theme from '../theme'
import Text from './Text'
import { Formik } from 'formik'
import { useNavigate } from 'react-router-native'
import useReview from '../hooks/useReview'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: theme.colors.light,
    padding: 10,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    padding: 15,
    margin: 10,
  },
  buttonText: {
    color: theme.colors.light,
    textAlign: 'center',
  },
  inputField: {
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 5,
    padding: 15,
    margin: 10,
  },
})

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number('Rating must be a number')
    .integer('Rating must be an integer')
    .min(0)
    .max(100)
    .required('Rating is required'),
  text: yup.string(),
})

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
}

const ReviewForm = ({ onSubmit }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FormikTextInput
        style={styles.inputField}
        name="ownerName"
        placeholder="Repository owner"
        placeholderTextColor={theme.colors.textPrimary}
      />
      <FormikTextInput
        style={styles.inputField}
        name="repositoryName"
        placeholder="Repository name"
        placeholderTextColor={theme.colors.textSecondary}
      />
      <FormikTextInput
        style={styles.inputField}
        name="rating"
        placeholder="Rating between 0 and 100"
        placeholderTextColor={theme.colors.textSecondary}
      />
      <FormikTextInput
        style={styles.inputField}
        name="text"
        placeholder="Review"
        multiline
        placeholderTextColor={theme.colors.textSecondary}
      />
      <Pressable onPress={onSubmit} style={styles.button}>
        <Text style={styles.buttonText} fontWeight="bold">
          Create review
        </Text>
      </Pressable>
    </ScrollView>
  )
}

const ReviewContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

const Review = () => {
  const [createReview] = useReview()
  const navigate = useNavigate()

  const onSubmit = async ({ ownerName, repositoryName, rating, text }) => {
    try {
      const { data } = await createReview({
        ownerName,
        repositoryName,
        rating: parseInt(rating),
        text,
      })
      console.log(data)
      navigate(`/${data.createReview.repositoryId}`)
    } catch (e) {
      console.error(e)
    }
  }

  return <ReviewContainer onSubmit={onSubmit} />
}

export default Review
