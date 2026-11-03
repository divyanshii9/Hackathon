import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import ForestMap from "./pages/ForestMap";

function Placeholder({ title }) {
  return (
    <div className="placeholder-page">
      <h1>{title}</h1>
      <p>This module will be developed in the next stage.</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />

        <div className="main-layout">
          <Header />

          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/map" element={<ForestMap />} />
              <Route
                path="/incidents"
                element={<Placeholder title="Forest Incidents" />}
              />
              <Route
                path="/clearance"
                element={<Placeholder title="Clearance Verification" />}
              />
              <Route
                path="/reports"
                element={<Placeholder title="Investigation Reports" />}
              />
              <Route
                path="/assistant"
                element={<Placeholder title="AI Investigation Assistant" />}
              />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;