import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DataMatrixLanding from './DataMatrixLanding';
import ServicePage from './components/ServicePage'; // Import a template service page

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Landing Page */}
        <Route path="/" element={<DataMatrixLanding />} />

        {/* Service Pages */}
        <Route path="/services/ai-neural-core" element={<ServicePage title="AI Neural Core" />} />
        <Route path="/services/web-quantum-dev" element={<ServicePage title="Web Quantum Dev" />} />
        <Route path="/services/digital-matrix-ops" element={<ServicePage title="Digital Matrix Ops" />} />
        <Route path="/services/data-nexus" element={<ServicePage title="Data Nexus" />} />
        <Route path="/services/social-grid-matrix" element={<ServicePage title="Social Grid Matrix" />} />
        <Route path="/services/brand-neural-forge" element={<ServicePage title="Brand Neural Forge" />} />
      </Routes>
    </Router>
  );
}

export default App;
