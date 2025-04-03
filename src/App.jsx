import { react } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginForm from "./component/LoginForm"
import SignUpForm from './component/SignupForm'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginForm/>}></Route>
        <Route path='/signup' element={<SignUpForm/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
