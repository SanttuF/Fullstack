import { StyleSheet, View } from 'react-native'
import RepositoryList from './RepositoryList'
import AppBar from './AppBar'
import { Route, Routes, Navigate } from 'react-router-native'
import SignIn from './SignIn'
import theme from '../theme'
import SingleRepository from './SingleRepository'
import Review from './Review'
import SingUp from './SignUp'
import MyReviews from './MyReviews'

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackground,
  },
})

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/signin" element={<SignIn />} exact />
        <Route path="signup" element={<SingUp />} exact />
        <Route path="myreviews" element={<MyReviews />} exact />
        <Route path="/:id" element={<SingleRepository />} exact />
        <Route path="/review" element={<Review />} exact />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  )
}

export default Main
