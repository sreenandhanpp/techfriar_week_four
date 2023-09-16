import { useEffect, useState } from 'react'
import { Link, Routes, Route, useNavigate } from 'react-router-dom'
import  Home  from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import { Provider } from 'react-redux'
import store from './redux/store'
import { getItem } from '../localStorage/getItem'
import { RequireAuth } from '../components/RequireAuth'
import AdminDashboard from './pages/AdminDashboard'
import './index.css'
import EditUser from './pages/EditUser'
import CreateUser from './pages/CreateUser'
import { AuthAdmin } from '../components/AuthAdmin'

function App() {
  const [user, setUser] = useState();
  const [admin, setAdmin] = useState();
  

  return (
    <>
      <Provider store={store}>
        <Routes>
          
          <Route exact path="/create-user" element={<CreateUser />} />
          <Route exact path="/" element={<RequireAuth>  <Home /></RequireAuth>} />
          <Route exact path="/edit/:id" element={<EditUser />} />
          <Route exact path='/admin-dashboard' element={<AuthAdmin>  <AdminDashboard /> </AuthAdmin> } />
         
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
        </Routes>
      </Provider>
    </>
  )
}

export default App
