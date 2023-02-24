import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchMantieniMessaggiAction, fetchTestoDangerAction } from '../modules/feedback/actions';

export default function PrivateRoute({ children }: any) {
    const utenteLoggato = useSelector((state: any) => state.utenteLoggato);
    const dispatch = useDispatch();
    let path = window.location.pathname;

    const isAutorizzato = () => {
        let autorizzato = true;


        return autorizzato;
    }

    if (!isDispositivoPresente(utenteLoggato.idDispositivoFisico)) {
        return <Navigate to="/aggiungi-dispositivo" replace />;
    } else {
        return children;
    }
};






const isDispositivoPresente = (token: any) => {
    return token != null;
}