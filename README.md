# FORENSIQ – Forest Crime Investigation & Evidence Intelligence Platform

FORENSIQ is a web-based forest investigation support platform designed to help organise potential forest disturbances, review incident information, verify clearance records, and prioritise cases for investigation.

The platform brings multiple investigation-support features together in one dashboard, helping users examine forest-related incidents through structured information and illustrative risk analysis.

## Key Features

### 1. Dashboard

* Overview of recorded forest incidents.
* Summary of high-, medium-, and low-risk cases.
* Visual representation of incident information.
* Quick access to different investigation modules.

### 2. Forest Map

* Interactive map displaying incident locations.
* Geographic visualisation of recorded forest incidents.
* Location-based overview using Leaflet and OpenStreetMap.

### 3. Incident Management

* View recorded forest incidents.
* Search incidents by location or incident ID.
* Filter incidents according to risk level.
* View detailed incident information.
* Analyse incident priority using the Python backend.

### 4. Python-Based Risk Analysis

* Flask backend processes incident information received from the frontend.
* Uses incident area and supplied risk level to calculate an illustrative priority score.
* Returns a risk score, priority category, and explanatory message.
* Helps demonstrate how investigation cases can be prioritised systematically.

**Note:** The score is an illustrative investigation-priority score. It is not a machine-learning prediction, crime probability, or confirmation of illegal activity.

### 5. Clearance Verification

* View recorded clearance information.
* Check clearance status and validity dates.
* Compare incident information with available sample clearance records.

### 6. Investigation Reports

* View structured investigation information.
* Organise incident details for review.
* Export report information as a text file.

### 7. Investigation Assistant

* Interactive assistant interface for investigation-related queries.
* Provides predefined, rule-based responses.
* Helps users navigate and understand the available investigation information.

The current assistant is a prototype implementation and does not use a live generative AI API.

## Technology Stack

### Frontend

* React.js
* Vite
* JavaScript
* HTML5
* CSS3
* React Router
* Recharts
* Leaflet
* React Leaflet
* Lucide React

### Backend

* Python
* Flask
* Flask-CORS

### Map Integration

* Leaflet
* OpenStreetMap

## Project Structure

```text
forensiq/
│
├── backend/
│   └── app.py
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── Header.jsx
│   │   └── ...
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── ForestMap.jsx
│   │   ├── Incidents.jsx
│   │   ├── Clearance.jsx
│   │   ├── Reports.jsx
│   │   ├── Assistant.jsx
│   │   └── ...
│   │
│   ├── data/
│   │   └── forestData.js
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
│
├── index.html
├── package.json
└── README.md
```

## Installation and Setup

### Prerequisites

* Node.js and npm
* Python 3
* Visual Studio Code (recommended)

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_LINK
```

### 2. Open the Project

```bash
cd forensiq
```

### 3. Install Frontend Dependencies

```bash
npm install
```

If required, install the project libraries:

```bash
npm install lucide-react recharts react-router-dom leaflet react-leaflet
```

### 4. Install Backend Dependencies

Open a terminal in the project folder:

```bash
py -m pip install flask flask-cors
```

### 5. Start the Python Backend

Open a terminal:

```bash
cd backend
py app.py
```

The Flask backend runs at:

```text
http://127.0.0.1:5000
```

### 6. Start the React Frontend

Open a second terminal in the main project folder:

```bash
npm run dev
```

Open the local development URL displayed in the terminal.

**Important:** Keep both the Python backend and React frontend running to use the Python risk-analysis feature.

## Current Prototype Scope

The current version demonstrates the proposed workflow through a functional frontend and a basic Python backend.

The prototype includes:

* Interactive investigation dashboard.
* Forest incident visualisation.
* Incident search and filtering.
* Interactive map.
* Clearance information interface.
* Investigation report interface.
* Rule-based investigation assistant.
* Python-based incident priority analysis.

### Demo Data and Limitations

* The incident and clearance records are illustrative sample data stored in `src/data/forestData.js`.
* The map displays sample incident coordinates.
* The prototype does not currently perform live satellite imagery processing or actual forest disturbance detection.
* Clearance verification currently uses sample records rather than official government databases or actual geographic boundary intersection.
* The Python backend uses rule-based scoring rather than a trained machine-learning model.
* The assistant uses predefined responses rather than a live AI model.
* The project does not currently use a database.
* Investigation reports are exported as text files; PDF generation is not currently implemented.

The prototype is intended to demonstrate the platform's proposed investigation-support workflow. Sample records and risk scores should not be treated as verified evidence of forest crime.

## Future Scope

* Integration of satellite imagery for forest disturbance detection.
* Automated identification of potential forest changes.
* Geospatial analysis of incident locations and patterns.
* Integration with authorised forest clearance databases.
* Advanced incident correlation and investigation prioritisation.
* AI-powered investigation assistance grounded in verified records.
* Database integration for storing incident and clearance information.
* PDF-based investigation report generation.

## Project Objective

FORENSIQ aims to provide an integrated digital platform that supports forest crime investigation by organising incident information, visualising locations, reviewing clearance records, and assisting investigation prioritisation.

**FORENSIQ – Turning Forest Data into Investigation Insights.**
