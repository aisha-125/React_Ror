import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import Auth from './interfaces/Auth/Auth';
import Profile from './interfaces/Profile/Profile';
import ActList from './interfaces/Activities-list/ActivitiesList';

import { useContext, useEffect } from 'react';


import {
  Route,
  Routes,
  BrowserRouter,
  Navigate
} from 'react-router-dom';

import { AuthProvider, AuthContext } from './context/AuthContext/AuthContext';
import AuthService from './services/Auth/auth.service';
import Activity from './interfaces/Activity/Activity';

function App() {
  const userContext = useContext(AuthContext);

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      AuthService.checkAuth().then(res => {
        userContext[1](res);
      }).catch(
        err => console.error(err)
      );
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Header />
        <main className='content-container'>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<Auth />} />
            <Route
              path="/profile"
              element={userContext[0] !== 'visit' ? <Profile /> : <Navigate to="/" />}
            />
            <Route path="/activities" element={<ActList />} />
            <Route path='/activities/activity/:id' element={<Activity />} />
          </Routes>
        </main>
      </BrowserRouter>
      <Footer />
    </>
  );
}

function AddProviderApp() {
  return (
    <div className="App">
      <AuthProvider>
        <App />
      </AuthProvider>
    </div>
  );
}

export default AddProviderApp;