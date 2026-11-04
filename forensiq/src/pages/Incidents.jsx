import { useState } from "react";
import "./ModulePages.css";

import { incidents } from "../data/forestData";

import {
  Search,
  Eye,
  Filter,
  AlertTriangle,
  MapPin,
  CalendarDays,
  X,
  BrainCircuit,
  Loader2
} from "lucide-react";

function Incidents() {
  const [search, setSearch] = useState("");
  const [risk, setRisk] = useState("All");
  const [selected, setSelected] = useState(null);

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const formattedIncidents = incidents.map((item) => ({
    ...item,
    areaValue: Number(item.area),
    area: `${item.area} hectares`,
    description:
      item.description ||
      "Forest disturbance recorded for investigation."
  }));

  const filtered = formattedIncidents.filter((item) => {
    const matchesSearch =
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase());

    const matchesRisk = risk === "All" || item.risk === risk;

    return matchesSearch && matchesRisk;
  });

  const totalIncidents = incidents.length;

  const highRisk = incidents.filter(
    (item) => item.risk === "High"
  ).length;

  const underReview = incidents.filter(
    (item) =>
      item.status === "Under Investigation" ||
      item.status === "Under Review"
  ).length;

  const analyseIncident = async () => {
    setLoading(true);
    setAnalysis(null);
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:5000/analyse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          area: selected.areaValue,
          risk: selected.risk
        })
      });

      if (!response.ok) {
        throw new Error("Python analysis failed.");
      }

      const result = await response.json();
      setAnalysis(result);

    } catch (err) {
      setError(
        "Unable to connect to Python. Make sure the Flask server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const openDetails = (item) => {
    setSelected(item);
    setAnalysis(null);
    setError("");
  };

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
            <h2>{totalIncidents}</h2>
            <p>Total Incidents</p>
          </div>
        </div>

        <div className="module-stat">
          <AlertTriangle />
          <div>
            <h2>{highRisk}</h2>
            <p>High Risk</p>
          </div>
        </div>

        <div className="module-stat">
          <Eye />
          <div>
            <h2>{underReview}</h2>
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
                      onClick={() => openDetails(item)}
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

        <div
          className="modal-overlay"
          onClick={() => setSelected(null)}
        >

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
                <strong>
                  <MapPin size={15} />
                  {selected.location}
                </strong>
              </div>

              <div>
                <span>Affected Area</span>
                <strong>{selected.area}</strong>
              </div>

              <div>
                <span>Detection Date</span>
                <strong>
                  <CalendarDays size={15} />
                  {selected.date}
                </strong>
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

            <div style={{
              marginTop: "22px",
              padding: "20px",
              background: "#f0f7f2",
              borderRadius: "10px",
              boxSizing: "border-box",
              width: "100%"
            }}>

              <h3 style={{
                display: "flex",
                alignItems: "center",
                gap: "9px",
                marginBottom: "12px"
              }}>
                <BrainCircuit size={21} />
                Python Risk Analysis
              </h3>

              <p style={{
                fontSize: "13px",
                color: "#64748b",
                lineHeight: "1.6"
              }}>
                Analyse this incident using the Python risk assessment system.
              </p>

              <button
                onClick={analyseIncident}
                disabled={loading}
                style={{
                  marginTop: "14px",
                  padding: "11px 17px",
                  background: "#1b6742",
                  color: "white",
                  border: "none",
                  borderRadius: "7px",
                  cursor: loading ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
              >
                {loading ? (
                  <>
                    <Loader2 size={17} />
                    Analysing...
                  </>
                ) : (
                  <>
                    <BrainCircuit size={17} />
                    Analyse Incident
                  </>
                )}
              </button>

              {error && (
                <p style={{
                  color: "#dc2626",
                  marginTop: "15px",
                  fontSize: "13px",
                  lineHeight: "1.6"
                }}>
                  {error}
                </p>
              )}

              {analysis && (
                <div style={{
                  marginTop: "20px",
                  padding: "18px",
                  background: "white",
                  borderRadius: "8px",
                  border: "1px solid #dce8df",
                  boxSizing: "border-box",
                  width: "100%",
                  lineHeight: "1.7",
                  overflowWrap: "break-word"
                }}>

                  <h3 style={{ marginBottom: "12px" }}>
                    Analysis Results
                  </h3>

                  <p>
                    Risk Score: <strong>{analysis.risk_score}/100</strong>
                  </p>

                  <p>
                    Risk Category: <strong>{analysis.risk_category}</strong>
                  </p>

                  <p style={{
                    marginTop: "10px",
                    lineHeight: "1.7"
                  }}>
                    {analysis.message}
                  </p>

                </div>
              )}

            </div>

            <p className="demo-disclaimer" style={{
              marginTop: "22px",
              marginBottom: "8px",
              lineHeight: "1.6",
              clear: "both"
            }}>
              Demonstration record. Python risk scores are illustrative
              prioritisation outputs, not proof of illegal activity.
            </p>

          </div>

        </div>

      )}

    </div>
  );
}

export default Incidents;