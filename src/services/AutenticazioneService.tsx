import http from "../http-common";

let root = "/dispositivoFisico.php";



const abilitaDispositivoFisico = (jsonBody: any) => {
    const params = new URLSearchParams([["nomeMetodo", "abilitaDispositivoFisico"]]);
    return http.put(root,jsonBody, { params });
}

const getRichiesteDiAccessoPendenti = (jsonBody: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getRichiesteDiAccessoPendenti"]]);
    return http.post(root,jsonBody, { params });
}

const autorizzaQrCode = (jsonBody: any) => {
    const params = new URLSearchParams([["nomeMetodo", "autorizzaQrCode"]]);
    return http.post(root,jsonBody, { params });
}

const autorizzaAccesso = (jsonBody: any) => {
    const params = new URLSearchParams([["nomeMetodo", "autorizzaAccesso"]]);
    return http.post(root,jsonBody, { params });
}


const autenticazioneService = {
    abilitaDispositivoFisico,
    getRichiesteDiAccessoPendenti,
    autorizzaAccesso,
    autorizzaQrCode
};
export default autenticazioneService;