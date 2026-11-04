import { useState } from "react";
import "./ModulePages.css";

import { clearances } from "../data/forestData";

import {
  Search,
  FileCheck,
  ShieldCheck,
  AlertTriangle,
  Clock
} from "lucide-react";

function Clearance() {
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const formattedClearances = clearances.map((item) => ({
    ...item,
    area: `${item.authorisedArea} hectares`,
    date: item.issueDate || "Not available",
    validity: item.validUntil || "Not available",
    status:
      item.status === "Verified"
        ? "Matched"
        : item.status
  }));

  const filtered = formattedClearances.filter((item) => {
    const matchesSearch =
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      selectedStatus === "All" || item.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const matchedCount = formattedClearances.filter(
    (item) => item.status === "Matched"
  ).length;

  const noMatchCount = formattedClearances.filter(
    (item) => item.status === "No Match"
  ).length;

  const expiredCount = formattedClearances.filter(
    (item) => item.status === "Expired"
  ).length;

  return (
    <div className="module-page">

      <div className="module-heading">
        <div>
          <h1>Clearance Verification</h1>
          <p>
            Compare detected disturbances with available authorisation records.
          </p>
        </div>

        <span className="demo-label">SAMPLE RECORDS</span>
      </div>

      <div className="module-stats">

        <div className="module-stat">
          <ShieldCheck />
          <div>
            <h2>{matchedCount}</h2>
            <p>Matched Records</p>
          </div>
        </div>

        <div className="module-stat">
          <AlertTriangle />
          <div>
            <h2>{noMatchCount}</h2>
            <p>No Match</p>
          </div>
        </div>

        <div className="module-stat">
          <Clock />
          <div>
            <h2>{expiredCount}</h2>
            <p>Expired Records</p>
          </div>
        </div>

      </div>

      <div className="verification-info">

        <div className="verification-icon">
          <FileCheck size={25} />
        </div>

        <div>
          <h3>Authorisation Verification</h3>
          <p>
            Detected disturbance locations are compared with available
            clearance boundaries and their validity periods.
          </p>
        </div>

      </div>

      <div className="module-card">

        <div className="module-toolbar">

          <div className="module-search">
            <Search size={18} />

            <input
              placeholder="Search clearance ID or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="module-filter">

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="All">All Results</option>
              <option value="Matched">Matched</option>
              <option value="No Match">No Match</option>
              <option value="Expired">Expired</option>
            </select>

          </div>

        </div>

        <div className="module-table-wrapper">

          <table className="module-table">

            <thead>
              <tr>
                <th>Clearance ID</th>
                <th>Forest Location</th>
                <th>Authorised Area</th>
                <th>Issue Date</th>
                <th>Valid Until</th>
                <th>Verification</th>
              </tr>
            </thead>

            <tbody>

              {filtered.map((item) => (

                <tr key={item.id}>

                  <td className="table-id">{item.id}</td>

                  <td>{item.location}</td>

                  <td>{item.area}</td>

                  <td>{item.date}</td>

                  <td>{item.validity}</td>

                  <td>
                    <span
                      className={`status-badge ${
                        item.status === "Matched"
                          ? "matched"
                          : item.status === "Expired"
                          ? "expired"
                          : "unmatched"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          {filtered.length === 0 && (
            <p className="empty-message">No records found.</p>
          )}

        </div>

      </div>

      <div className="verification-warning">
        <AlertTriangle size={19} />

        <p>
          A missing clearance match does not establish illegal activity.
          Manual verification by authorised officers is required.
        </p>
      </div>

    </div>
  );
}

export default Clearance;