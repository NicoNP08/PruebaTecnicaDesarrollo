import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import RoomsPage from './pages/RoomsPage';
import RoomsFormPage from './pages/RoomsFormPage';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './ProtectedRoute';
import { RoomsProvider } from './context/RoomsContext';
import Navbar from './components/Navbar';

function App() {
  return(
    <AuthProvider>
      <RoomsProvider>
        <BrowserRouter>
          <main className='container mx-auto px-10'>
            <Navbar />
              <Routes>
                <Route path='/' element={<HomePage />}></Route>
                <Route path='/login' element={<LoginPage />}></Route>
                <Route path='/register' element={<RegisterPage />}></Route>

                <Route element={<ProtectedRoute />}>
                  <Route path='/rooms' element={<RoomsPage />}></Route>
                  <Route path='/add-rooms' element={<RoomsFormPage />}></Route>
                  <Route path='/rooms/:id' element={<RoomsFormPage />}></Route>
                  <Route path='/profile' element={<ProfilePage />}></Route>
                </Route>
              </Routes>
          </main>
          </BrowserRouter>
      </RoomsProvider>
    </AuthProvider>
  )
}

export default App