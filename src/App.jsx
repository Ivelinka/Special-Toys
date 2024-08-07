import { Routes, Route } from 'react-router-dom';

import Home from "./components/Home";
import CustomMenu from './components/CustomMenu';
import CustomMenu2 from './components/CustomMenu2';
import Dashboard from './components/Dashboard-Profile/Dashboard';
import Details from './components/Dashboard-Profile/Details';
import Edit from './components/Edit';
import Profile from './components/Dashboard-Profile/Profile'
import Purchase from './components/Dashboard-Profile/Purchase'
import Login from './components/Contact/Login';
import Register from './components/Contact/Register';
import Logout from './components/Contact/Logout';
import Header from './components/Header'
import Footer from "./components/Footer";
import NotFound from './components/NotFound';

import {SessionProvider} from './components/Contact/useSessionStorage' 
import {ErrorProvider} from './components/Helpers/ErrorContext'

function App() {

    return (
    <>
      <ErrorProvider> 
          
        <SessionProvider>

          <Header />

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/custom-menu' element={<CustomMenu />} />
            <Route path='/custom-menu2' element={<CustomMenu2 />} />
            <Route path='/dashboard/:category' element={<Dashboard />} />
            <Route path='/myProfile' element={<Profile />} />
            <Route path='/purchase' element={<Purchase />} />
            <Route path='/details/:id' element={<Details />} />
            <Route path='/edit/:id' element={<Edit />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='*' element={<NotFound />} />
        </Routes>

        <Footer />

    </SessionProvider>

  </ErrorProvider>        
            
</>
    );
}

export default App;