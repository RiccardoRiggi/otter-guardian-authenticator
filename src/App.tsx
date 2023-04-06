import React from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import './App.css';
import PrivateRoute from './components/PrivateRoute';

import HomePage from './pages/HomePage';
import AggiungiDispositivoPage from './pages/AggiungiDispositivoPage';
import ScansioneQrCodePage from './pages/ScansioneQrCodePage';




function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="aggiungi-dispositivo" element={<AggiungiDispositivoPage />} />




          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />

          <Route
            path="scansiona-qr-code"
            element={
              <PrivateRoute>
                <ScansioneQrCodePage />
              </PrivateRoute>
            }
          />


        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
