import { useNotificationValue } from '../contexts/NotificationContext'
import { Alert } from '@mui/material'

const Notification = () => {
  const info = useNotificationValue()

  if (!info.message) {
    return
  }

  return (
    <Alert severity={info.type} variant="outlined">
      {info.message}
    </Alert>
  )
}

export default Notification
