import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DataMatrixLanding from "./DataMatrixLanding";
import ScrollToTop from "./components/ScrollToTop";

// Import your new service pages
import AiNeuralCorePage from "./pages/AiNeuralCorePage";
import WebQuantumDevPage from "./pages/WebQuantumDevPage";
import DigitalMatrixOpsPage from "./pages/DigitalMatrixOpsPage";
import DataNexusPage from "./pages/DataNexusPage";
import SocialGridMatrixPage from "./pages/SocialGridMatrixPage";
import BrandNeuralForgePage from "./pages/BrandNeuralForgePage";
import Contact from "./pages/Contact";
function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Main Landing Page */}
        <Route path="/" element={<DataMatrixLanding />} />

        {/* Service Pages */}
        <Route path="/services/ai-neural-core" element={<AiNeuralCorePage />} />
        <Route
          path="/services/web-quantum-dev"
          element={<WebQuantumDevPage />}
        />
        <Route
          path="/services/digital-matrix-ops"
          element={<DigitalMatrixOpsPage />}
        />
        <Route path="/services/data-nexus" element={<DataNexusPage />} />
        <Route
          path="/services/social-grid-matrix"
          element={<SocialGridMatrixPage />}
        />
        <Route
          path="/services/brand-neural-forge"
          element={<BrandNeuralForgePage />}
        />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
