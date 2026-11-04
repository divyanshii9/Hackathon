import { useState } from "react";
import "./ModulePages.css";

import {
  Search,
  Eye,
  Filter,
  AlertTriangle,
  MapPin,
  CalendarDays,
  X
} from "lucide-react";

const incidentData = [
  {
    id: "FR-1024",
    location: "North Forest",
    zone: "Zone A",
    area: "4.2 hectares",
    date: "03 Nov 2026",
    risk: "High",
    status: "Pending",
    description: "Significant vegetation change detected.",
  },
  {
    id: "FR-1025",
    location: "Eastern Range",
    zone: "Zone B",
    area: "2.1 hectares",
    date: "02 Nov 2026",
    risk: "Medium",
    status: "Under Review",
    description: "Moderate vegetation change detected.",
  },
  {
    id: "FR-1026",
    location: "Western Range",
    zone: "Zone C",
    area: "1.5 hectares",
    date: "01 Nov 2026",
    risk: "Low",
    status: "Verified",
    description: "Minor vegetation change detected.",
  },
  {
    id: "FR-1027",
    location: "Southern Forest",
    zone: "Zone D",
    area: "3.8 hectares",
    date: "31 Oct 2026",
    risk: "High",
    status: "Pending",
    description: "Large vegetation change requires investigation.",
  },
  {
    id: "FR-1028",
    location: "Central Forest",
    zone: "Zone E",
    area: "2.7 hectares",
    date: "30 Oct 2026",
    risk: "Medium",
    status: "Under Review",
    description: "Possible forest disturbance requires verification.",
  }
];

function Incidents() {
  const [search, setSearch] = useState("");
  const [risk, setRisk] = useState("All");
  const [selected, setSelected] = useState(null);

  const filtered = incidentData.filter((item) => {
    const matchesSearch =
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase());

    const matchesRisk = risk === "All" || item.risk === risk;

    return matchesSearch && matchesRisk;
  });

  return (
    <div className="module-page">

      <div className="module-heading">
        <div>
          <h1>Forest Incidents</h1>
          <p>Monitor and investigate detected forest disturbances.</p>
        </div>

        <span className="demo-label">DEMO DATA</span>
      </div>

      <div className="module-stats">
        <div className="module-stat">
          <AlertTriangle />
          <div>
            <h2>148</h2>
            <p>Total Incidents</p>
          </div>
        </div>

        <div className="module-stat">
          <AlertTriangle />
          <div>
            <h2>18</h2>
            <p>High Risk</p>
          </div>
        </div>

        <div className="module-stat">
          <Eye />
          <div>
            <h2>32</h2>
            <p>Under Review</p>
          </div>
        </div>
      </div>

      <div className="module-card">

        <div className="module-toolbar">
          <div className="module-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search incident ID or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="module-filter">
            <Filter size={17} />
            <select
              value={risk}
              onChange={(e) => setRisk(e.target.value)}
            >
              <option value="All">All Risk Levels</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        <div className="module-table-wrapper">
          <table className="module-table">
            <thead>
              <tr>
                <th>Incident ID</th>
                <th>Location</th>
                <th>Affected Area</th>
                <th>Date</th>
                <th>Risk</th>
                <th>Status</th>
                <th>Details</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((item) => (
                <tr key={item.id}>
                  <td className="table-id">{item.id}</td>
                  <td>{item.location}</td>
                  <td>{item.area}</td>
                  <td>{item.date}</td>
                  <td>
                    <span className={`risk-badge ${item.risk.toLowerCase()}`}>
                      {item.risk}
                    </span>
                  </td>
                  <td>{item.status}</td>
                  <td>
                    <button
                      className="icon-action"
                      onClick={() => setSelected(item)}
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <p className="empty-message">No incidents found.</p>
          )}
        </div>
      </div>

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div
            className="incident-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelected(null)}
            >
              <X />
            </button>

            <h2>Incident Details</h2>
            <p className="modal-subtitle">Investigation record</p>

            <div className="detail-grid">
              <div>
                <span>Incident ID</span>
                <strong>{selected.id}</strong>
              </div>

              <div>
                <span>Location</span>
                <strong><MapPin size={15} /> {selected.location}</strong>
              </div>

              <div>
                <span>Affected Area</span>
                <strong>{selected.area}</strong>
              </div>

              <div>
                <span>Detection Date</span>
                <strong><CalendarDays size={15} /> {selected.date}</strong>
              </div>

              <div>
                <span>Risk Level</span>
                <strong>{selected.risk}</strong>
              </div>

              <div>
                <span>Investigation Status</span>
                <strong>{selected.status}</strong>
              </div>
            </div>

            <div className="detail-description">
              <h3>Initial Observation</h3>
              <p>{selected.description}</p>
            </div>

            <p className="demo-disclaimer">
              Demonstration record. This is not verified evidence of illegal activity.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}

export default Incidents;