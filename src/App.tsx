import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ConsultaExpediente from './pages/ConsultaExpediente';
import EstadoExpediente from './pages/EstadoExpediente';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Historial from './pages/Historial';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Vista 1 — Consulta pública */}
        <Route path="/" element={<ConsultaExpediente />} />

        {/* Vista 2 — Estado del expediente */}
        <Route path="/estado-expediente" element={<EstadoExpediente />} />

        {/* Vista 1.a — Login */}
        <Route path="/login" element={<Login />} />

        {/* Vista 1.b — Registro */}
        <Route path="/registro" element={<Registro />} />

        {/* Vista 3 — Historial */}
        <Route path="/historial" element={<Historial />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
