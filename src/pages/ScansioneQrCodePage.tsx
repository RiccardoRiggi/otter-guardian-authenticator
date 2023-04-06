import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { LoginInterface } from '../interfaces/LoginInterface';
import { fetchTestoDangerAction, fetchIsLoadingAction } from '../modules/feedback/actions';
import { fetchIdDispositivoFisicoAction, fetchTokenAction, resetUtenteAction } from '../modules/utenteLoggato/actions';
import QRCode from "react-qr-code";
import autenticazioneService from '../services/AutenticazioneService';
import { ToastContainer, toast } from 'react-toastify';
import { QrReader } from 'react-qr-reader';
import { isLoading } from '../modules/feedback/selector';
import { configurazione } from '../configurazione';



export default function ScansioneQrCodePage() {
    const dispatch = useDispatch();
    const feedback = useSelector((state: any) => state.feedback);
    const idDispositivoFisico = useSelector((state: any) => state.utenteLoggato.idDispositivoFisico);



    const [idQrCode, setIdQrCode] = React.useState("");


    let navigate = useNavigate();



    const autorizzaQrCode = async () => {


        let jsonBody: any = {
            idQrCode: idQrCode,
            idDispositivoFisico: idDispositivoFisico,
        }

        await autenticazioneService.autorizzaQrCode(jsonBody).then(response => {
            toast.success('Accesso avvenuto con successo!', {
                position: "top-center",
                autoClose: 5000,
            });
            navigate("/");

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



    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-5 text-center mx-auto">
                        <h1 onClick={() => dispatch(fetchIsLoadingAction(false))} className=" mb-2 mt-5"><i className={configurazione.icona + " text-primary"}></i></h1>
                        <p className="text-lead">{configurazione.nomeApplicativo}</p>
                    </div>
                </div>
            </div>
            {feedback.isLoading &&
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



            {
                <main className="main-content  mt-0">
                    <section>
                        <div className="page-header min-vh-70">
                            <div className="container">
                                <div className="row">
                                    <div className="shadow-lg bg-white rounded col-xl-4 col-lg-4 col-md-8 d-flex flex-column mx-0 mx-auto">
                                        <div className="card shadow-lg card-plain">
                                            <div className="card-header bg-transparent pb-0 text-start">
                                                <h4 className="font-weight-bolder">Accedi</h4>
                                                <p className="mb-0">Scansiona il QrCode per proseguire</p>
                                            </div>
                                            <div className="card-body">
                                                <QrReader
                                                    scanDelay={500}
                                                    onResult={(result, error) => {
                                                        if (!!result) {
                                                            setIdQrCode(result?.getText());
                                                        }

                                                        if (!!error) {
                                                            //console.info(error);
                                                        }
                                                    }}
                                                    constraints={{
                                                        facingMode: 'environment'
                                                    }}
                                                />
                                                {idQrCode &&
                                                    <div className='row d-flex align-items-center'>

                                                        <div className='col-12 pt-3'>
                                                            <span onClick={autorizzaQrCode} className="btn btn-lg btn-primary btn-lg w-100 mb-0" >Accedi</span>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                            <hr className='bg-dark' />
                                            <div className="card-body mx-0 pt-0 ">

                                                <div className='row d-flex align-items-center'>
                                                    <div className='col-12 text-center'>
                                                        <Link to="/" ><span className="btn btn-lg btn-primary btn-lg w-100 mb-0"><i className="cursor-pointer fa-solid fa-arrow-rotate-left fa-2x pe-2"></i>Indietro</span></Link>
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

