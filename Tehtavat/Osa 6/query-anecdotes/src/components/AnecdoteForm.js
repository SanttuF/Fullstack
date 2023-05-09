import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from '../requests'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const showError = () => {
    dispatch({type:'SET_NOTIFICATION', payload:'anecdote must be atleast 5 letters long'})
    setTimeout(() => {
      dispatch({type:'SET_NOTIFICATION', payload:null})
    }, 5000)
  }
  const showSucces = content => {
    dispatch({type:'SET_NOTIFICATION', payload:`new anecdote "${content}" created`})
    setTimeout(() => {
      dispatch({type:'SET_NOTIFICATION', payload:null})
    }, 5000)
  }

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content, votes:0}, {
      onError: showError,
      onSuccess: () => showSucces(content)
    })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
