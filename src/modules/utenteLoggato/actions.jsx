import React from "react";

export const resetUtenteAction  = (utente) => ({
    type: 'RESET_UTENTE',
    utente
})

export const fetchTokenAction  = (token) => ({
    type: 'FETCH_TOKEN',
    token
})

export const fetchIdDispositivoFisicoAction  = (idDispositivoFisico) => ({
    type: 'FETCH_ID_DISPOSITIVO_FISICO',
    idDispositivoFisico
})


