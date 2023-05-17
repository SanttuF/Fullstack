/* eslint-disable indent */
import { createContext, useContext, useReducer } from 'react'

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload
    case 'CLEAR_USER':
      return ''
    default:
      return state
  }
}

const UserContext = createContext()

export const UserContextProvider = (props) => {
  const [user, setUser] = useReducer(userReducer, '')

  return (
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  )
}

export const useUserValue = () => useContext(UserContext)[0]
export const useUserDispatch = () => useContext(UserContext)[1]

export default UserContext
