import { View, StyleSheet, ScrollView } from 'react-native'
import Constants from 'expo-constants'
import theme from '../theme'
import AppBarTab from './AppBarTab'
import { useQuery } from '@apollo/client'
import { ME } from '../graphql/queries'
import SingOut from './SignOut'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    padding: 10,
    backgroundColor: theme.colors.appBar,
  },
  scroll: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-evenly',
  },
})

const AppBar = () => {
  const { data, loading } = useQuery(ME)

  if (loading) return <View></View>

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scroll}>
        <AppBarTab path="/">Repositories</AppBarTab>
        {data.me ? <SingOut /> : <AppBarTab path="/signin">Sign In</AppBarTab>}
      </ScrollView>
    </View>
  )
}

export default AppBar
