import React, { useState } from 'react'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
} from 'react-leaflet'

import L from 'leaflet'

import {
  Layers,
  MapPin,
  AlertTriangle,
  Trees,
} from 'lucide-react'

import 'leaflet/dist/leaflet.css'
import './ForestMap.css'

const incidents = [
  {
    id: 'FR-1024',
    name: 'North Forest',
    position: [30.3165, 78.0322],
    risk: 'High',
    area: '4.2 hectares',
  },
  {
    id: 'FR-1025',
    name: 'Eastern Range',
    position: [30.3250, 78.0450],
    risk: 'Medium',
    area: '2.1 hectares',
  },
  {
    id: 'FR-1026',
    name: 'Western Range',
    position: [30.2900, 78.0100],
    risk: 'Low',
    area: '1.5 hectares',
  },
]

const createIcon = (risk) => {
  const color =
    risk === 'High'
      ? '#dc2626'
      : risk === 'Medium'
      ? '#d97706'
      : '#16a34a'

  return L.divIcon({
    className: 'custom-map-marker',
    html: `<div style="
      width: 18px;
      height: 18px;
      background: ${color};
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 6px rgba(0,0,0,0.4);
    "></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  })
}

function ForestMap() {
  const [selectedRisk, setSelectedRisk] = useState('All')

  const filteredIncidents =
    selectedRisk === 'All'
      ? incidents
      : incidents.filter(
          (incident) => incident.risk === selectedRisk
        )

  return (
    <div className="forest-map-page">

      <div className="map-heading">
        <div>
          <h2>Forest Monitoring Map</h2>
          <p>
            Geographical overview of detected forest disturbances.
          </p>
        </div>

        <div className="map-status">
          <span className="status-dot"></span>
          Monitoring Active
        </div>
      </div>

      <div className="map-stats">

        <div className="map-stat-card">
          <Trees size={25} />
          <div>
            <h3>24</h3>
            <p>Forest Regions</p>
          </div>
        </div>

        <div className="map-stat-card">
          <MapPin size={25} />
          <div>
            <h3>148</h3>
            <p>Detected Incidents</p>
          </div>
        </div>

        <div className="map-stat-card">
          <AlertTriangle size={25} />
          <div>
            <h3>18</h3>
            <p>High Risk Areas</p>
          </div>
        </div>

      </div>

      <div className="map-toolbar">

        <div className="map-toolbar-title">
          <Layers size={19} />
          <span>Incident Locations</span>
        </div>

        <select
          value={selectedRisk}
          onChange={(e) => setSelectedRisk(e.target.value)}
        >
          <option value="All">All Risk Levels</option>
          <option value="High">High Risk</option>
          <option value="Medium">Medium Risk</option>
          <option value="Low">Low Risk</option>
        </select>

      </div>

      <div className="map-wrapper">

        <MapContainer
          center={[30.3165, 78.0322]}
          zoom={13}
          scrollWheelZoom={true}
          className="leaflet-map"
        >

          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {filteredIncidents.map((incident) => (

            <React.Fragment key={incident.id}>

              <Marker
                position={incident.position}
                icon={createIcon(incident.risk)}
              >
                <Popup>
                  <strong>{incident.name}</strong>
                  <p>Incident ID: {incident.id}</p>
                  <p>Risk Level: {incident.risk}</p>
                  <p>Area: {incident.area}</p>
                </Popup>
              </Marker>

              <Circle
                center={incident.position}
                radius={250}
                pathOptions={{
                  color:
                    incident.risk === 'High'
                      ? '#dc2626'
                      : incident.risk === 'Medium'
                      ? '#d97706'
                      : '#16a34a',
                  fillOpacity: 0.15,
                }}
              />

            </React.Fragment>

          ))}

        </MapContainer>

      </div>

      <div className="map-legend">
        <span><i className="high-dot"></i> High Risk</span>
        <span><i className="medium-dot"></i> Medium Risk</span>
        <span><i className="low-dot"></i> Low Risk</span>
      </div>

      <p className="map-note">
        Demonstration data only. Locations are not verified forest crime incidents.
      </p>

    </div>
  )
}

export default ForestMap