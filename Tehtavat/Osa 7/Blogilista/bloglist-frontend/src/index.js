import ReactDOM from 'react-dom/client'
import App from './App'
import { NotificationContextProvider } from './contexts/NotificationContext'
import { QueryClient, QueryClientProvider } from 'react-query'
import { UserContextProvider } from './contexts/UserContext'
import { BrowserRouter as Router } from 'react-router-dom'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <NotificationContextProvider>
    <UserContextProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <App />
        </Router>
      </QueryClientProvider>
    </UserContextProvider>
  </NotificationContextProvider>
)
