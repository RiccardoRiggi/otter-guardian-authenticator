# Otter Guardian Authenticator

Otter Guardian Authenticator è una Web Application che si occupa di gestire l'autenticazione a due fattori per il progetto [Otter Guardian](https://github.com/RiccardoRiggi/otter-guardian-fe)

![Home](https://raw.githubusercontent.com/RiccardoRiggi/otter-guardian-authenticator/main/screenshots/home.jpg)

Di seguito è presente la documentazione della sola componente authenticator.    

## Installazione e avvio
```sh
$ npm install
$ npm start
```

---

## Associare il dispositivo all'utente

![Associa nuovo dispositivo uno](https://raw.githubusercontent.com/RiccardoRiggi/otter-guardian-authenticator/main/screenshots/aggiungiDispositivoUno.jpg)

![Associa nuovo dispositivo due](https://raw.githubusercontent.com/RiccardoRiggi/otter-guardian-authenticator/main/screenshots/aggiungiDispositivoDue.jpg)

Per associare un nuovo dispositivo bisogna scegliere un nome e inquadrare il Qr Code generato dall'applicazione Otter Guardian

--- 

## Login tramite scansione di un Qr Code

![Login](https://raw.githubusercontent.com/RiccardoRiggi/otter-guardian-authenticator/main/screenshots/scansionaQrCode.jpg)

L'applicazione offre la possibilità di effettuare l'accesso scansionando il Qr Code generato da Otter Guardian

--- 

## Codice di verifica

![Codice di verifica](https://raw.githubusercontent.com/RiccardoRiggi/otter-guardian-authenticator/main/screenshots/codiceSecondoFattore.jpg)

Dopo aver richiesto un nuovo codice di verifica, apparirà la seguente schermata che mostra il codice da inserire.

--- 

## Autorizza l'accesso

![Autorizza l'accesso](https://raw.githubusercontent.com/RiccardoRiggi/otter-guardian-authenticator/main/screenshots/autorizzaAccesso.jpg)

Dopo aver richiesto l'autorizzazione dell'accesso apparirà la seguente schermata dove bisognerà approvare la richiesta.

--- 

## Bom / Diba

* [React](https://react.dev/)
* [React Redux](https://react-redux.js.org/)
* [React Qr Code](https://github.com/rosskhanas/react-qr-code)
* [React Qr Reader](https://github.com/JodusNodus/react-qr-reader)
* [Argon Dashboard 2](https://www.creative-tim.com/product/argon-dashboard)
* [Bootstrap](https://getbootstrap.com/) 
* [FontAwesome](https://fontawesome.com/)
* [React Toastify](https://fkhadra.github.io/react-toastify/introduction)
* [Favicon](https://www.iconfinder.com/icons/8665786/otter_animal_icon)

---

## Licenza

Il codice da me scritto viene rilasciato con licenza [MIT](https://github.com/RiccardoRiggi/otter-guardian-authenticator/blob/main/LICENSE). Framework, temi e librerie di terze parti mantengono le loro relative licenze. 