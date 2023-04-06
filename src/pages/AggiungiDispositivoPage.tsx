import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchIsLoadingAction } from '../modules/feedback/actions';
import { fetchIdDispositivoFisicoAction } from '../modules/utenteLoggato/actions';
import autenticazioneService from '../services/AutenticazioneService';
import { toast } from 'react-toastify';
import { QrReader } from 'react-qr-reader';
import { configurazione } from '../configurazione';



export default function AggiungiDispositivoPage() {
    const dispatch = useDispatch();
    const feedback = useSelector((state: any) => state.feedback);


    const [idDispositivoFisico, setIdDispositivoFisico] = React.useState("");
    const [nomeDispositivo, setNomeDispositivo] = React.useState("");
    const [nomeDispositivoError, setNomeDispositivoError] = React.useState("");

    const [scanning, setScanning] = React.useState(false);

    let navigate = useNavigate();

    const avviaScansione = () => {
        if (nomeDispositivo == "") {
            setNomeDispositivoError("Il nome del dispositivo è richiesto");
            return;
        } else {
            setScanning(true);
        }
    }

    const abilitaDispositivoFisico = async () => {


        let jsonBody: any = {
            idDispositivoFisico: idDispositivoFisico,
            nomeDispositivo: nomeDispositivo,
        }

        await autenticazioneService.abilitaDispositivoFisico(jsonBody).then(response => {
            toast.success('Dispositivo aggiunto con successo!', {
                position: "top-center",
                autoClose: 5000,
            });
            dispatch(fetchIdDispositivoFisicoAction(idDispositivoFisico));
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
            setIdDispositivoFisico("");
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

            {!feedback.isLoading && !scanning &&
                <main className="main-content  mt-0">
                    <section>
                        <div className="page-header min-vh-70">
                            <div className="container">
                                <div className="row">
                                    <div className="shadow-lg bg-white rounded col-xl-4 col-lg-4 col-md-8 d-flex flex-column mx-0 mx-auto">
                                        <div className="card shadow-lg card-plain">
                                            <div className="card-header bg-transparent pb-0 text-start">
                                                <h4 className="font-weight-bolder">Aggiungi dispositivo</h4>
                                                <p className="mb-0">Inserisci un nome per identificare questo dispositivo</p>
                                            </div>
                                            <div className="card-body">
                                                <div className="mb-3">
                                                    <input className={nomeDispositivoError != "" ? "is-invalid form-control form-control-lg" : "form-control form-control-lg"} type="text" required onChange={(event) => { setNomeDispositivoError(""); setNomeDispositivo(event.currentTarget.value) }} value={nomeDispositivo} placeholder="Nome" aria-label="Nome" />
                                                    <div className="text-danger">
                                                        {nomeDispositivoError}
                                                    </div>
                                                </div>

                                            </div>


                                            <div className="card-body mx-0 pt-0 ">

                                                <div className='row d-flex align-items-center'>

                                                    <div className='col-12'>
                                                        <span onClick={avviaScansione} className="btn btn-lg btn-primary btn-lg w-100 mb-0" >Avanti</span>
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

            {scanning &&
                <main className="main-content  mt-0">
                    <section>
                        <div className="page-header min-vh-70">
                            <div className="container">
                                <div className="row">
                                    <div className="shadow-lg bg-white rounded col-xl-4 col-lg-4 col-md-8 d-flex flex-column mx-0 mx-auto">
                                        <div className="card shadow-lg card-plain">
                                            <div className="card-header bg-transparent pb-0 text-start">
                                                <h4 className="font-weight-bolder">Aggiungi dispositivo</h4>
                                                <p className="mb-0">Scansiona il codice qr presente a video</p>
                                            </div>
                                            <div className="card-body">
                                                <QrReader
                                                    scanDelay={500}
                                                    onResult={(result, error) => {
                                                        if (!!result) {
                                                            setIdDispositivoFisico(result?.getText());
                                                        }

                                                        if (!!error) {
                                                            //console.info(error);
                                                        }
                                                    }}
                                                    constraints={{
                                                        facingMode: 'environment'
                                                    }}
                                                />
                                                {idDispositivoFisico &&
                                                    <div className='row d-flex align-items-center'>

                                                        <div className='col-12'>
                                                            <span onClick={abilitaDispositivoFisico} className="btn btn-lg btn-primary btn-lg w-100 mb-0" >Autorizza</span>
                                                        </div>
                                                    </div>
                                                }
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

