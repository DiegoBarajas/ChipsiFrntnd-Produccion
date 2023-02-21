import "./App.scss";
import "./Styles/var.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import VerClientes from './Pages/VerClientes';
import AgregarCliente from './Pages/AgregarCliente';
import Notificar from './Pages/Notificar';


function App() {

  return (
    <BrowserRouter>
        <Routes>

          <Route path="/" element={ <VerClientes/> } />
          <Route path="/notificar/agregar" element={ <AgregarCliente/> } />
          <Route path="/notificar/:id" element={ <Notificar/> } />

        </Routes>
    </BrowserRouter>
  );
}

export default App;
