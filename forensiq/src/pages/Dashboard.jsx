import "./Dashboard.css";

import {
  Trees,
  AlertTriangle,
  MapPin,
  FileCheck,
  TrendingUp,
  ArrowUpRight,
  CircleCheck,
  Activity
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import { Link } from "react-router-dom";

import { incidents, clearances } from "../data/forestData";

const stats = [
  {
    title: "Monitored Regions",
    value: "24",
    description: "Forest regions in the system",
    icon: Trees,
    color: "green"
  },
  {
    title: "Detected Incidents",
    value: incidents.length,
    description: "Recorded forest disturbances",
    icon: AlertTriangle,
    color: "red"
  },
  {
    title: "High Risk Areas",
    value: incidents.filter((item) => item.risk === "High").length,
    description: "Require investigation",
    icon: MapPin,
    color: "orange"
  },
  {
    title: "Verified Clearances",
    value: clearances.filter((item) => item.status === "Verified").length,
    description: "Permission records matched",
    icon: FileCheck,
    color: "blue"
  }
];

const chartData = [
  { month: "Jun", incidents: 12 },
  { month: "Jul", incidents: 18 },
  { month: "Aug", incidents: 14 },
  { month: "Sep", incidents: 25 },
  { month: "Oct", incidents: 20 },
  { month: "Nov", incidents: incidents.length }
];

function Dashboard() {
  const highRiskCount = incidents.filter(
    (item) => item.risk === "High"
  ).length;

  const recentIncidents = [...incidents].slice(-4).reverse();

  return (
    <div className="dashboard-page">

      <div className="dashboard-heading">
        <div>
          <h1>Dashboard Overview</h1>
          <p>
            Monitor forest disturbances and investigation activities.
          </p>
        </div>

        <span className="demo-badge">DEMO DATA</span>
      </div>

      <div className="stats-grid">

        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div className="stat-card" key={stat.title}>

              <div className={`stat-icon ${stat.color}`}>
                <Icon size={23} />
              </div>

              <div className="stat-information">
                <p>{stat.title}</p>
                <h2>{stat.value}</h2>
                <span>{stat.description}</span>
              </div>

            </div>
          );
        })}

      </div>

      <div className="dashboard-middle">

        <div className="chart-card">

          <div className="section-heading">
            <div>
              <h2>Forest Disturbance Trends</h2>
              <p>Monthly recorded incidents</p>
            </div>

            <TrendingUp size={22} />
          </div>

          <div className="chart-container">

            <ResponsiveContainer width="100%" height="100%">

              <LineChart
                data={chartData}
                margin={{
                  top: 15,
                  right: 15,
                  left: -15,
                  bottom: 5
                }}
              >

                <CartesianGrid
                  strokeDasharray="4 4"
                  vertical={false}
                />

                <XAxis
                  dataKey="month"
                  tick={{ fill: "#718078", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  tick={{ fill: "#718078", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="incidents"
                  stroke="#315b43"
                  strokeWidth={3}
                  dot={{
                    r: 4,
                    fill: "#315b43",
                    stroke: "white",
                    strokeWidth: 2
                  }}
                  activeDot={{ r: 7 }}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        <div className="priority-card">

          <div className="priority-header">
            <div className="priority-icon">
              <AlertTriangle size={22} />
            </div>

            <h2>Investigation Priority</h2>
          </div>

          <div className="priority-number">
            {highRiskCount}
          </div>

          <p className="priority-description">
            High-priority incidents
          </p>

          <div className="priority-divider"></div>

          <h3>System Status</h3>

          <div className="system-status">
            <CircleCheck size={17} />
            <span>Monitoring Dashboard Active</span>
          </div>

          <div className="priority-footer">
            <Activity size={17} />
            <span>Demonstration monitoring data</span>
          </div>

        </div>

      </div>

      <div className="recent-incidents-card">

        <div className="recent-heading">

          <div>
            <h2>Recent Forest Incidents</h2>
            <p>Latest recorded disturbance reports</p>
          </div>

          <Link to="/incidents" className="view-all-link">
            View All
            <ArrowUpRight size={16} />
          </Link>

        </div>

        <div className="table-wrapper">

          <table className="incident-table">

            <thead>
              <tr>
                <th>Incident ID</th>
                <th>Location</th>
                <th>Affected Area</th>
                <th>Date</th>
                <th>Risk Level</th>
              </tr>
            </thead>

            <tbody>

              {recentIncidents.map((incident) => (

                <tr key={incident.id}>

                  <td className="incident-id">
                    {incident.id}
                  </td>

                  <td>{incident.location}</td>

                  <td>{incident.area} hectares</td>

                  <td>{incident.date}</td>

                  <td>
                    <span
                      className={`risk-badge ${incident.risk.toLowerCase()}`}
                    >
                      {incident.risk}
                    </span>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        <p className="dashboard-disclaimer">
          All displayed incidents and statistics are demonstration data.
          They do not represent verified forest crime cases.
        </p>

      </div>

    </div>
  );
}

export default Dashboard;