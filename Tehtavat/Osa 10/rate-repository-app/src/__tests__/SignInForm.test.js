import { fireEvent, waitFor } from '@testing-library/react-native'
import { render, screen } from '@testing-library/react-native'
import { SignInContainer } from '../components/SignIn'

describe('Form', () => {
  it('calls function provided by onSubmit prop after pressing the submit button', async () => {
    const onSubmit = jest.fn()
    render(<SignInContainer onSubmit={onSubmit} />)

    fireEvent.changeText(screen.getByPlaceholderText('Username'), 'kalle')
    fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password')
    fireEvent.press(screen.getByText('Sign in'))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1)

      expect(onSubmit.mock.calls[0][0]).toEqual({
        username: 'kalle',
        password: 'password',
      })
    })
    expect(1).toBe(1)
  })
})
