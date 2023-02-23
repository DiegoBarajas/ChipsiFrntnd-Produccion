import "./App.scss";
import "./Styles/var.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import VerClientes from './Pages/VerClientes';
import AgregarCliente from './Pages/AgregarCliente';
import Notificar from './Pages/Notificar';
import Privacidad from './Pages/Privacidad';
import Terminos from './Pages/Terminos';




function App() {

  return (
    <BrowserRouter>
        <Routes>

          <Route path="/" element={ <VerClientes/> } />
          <Route path="/notificar/agregar" element={ <AgregarCliente/> } />
          <Route path="/notificar/:id" element={ <Notificar/> } />

          <Route path="/privacidad" element={ <Privacidad/> } />
          <Route path="/terminos" element={ <Terminos/> } />

        </Routes>
    </BrowserRouter>
  );
}

export default App;
