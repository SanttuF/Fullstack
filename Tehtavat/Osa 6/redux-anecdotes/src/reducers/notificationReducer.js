import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    notify (state, action) {
      return action.payload
    }
  }
})

export const { notify, clearNotify } = notificationSlice.actions
export default notificationSlice.reducer

export const setNotification = (msg, t) => {
  return async dispatch => {
    dispatch(notify(msg))
    setTimeout(() => {
      dispatch(notify(null))
    }, t * 1000)
}}