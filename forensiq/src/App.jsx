import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import Dashboard from "./pages/Dashboard";
import ForestMap from "./pages/ForestMap";
import Incidents from "./pages/Incidents";
import Clearance from "./pages/Clearance";
import Reports from "./pages/Reports";
import Assistant from "./pages/Assistant";


import "./App.css";

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
              <Route path="/incidents" element={<Incidents />} />
              <Route path="/clearance" element={<Clearance />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/assistant" element={<Assistant />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
