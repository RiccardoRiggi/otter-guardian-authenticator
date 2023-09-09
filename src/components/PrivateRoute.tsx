import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchMantieniMessaggiAction, fetchTestoDangerAction } from '../modules/feedback/actions';
import Cookies from 'js-cookie';


export default function PrivateRoute({ children }: any) {

  

    if (!isDispositivoPresente(Cookies.get('idDispositivoFisico'))) {
        return <Navigate to="/aggiungi-dispositivo" replace />;
    } else {
        return children;
    }
};






const isDispositivoPresente = (token: any) => {
    return token != null;
}