import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import CourseDetail from './pages/CourseDetail'
import Courses from './pages/Courses'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Admin from './pages/Admin/Admin'
import UpdateC from './components/admin/UpdateC'
import AddC from './components/admin/AddC'
import ManageVC from './components/admin/ManageVC'
import RemoveC from './components/admin/RemoveC'
import LogoutA from './components/admin/LogoutA'
import RemoveV from './components/admin/RemoveV'
import ManageV from './components/admin/ManageV'
import Client from './pages/Client/Client'
import PlayCourse from './components/client/PlayCourse'
import LogoutC from './components/client/LogoutC'
import ModifierIC from './components/client/ModifierIC'
import ModifierP from './components/client/ModifierP'
import Search from './pages/Search'
import LoginA from './components/admin/LoginA'
import AuthContextProvider from './contexts/Auth-Context'
import CartContextProvider from './contexts/CartContext'
import Favorite from './pages/Favorite'
import AddCategorie from './components/admin/AddCategorie'
import AddV from './components/admin/AddV'
import FavContextProvider from './contexts/Fav-Context'
import UpdateCatA from './components/admin/UpdateCatA'
import RemoveCatA from './components/admin/RemoveCatA'

function App() {

  return (
  <FavContextProvider>
    <AuthContextProvider>
      <CartContextProvider>
        <Router>
          <Routes>
            {/*Admin routes*/}
            <Route path='/admin/login' element={<LoginA/>}/>
            <Route path='/admin/:i' element={<Admin/>}/>
            <Route path='/admin/update-course/:idC' element={<UpdateC/>}/>
            <Route path='/admin/manage-videos/:idC' element={<ManageVC/>}/>
            <Route path='/admin/remove-course/:idC' element={<RemoveC/>}/>
            <Route path='/admin/manage-videos/:idC/modifier/:idV' element={<ManageV/>}/>
            <Route path='/admin/manage-videos/:idC/remove/:idV' element={<RemoveV/>}/>
            <Route path='/admin/add-course' element={<AddC/>}/>
            <Route path='/admin/add-categorie' element={<AddCategorie/>}/>
            <Route path='/admin/update-categorie/:idCat' element={<UpdateCatA/>}/>
            <Route path='/admin/remove-categorie/:idCat' element={<RemoveCatA/>}/>
            <Route path='/admin/add-video/:idC' element={<AddV/>}/>
            <Route path='/admin/logout' element={<LogoutA/>}/>
            {/*User routes*/}
            <Route path='/profile/:i' element={<Client/>}/>
            <Route path='/profile/course/:idC' element={<PlayCourse/>}/>
            <Route path='/profile/modifierI' element={<ModifierIC/>}/>
            <Route path='/profile/modifierP' element={<ModifierP/>}/>
            <Route path='/profile/logout' element={<LogoutC/>}/>
            <Route path='/profile/modifierI' element={<ModifierIC/>} />
            <Route path='/profile/modifierP' element={<ModifierP/>} />
            {/*Global routes*/}
            <Route path='/' element={<Home/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/favorite' element={<Favorite/>}/>
            <Route path='/checkout' element={<Checkout/>}/>
            <Route path='/courseDetail/:id' element={<CourseDetail/>}/>
            <Route path='/courses/:c' element={<Courses/>}/>
            <Route path='/courses' element={<Courses/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/search/:search' element={<Search/>}/>
          </Routes>
        </Router>
      </CartContextProvider>
    </AuthContextProvider>
  </FavContextProvider>
  )
}

export default App
