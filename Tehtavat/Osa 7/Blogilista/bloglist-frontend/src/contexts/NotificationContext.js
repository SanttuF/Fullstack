/* eslint-disable indent */
import { createContext, useContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload
    case 'CLEAR_NOTIFICATION':
      return ''
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, setNotification] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={[notification, setNotification]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => useContext(NotificationContext)[0]

export const useNotify = () => {
  const notiDispatch = useContext(NotificationContext)[1]

  const notifyWith = (message, type = 'info') => {
    notiDispatch({
      type: 'SET_NOTIFICATION',
      payload: {
        message,
        type,
      },
    })

    setTimeout(() => {
      notiDispatch({ type: 'CLEAR_NOTIFICATION' })
    }, 3000)
  }

  return notifyWith
}

export default NotificationContext
