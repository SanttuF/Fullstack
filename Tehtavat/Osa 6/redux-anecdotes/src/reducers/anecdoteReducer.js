import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdotes(state, action) {
      state.push(action.payload)
    },
    changeAndecdote(state, action) {
      const newAne = action.payload
      return state.map(ane => ane.id !== newAne.id ? ane : newAne)
    }
  }
})

export const { setAnecdotes, appendAnecdotes, changeAndecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.addAnecdote(content)
    dispatch(appendAnecdotes(newAnecdote))
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.changeAnecdote({...anecdote, votes: anecdote.votes + 1})
    dispatch(changeAndecdote(newAnecdote))
  }
}
