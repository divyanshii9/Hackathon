import { useState } from "react";

import {
  Bot,
  Send,
  User,
  Sparkles,
  ShieldCheck,
  FileSearch,
  MapPin,
  TreePine,
  Trash2,
} from "lucide-react";

import { incidents, clearances } from "../data/forestData";

import "./Assistant.css";

const suggestions = [
  {
    icon: <TreePine size={19} />,
    title: "Forest Disturbance",
    text: "Show me all high-risk forest incidents.",
  },
  {
    icon: <ShieldCheck size={19} />,
    title: "Clearance Verification",
    text: "Summarise the available clearance records.",
  },
  {
    icon: <MapPin size={19} />,
    title: "Incident Analysis",
    text: "Give me a summary of all forest incidents.",
  },
  {
    icon: <FileSearch size={19} />,
    title: "Evidence Summary",
    text: "What evidence should investigators review?",
  },
];

function generateResponse(query) {
  const text = query.toLowerCase();

  const highRisk = incidents.filter(
    (item) => item.risk === "High"
  );

  const mediumRisk = incidents.filter(
    (item) => item.risk === "Medium"
  );

  const lowRisk = incidents.filter(
    (item) => item.risk === "Low"
  );

  const pending = incidents.filter(
    (item) =>
      item.status === "Pending Review" ||
      item.status === "Under Investigation" ||
      item.status === "Under Review"
  );

  const verified = clearances.filter(
    (item) => item.status === "Verified"
  );

  const expired = clearances.filter(
    (item) => item.status === "Expired"
  );

  // Individual incident search

  const incidentId = text.match(/fr-\d+/i);

  if (incidentId) {
    const incident = incidents.find(
      (item) =>
        item.id.toLowerCase() === incidentId[0].toLowerCase()
    );

    if (!incident) {
      return `No incident with ID ${incidentId[0].toUpperCase()} was found in the available records.`;
    }

    return `INCIDENT ANALYSIS

Incident ID: ${incident.id}
Location: ${incident.location}
Affected Area: ${incident.area} hectares
Risk Priority: ${incident.risk}
Detection Date: ${incident.date}
Status: ${incident.status}

OBSERVATION:
This incident is recorded in the FORENSIQ demonstration dataset.

RECOMMENDED ACTION:
Review available satellite imagery, verify the affected location and check relevant clearance records.

Note: This record is an investigation lead, not proof of illegal activity.`;
  }

  // High-risk incidents

  if (
    text.includes("high risk") ||
    text.includes("high-risk")
  ) {
    if (highRisk.length === 0) {
      return "There are currently no high-risk incidents in the available records.";
    }

    return `HIGH-RISK INCIDENTS

${highRisk.map((item) =>
      `• ${item.id} - ${item.location}
  Area: ${item.area} hectares
  Status: ${item.status}`
    ).join("\n\n")}

Total High-Risk Incidents: ${highRisk.length}

RECOMMENDATION:
Prioritise these records for investigation and manual verification.`;
  }

  // Medium-risk incidents

  if (
    text.includes("medium risk") ||
    text.includes("medium-risk")
  ) {
    return `MEDIUM-RISK INCIDENTS

${mediumRisk.length === 0
      ? "No medium-risk incidents found."
      : mediumRisk.map((item) =>
          `• ${item.id} - ${item.location}
  Area: ${item.area} hectares
  Status: ${item.status}`
        ).join("\n\n")}

Total: ${mediumRisk.length}`;
  }

  // Low-risk incidents

  if (
    text.includes("low risk") ||
    text.includes("low-risk")
  ) {
    return `LOW-RISK INCIDENTS

${lowRisk.length === 0
      ? "No low-risk incidents found."
      : lowRisk.map((item) =>
          `• ${item.id} - ${item.location}
  Area: ${item.area} hectares
  Status: ${item.status}`
        ).join("\n\n")}

Total: ${lowRisk.length}`;
  }

  // Clearance verification

  if (
    text.includes("clearance") ||
    text.includes("authorisation") ||
    text.includes("authorization") ||
    text.includes("permission")
  ) {
    return `CLEARANCE VERIFICATION SUMMARY

Total Clearance Records: ${clearances.length}

Verified Records: ${verified.length}

Expired Records: ${expired.length}

${clearances.map((item) =>
      `• ${item.id} - ${item.location}
  Authorised Area: ${item.authorisedArea} hectares
  Status: ${item.status}
  Valid Until: ${item.validUntil}`
    ).join("\n\n")}

RECOMMENDATION:
Check the validity period and geographical boundaries of each available clearance record.

A missing match or expired record requires manual verification.`;
  }

  // Pending investigations

  if (
    text.includes("pending") ||
    text.includes("under investigation") ||
    text.includes("under review")
  ) {
    return `PENDING INVESTIGATION RECORDS

${pending.length === 0
      ? "No pending investigation records found."
      : pending.map((item) =>
          `• ${item.id} - ${item.location}
  Risk: ${item.risk}
  Status: ${item.status}`
        ).join("\n\n")}

Total Records Requiring Review: ${pending.length}`;
  }

  // Evidence recommendations

  if (
    text.includes("evidence") ||
    text.includes("investigator") ||
    text.includes("investigation steps")
  ) {
    return `INVESTIGATION EVIDENCE CHECKLIST

Investigators should review:

1. Satellite imagery from relevant dates.
2. Before-and-after forest cover comparisons.
3. Geographical coordinates of the disturbance.
4. Estimated affected forest area.
5. Available forest clearance documents.
6. Clearance boundaries and validity periods.
7. Related incidents in nearby locations.
8. Field inspection findings and authorised documentation.

IMPORTANT:
These are suggested investigation materials. No evidence of illegal activity is established by the demonstration records alone.`;
  }

  // Overall incident summary

  if (
    text.includes("summary") ||
    text.includes("summarise") ||
    text.includes("summarize") ||
    text.includes("all incidents") ||
    text.includes("forest incidents") ||
    text.includes("disturbance")
  ) {
    return `FOREST INCIDENT SUMMARY

Total Recorded Incidents: ${incidents.length}

High Risk: ${highRisk.length}
Medium Risk: ${mediumRisk.length}
Low Risk: ${lowRisk.length}

TOTAL AFFECTED AREA:
${incidents.reduce((sum, item) => sum + item.area, 0).toFixed(2)} hectares

INCIDENT DETAILS:

${incidents.map((item) =>
      `• ${item.id} - ${item.location}
  Risk: ${item.risk}
  Area: ${item.area} hectares
  Status: ${item.status}`
    ).join("\n\n")}

These figures represent demonstration records, not independently verified forest disturbances.`;
  }

  // Help

  if (
    text.includes("help") ||
    text.includes("what can you do")
  ) {
    return `FORENSIQ INVESTIGATION ASSISTANT

You can ask me to:

1. Show high-risk incidents.
2. Show medium-risk incidents.
3. Show low-risk incidents.
4. Find an incident using its ID.
5. Summarise forest disturbances.
6. Check clearance records.
7. Show pending investigations.
8. Suggest investigation evidence.

Try asking:
"Show high-risk incidents"

Or:
"Analyse FR-101"`;
  }

  return `I can help you analyse the available FORENSIQ demonstration records.

Try asking:

• Show high-risk incidents.
• Summarise all forest incidents.
• Check clearance records.
• Show pending investigations.
• Analyse incident FR-101.
• What evidence should investigators review?

I can only answer using the information available in the project dataset.`;
}

function Assistant() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = (customMessage) => {
    const userMessage = (customMessage || message).trim();

    if (!userMessage) return;

    const response = generateResponse(userMessage);

    setMessages((previous) => [
      ...previous,
      {
        type: "user",
        text: userMessage,
      },
      {
        type: "assistant",
        text: response,
      },
    ]);

    setMessage("");
  };

  const handleClear = () => {
    setMessages([]);
  };

  return (
    <div className="assistant-page">

      <div className="assistant-heading">

        <div className="assistant-title">

          <div className="assistant-main-icon">
            <Bot size={25} />
          </div>

          <div>
            <h1>AI Investigation Assistant</h1>
            <p>
              Investigation support using available FORENSIQ records.
            </p>
          </div>

        </div>

        <div className="assistant-status assistant-status-active">
          <span></span>
          Assistant Active
        </div>

      </div>

      <div className="assistant-workspace">

        <div className="assistant-chat-area">

          {messages.length === 0 ? (

            <div className="assistant-welcome">

              <div className="welcome-icon">
                <Sparkles size={30} />
              </div>

              <h2>How can I assist your investigation?</h2>

              <p>
                Ask questions about forest disturbances,
                incident records, clearance verification
                and investigation evidence.
              </p>

              <div className="assistant-suggestions">

                {suggestions.map((item, index) => (

                  <button
                    className="suggestion-card"
                    key={index}
                    onClick={() => handleSend(item.text)}
                  >

                    <div className="suggestion-icon">
                      {item.icon}
                    </div>

                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>

                  </button>

                ))}

              </div>

            </div>

          ) : (

            <div className="chat-messages">

              {messages.map((item, index) => (

                <div
                  className={`chat-message ${item.type}`}
                  key={index}
                >

                  <div className="chat-avatar">

                    {item.type === "user" ? (
                      <User size={18} />
                    ) : (
                      <Bot size={19} />
                    )}

                  </div>

                  <div className="chat-bubble">

                    <span>
                      {item.type === "user"
                        ? "You"
                        : "FORENSIQ Assistant"}
                    </span>

                    <p>{item.text}</p>

                  </div>

                </div>

              ))}

            </div>

          )}

          <div className="assistant-input-section">

            <div className="assistant-input-box">

              <input
                type="text"
                placeholder="Ask about an incident or investigation..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
              />

              <button
                className="send-button"
                onClick={() => handleSend()}
                disabled={!message.trim()}
              >
                <Send size={18} />
              </button>

            </div>

            <div className="input-footer">

              <span>FORENSIQ Investigation Intelligence</span>

              {messages.length > 0 && (

                <button onClick={handleClear}>
                  <Trash2 size={14} />
                  Clear chat
                </button>

              )}

            </div>

          </div>

        </div>

        <div className="assistant-info-panel">

          <div className="info-panel-heading">
            <ShieldCheck size={20} />
            <h3>Assistant Capabilities</h3>
          </div>

          <div className="capability-item">
            <TreePine size={19} />
            <div>
              <h4>Disturbance Insights</h4>
              <p>
                Analyse recorded incidents and risk priorities.
              </p>
            </div>
          </div>

          <div className="capability-item">
            <ShieldCheck size={19} />
            <div>
              <h4>Clearance Checks</h4>
              <p>
                Review available authorisation records and validity.
              </p>
            </div>
          </div>

          <div className="capability-item">
            <FileSearch size={19} />
            <div>
              <h4>Evidence Support</h4>
              <p>
                Get suggestions for investigation documentation.
              </p>
            </div>
          </div>

          <div className="assistant-notice">

            <ShieldCheck size={18} />

            <div>
              <h4>Responsible Investigation</h4>
              <p>
                This prototype uses rule-based responses,
                not a live AI model. Demonstration records
                are not verified evidence of illegal activity.
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Assistant;