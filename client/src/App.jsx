import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import {
  Dashboard,
  Register,
  Landing,
  Error,
  Login,
  Stats,
  AllJobs,
  Profile,
  AddJobs,
  EditJobs,
} from './pages'
import { store } from './store'
import { loader as dashboardLoader } from './pages/Dashboard'
import { loader as allJobsLoader } from './pages/AllJobs'
import { loader as showStatsLoader} from './pages/Stats'
import { action as addJobAction } from './components/AddJobForm'
import { action as registerAction } from './pages/Register'
import { action as loginAction } from './pages/Login'
import { action as updateUserAction} from './components/ProfileForm'
import { action as updateJobAction} from './components/EditJobForm'


export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
    },
  },
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
    errorElement: <Error />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    errorElement: <Error />,
    loader: dashboardLoader(store),
    children: [
      {
        index: true,
        element: <AddJobs />,
        action: addJobAction(store, queryClient),
      },
      {
        path: 'all-jobs',
        element: <AllJobs />,
        loader: allJobsLoader(store, queryClient),
      },
      {
        path: 'stats',
        element: <Stats />,
        loader: showStatsLoader(store),
      },
      {
        path: 'profile',
        element: <Profile />,
        action: updateUserAction(store),
      },
      {
        path: 'edit-job',
        element: <EditJobs />,
        action: updateJobAction(store, queryClient),
      },
    ],
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <Error />,
    action: registerAction,
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
    action: loginAction(store),
  },
])

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={true}/>
    </QueryClientProvider>
  )
}
export default App
