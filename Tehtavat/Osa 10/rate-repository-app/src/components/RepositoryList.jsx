import { FlatList, View, StyleSheet, TextInput } from 'react-native'
import useRepositories from '../hooks/useRepositories'
import RepositoryItemWrapWrap from './RepositoryItem'
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import { useDebounce } from 'use-debounce'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  picker: {
    padding: 5,
    borderRadius: 7,
  },
  inputField: {
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
    margin: 2,
  },
})

const ItemSeparator = () => <View style={styles.separator} />

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { order, filter, setOrder, setFilter } = this.props

    return (
      <View>
        <TextInput
          placeholder="filter"
          style={styles.inputField}
          value={filter}
          onChangeText={(value) => setFilter(value)}
        ></TextInput>
        <Picker
          style={styles.picker}
          selectedValue={order}
          onValueChange={(value) => setOrder(value)}
        >
          <Picker.Item label="Latest repositories" value="latest" />
          <Picker.Item label="Highest rated repositories" value="highest" />
          <Picker.Item label="Lowest rated repositories" value="lowest" />
        </Picker>
      </View>
    )
  }

  render() {
    const { repositories, onEndReach } = this.props

    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : []

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={RepositoryItemWrapWrap}
        ListHeaderComponent={this.renderHeader}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    )
  }
}

const RepositoryList = () => {
  const [order, setOrder] = useState('latest')
  const [filter, setFilter] = useState('')
  const [debounceFilter] = useDebounce(filter, 500)

  let orderBy = ''
  let orderDirection = ''
  switch (order) {
    case 'latest':
      orderBy = 'CREATED_AT'
      orderDirection = 'DESC'
      break
    case 'highest':
      orderBy = 'RATING_AVERAGE'
      orderDirection = 'DESC'
      break
    case 'lowest':
      orderBy = 'RATING_AVERAGE'
      orderDirection = 'ASC'
      break
  }

  const { repositories, fetchMore } = useRepositories({
    first: 8,
    orderBy,
    orderDirection,
    searchKeyword: debounceFilter,
  })

  const onEndReach = () => {
    fetchMore()
  }

  return (
    <RepositoryListContainer
      repositories={repositories}
      order={order}
      filter={filter}
      setOrder={setOrder}
      setFilter={setFilter}
      onEndReach={onEndReach}
    />
  )
}

export default RepositoryList
