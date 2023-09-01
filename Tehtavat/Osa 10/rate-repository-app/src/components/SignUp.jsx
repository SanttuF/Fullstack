import { Pressable, ScrollView, StyleSheet } from 'react-native'
import theme from '../theme'
import * as yup from 'yup'
import FormikTextInput from './FormikTextInput'
import Text from './Text'
import { Formik } from 'formik'
import useSignIn from '../hooks/useSignIn'
import { useNavigate } from 'react-router-native'
import useSignUp from '../hooks/useSignUp'

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
  username: yup.string().min(5).max(30).required('Username is required'),
  password: yup.string().min(5).max(30).required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password doesnt match!')
    .required('Password confirmation is required'),
})

const initialValues = {
  username: '',
  password: '',
  confirmPassword: '',
}

const SignUpForm = ({ onSubmit }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FormikTextInput
        style={styles.inputField}
        name="username"
        placeholder="Username"
        placeholderTextColor={theme.colors.textPrimary}
      />
      <FormikTextInput
        style={styles.inputField}
        name="password"
        placeholder="Password"
        secureTextEntry
        placeholderTextColor={theme.colors.textSecondary}
      />
      <FormikTextInput
        style={styles.inputField}
        name="confirmPassword"
        placeholder="Repeat password"
        secureTextEntry
        placeholderTextColor={theme.colors.textSecondary}
      />
      <Pressable onPress={onSubmit} style={styles.button}>
        <Text style={styles.buttonText} fontWeight="bold">
          Sign in
        </Text>
      </Pressable>
    </ScrollView>
  )
}

const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

const SingUp = () => {
  const [signUp] = useSignUp()
  const [signIn] = useSignIn()
  const navigate = useNavigate()

  const onSubmit = async ({ username, password }) => {
    try {
      const { data } = await signUp({ username, password })
      console.log(data)
      await signIn({ username, password })
      navigate('/')
    } catch (e) {
      console.error(e)
    }
  }

  return <SignUpContainer onSubmit={onSubmit} />
}

export default SingUp
