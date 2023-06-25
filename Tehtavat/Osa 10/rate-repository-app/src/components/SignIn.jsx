import Text from './Text'
import FormikTextInput from './FormikTextInput'
import { Formik } from 'formik'
import { Pressable, StyleSheet, View } from 'react-native'
import theme from '../theme'
import * as yup from 'yup'

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
  name: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
})

const initialValues = {
  name: '',
  password: '',
}

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        style={styles.inputField}
        name="name"
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
      <Pressable onPress={onSubmit} style={styles.button}>
        <Text style={styles.buttonText} fontWeight="bold">
          Sign in
        </Text>
      </Pressable>
    </View>
  )
}

const SignIn = () => {
  const onSubmit = ({ name, password }) => {
    console.log(name, password)
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

export default SignIn
