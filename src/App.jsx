import { BrowserRouter ,Route, Routes} from 'react-router-dom'

import './App.css'

import Homepage from './Components/Homepage'
import FirebaseAuth from './Components/FirebaseAuth'
import FirebaseSignUp from './Components/FireBaseSignUp'

function App() {

  return (
    <BrowserRouter>
       <Routes>
    <Route path='/' element={<FirebaseAuth />}></Route>
    <Route path='/signup' element={<FirebaseSignUp />}></Route>

    <Route path='/gallery' element={<Homepage />}></Route>
</Routes>
    </BrowserRouter>
  )
}

export default App
