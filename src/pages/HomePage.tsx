import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getData, getOra } from '../DateUtil';
import { fetchIsLoadingAction } from '../modules/feedback/actions';
import autenticazioneService from '../services/AutenticazioneService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { configurazione } from '../configurazione';


export default function HomePage() {

    const dispatch = useDispatch();
    const feedback = useSelector((state: any) => state.feedback);
    const idDispositivoFisico = useSelector((state: any) => state.utenteLoggato.idDispositivoFisico);

    const [avviato, setAvviato] = React.useState(false);

    const [idInterval, setIdInterval] = React.useState("");
    const [codice, setCodice] = React.useState("");
    const [oraCreazione, setOraCreazione] = React.useState("");
    const [dataCreazione, setDataCreazione] = React.useState("");
    const [idTwoFact, setIdTwoFact] = React.useState("");
    const [indirizzoIp, setIndirizzoIp] = React.useState("");
    const [idTipoLogin, setIdTipoLogin] = React.useState("");

    const navigate = useNavigate();

    var interval: any;


    const avviaRicercaTentativiAppesi = () => {
        setAvviato(true);
        interval = setInterval(async () => {


            let jsonBody: any = {
                idDispositivoFisico: idDispositivoFisico,
            }

            await autenticazioneService.getRichiesteDiAccessoPendenti(jsonBody).then(response => {

                console.info(response.data);

                if (response.data.length == 0) {
                    setCodice("");
                    setDataCreazione("");
                    setIdTipoLogin("");
                    setIdTwoFact("");
                    setIndirizzoIp("");
                } else if ("EMAIL_PSW_BACKUP_CODE" != response.data[0].idTipoLogin) {
                    setCodice(response.data[0].codice);
                    setOraCreazione(getOra(response.data[0].dataCreazione))
                    setDataCreazione(getData(response.data[0].dataCreazione));
                    setIdTipoLogin(response.data[0].idTipoLogin);
                    setIdTwoFact(response.data[0].idTwoFact);
                    setIndirizzoIp(response.data[0].indirizzoIp);
                    //clearInterval(interval);
                }


            }).catch(e => {
                //---------------------------------------------
                try {
                    console.error(e);
                    toast.error(e.response.data.descrizione, {
                        position: "top-center",
                        autoClose: 5000,
                    });
                } catch (e: any) {
                    toast.error("Errore imprevisto", {
                        position: "top-center",
                        autoClose: 5000,
                    });
                }
                
                //---------------------------------------------v
            });
        }, 2000);
        setIdInterval(interval);
    }


    const scansionaQrCode = () => {
        clearInterval(idInterval);
        navigate("/scansiona-qr-code");
    }

    const autorizzaAccesso = async () => {

        let jsonBody: any = {
            idDispositivoFisico: idDispositivoFisico,
            idTwoFact: idTwoFact
        }

        await autenticazioneService.autorizzaAccesso(jsonBody).then(response => {
            setIdTipoLogin("");
            toast.success('Accesso autorizzato con successo!', {
                position: "top-center",
                autoClose: 5000,
            });
        }).catch(e => {
            //---------------------------------------------
            try {
                console.error(e);
                toast.error(e.response.data.descrizione, {
                    position: "top-center",
                    autoClose: 5000,
                });
            } catch (e: any) {
                toast.error("Errore imprevisto", {
                    position: "top-center",
                    autoClose: 5000,
                });
            }
            
            //---------------------------------------------

        });
    }


    return (<>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-5 text-center mx-auto">
                    <h1 onClick={() => dispatch(fetchIsLoadingAction(false))} className=" mb-2 mt-5"><i className={configurazione.icona + " text-primary"}></i></h1>
                    <p className="text-lead">{configurazione.nomeApplicativo}</p>
                </div>
            </div>
        </div>
        {
            feedback.isLoading &&
            <>
                <main className="main-content  mt-0">
                    <section>
                        <div className="page-header min-vh-70">
                            <div className="container">
                                <div className="row">
                                    <div className='col-12 text-center'>
                                        <i className="text-primary fa-3x fa-solid fa-spinner fast-spin fa-spin"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </>
        }

        {!feedback.isLoading && avviato &&
            <main className="main-content  mt-0">
                <section>
                    <div className="page-header min-vh-70">
                        <div className="container">
                            <div className="row">
                                <div className="shadow-lg bg-white rounded col-xl-4 col-lg-4 col-md-8 d-flex flex-column mx-0 mx-auto">
                                    <div className="card shadow-lg card-plain">
                                        <div className="card-header bg-transparent pb-0 text-start">
                                            <span className='text-center'>
                                                <h4 className="font-weight-bolder">{idTipoLogin != "" && !idTipoLogin.includes("TELEGRAM") ? "Nuova richiesta in attesa!" : "Nessuna richiesta pendente"}</h4>
                                            </span>
                                            {idTipoLogin != "" && !idTipoLogin.includes("REC_") && !idTipoLogin.includes("TELEGRAM") && <>
                                                <p className="mb-0">Richiesta generata alle ore <strong>{oraCreazione}</strong> del <strong>{dataCreazione}</strong> dall'indirizzo ip <strong>{indirizzoIp}</strong></p>
                                                <hr className='bg-primary' />
                                                {idTipoLogin.includes("PSW") && <p className='mb-0'>La richiesta è avvenuta mediante l'inserimento della tua password, se non sei stato tu <strong>adotta immediatamente contromisure</strong>!<br /><br /><strong>Finché non approvi la richiesta nessuno potrà avere accesso al tuo account!</strong></p>}
                                                {!idTipoLogin.includes("PSW") && <p className='mb-0'>Se sei stato tu approva l'accesso, altrimenti ignora semplicemente questo messaggio.</p>}
                                            </>
                                            }
                                            {idTipoLogin != "" && idTipoLogin.includes("REC_") && !idTipoLogin.includes("TELEGRAM") && <>
                                                <p className="mb-0">Richiesta generata alle ore <strong>{oraCreazione}</strong> del <strong>{dataCreazione}</strong> dall'indirizzo ip <strong>{indirizzoIp}</strong></p>
                                                <hr className='bg-primary' />
                                                <p className='mb-0'>Utilizza questo codice temporaneo per cambiare la tua password</p>
                                            </>
                                            }
                                        </div>

                                        <div className="card-body mx-0 pt-3 pb-0">

                                            <div className='row d-flex align-items-center'>

                                                <div className='col-12 text-center'>
                                                    {
                                                        idTipoLogin.includes("SIX") && !idTipoLogin.includes("TELEGRAM") && <>
                                                            <h1 className='fs-1'>{codice}</h1>
                                                        </>
                                                    }

                                                    {
                                                        idTipoLogin.includes("SI_NO") && !idTipoLogin.includes("TELEGRAM") && <>
                                                            <span onClick={autorizzaAccesso} className="btn btn-lg btn-outline-primary btn-lg w-100 mb-0" >Approva la richiesta<i className="ps-2 fa-solid fa-check"></i></span>

                                                        </>
                                                    }
                                                </div>
                                            </div>

                                        </div>
                                        <hr className='bg-dark' />
                                        <div className="card-body mx-0 pt-0 ">

                                            <div className='row d-flex align-items-center'>
                                                <div className='col-12 text-center'>
                                                    <span className="btn btn-lg btn-primary btn-lg w-100 mb-0" onClick={scansionaQrCode}><i className="cursor-pointer fa-solid fa-qrcode fa-2x pe-2"></i>Scansiona QR Code</span>
                                                </div>

                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        }

        {!feedback.isLoading && !avviato &&
            <main className="main-content  mt-0">
                <section>
                    <div className="page-header min-vh-70">
                        <div className="container">
                            <div className="row">
                                <div className="shadow-lg bg-white rounded col-xl-4 col-lg-4 col-md-8 d-flex flex-column mx-0 mx-auto">
                                    <div className="card shadow-lg card-plain">

                                        <div className="card-body">



                                        </div>
                                        <div className="card-body mx-0 pt-0 ">

                                            <div className='row d-flex align-items-center'>

                                                <div className='col-12 text-center'>
                                                    <span onClick={avviaRicercaTentativiAppesi} ><i className="fa-solid fa-shake fa-power-off fa-4x text-secondary" ></i></span>
                                                </div>
                                            </div>

                                        </div>
                                        <hr className='bg-dark' />
                                        <div className="card-body mx-0 pt-0 ">

                                            <div className='row d-flex align-items-center'>
                                                <div className='col-12 text-center'>
                                                    <span className="btn btn-lg btn-primary btn-lg w-100 mb-0" onClick={scansionaQrCode}><i className="cursor-pointer fa-solid fa-qrcode fa-2x pe-2"></i>Scansiona QR Code</span>
                                                </div>

                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        }
    </>
    );

}