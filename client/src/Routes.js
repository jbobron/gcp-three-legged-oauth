import { Route, Routes } from 'react-router-dom';
import RequireAuth from './RequireAuth';
import LoginRedirect from './LoginRedirect';
import Login from './Login'
import Home from './Home'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" index element={<Login />} />
      <Route
        path="/home"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
      <Route path="*" element={<LoginRedirect />} />
    </Routes>
  )
}

export default AppRoutes;