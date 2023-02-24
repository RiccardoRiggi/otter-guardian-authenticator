import React from "react";

export const initialState = {

}

export const utenteReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'RESET_UTENTE':
            return {
                initialState
            }
        case 'FETCH_TOKEN':
            return {
                token: action.token
            }
        case 'FETCH_ID_DISPOSITIVO_FISICO':
            return {
                idDispositivoFisico: action.idDispositivoFisico
            }
        default:
            return state;
    }
}