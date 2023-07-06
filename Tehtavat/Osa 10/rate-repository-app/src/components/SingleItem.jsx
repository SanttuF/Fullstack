import { useQuery } from '@apollo/client'
import { ID } from '../graphql/queries'
import { View } from 'react-native-web'
import { RepositoryItem } from './RepositoryItem'

const SingleItem = () => {
  const r = useQuery(ID, { variables: { id: 'jaredpalmer.formik' } })

  if (r.loading) {
    return <></>
  }

  console.log(r)

  return <View>{/* <RepositoryItem item={data}></RepositoryItem> */}</View>
}

export default SingleItem
