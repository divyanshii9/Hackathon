# Hackathon
Here is a complete `README.md` for your GitHub repository. It highlights the features, includes the rule-based AI Assistant, and clearly explains that the project uses demonstration data.

Create a file named `README.md` in your main `forensiq` project folder and paste this:

# FORENSIQ

### AI-Powered Forest Crime Investigation & Evidence Intelligence Platform

FORENSIQ is a frontend-based investigation support platform designed to help organise, analyse, and review potential forest disturbance incidents.

The platform brings together forest incident records, geographical visualisation, clearance information, investigation reports, and an AI-assisted investigation interface in one unified dashboard.

**FORENSIQ is developed as a hackathon prototype using demonstration data.**

---

## Project Overview

Forest monitoring and investigation involve multiple types of information, including geographical locations, disturbance records, authorised clearances, and investigation documentation.

FORENSIQ aims to organise this information into a single interface to support the investigation workflow.

The platform helps users review potential forest disturbances, understand incident priorities, examine available records, and generate investigation reports.

## Key Features

### 1. Dashboard

* Overview of registered forest incidents.
* High-risk incident statistics.
* Clearance verification statistics.
* Visual representation of incident trends.
* Recent incident records.

### 2. Forest Map

* Interactive geographical map.
* Visualisation of incident locations.
* Markers for different forest disturbance records.
* Incident details through map popups.
* Risk-based incident identification.

### 3. Incident Management

* Centralised incident listing.
* Search incidents by ID or location.
* Filter incidents according to risk level.
* View detailed incident information.
* Review investigation status.

### 4. Clearance Verification

* Display available forest clearance records.
* View authorised area information.
* Check clearance validity status.
* Filter clearance records.
* Compare available incident and clearance information.

### 5. Investigation Reports

* Generate reports from incident records.
* Search and filter investigation reports.
* Preview detailed report information.
* Download investigation reports.
* Display investigation status and risk priority.

### 6. AI Investigation Assistant

FORENSIQ includes an interactive investigation assistant interface.

The assistant helps users:

* Retrieve incident information.
* Review high-, medium-, and low-risk incidents.
* Understand investigation records.
* Check available clearance information.
* Summarise incident information.
* Identify suggested investigation steps.

**Implementation note:** The current prototype uses a rule-based assistant connected to the project's demonstration dataset. It does not use a live generative AI model or an external AI API.

---

## Technology Stack

| Technology      | Purpose                                      |
| --------------- | -------------------------------------------- |
| React.js        | Frontend development                         |
| Vite            | Development environment and build tool       |
| JavaScript      | Application logic                            |
| CSS3            | Styling and responsive layouts               |
| React Router    | Page navigation                              |
| Lucide React    | Icons                                        |
| Recharts        | Dashboard visualisations                     |
| Leaflet         | Interactive geographical maps                |
| OpenStreetMap   | Map tiles                                    |
| JavaScript Data | Demonstration incident and clearance records |

---

## Project Structure

```text
forensiq/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── Sidebar.css
│   │   ├── Header.jsx
│   │   └── Header.css
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Dashboard.css
│   │   ├── ForestMap.jsx
│   │   ├── ForestMap.css
│   │   ├── Incidents.jsx
│   │   ├── Clearance.jsx
│   │   ├── Reports.jsx
│   │   ├── Reports.css
│   │   ├── Assistant.jsx
│   │   ├── Assistant.css
│   │   └── ModulePages.css
│   │
│   ├── data/
│   │   └── forestData.js
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
└── README.md
```

---

## Installation and Setup

### Prerequisites

* Node.js
* npm
* Git

### Step 1: Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### Step 2: Navigate to the project folder

```bash
cd forensiq
```

### Step 3: Install dependencies

```bash
npm install
```

### Step 4: Start the development server

```bash
npm run dev
```

### Step 5: Open the application

Open the local URL displayed in your terminal, usually:

```text
http://localhost:5173/
```

---

## Demonstration Data

The current prototype uses predefined demonstration records stored in:

`src/data/forestData.js`

These records represent sample forest disturbance incidents and clearance information.

They are used to demonstrate:

* Dashboard statistics.
* Incident management.
* Geographical visualisation.
* Clearance record management.
* Investigation report generation.
* Rule-based assistant responses.

The sample records are illustrative and must not be interpreted as actual satellite detections, verified government clearance records, or confirmed forest crimes.

---

## Current Prototype Scope

FORENSIQ demonstrates a frontend investigation-support workflow.

The current version does not include:

* Live satellite imagery processing.
* Actual forest disturbance detection from satellite images.
* Automated geographical clearance-boundary verification.
* A connected government database.
* Persistent centralised incident storage.
* A generative AI model or live AI API integration.

These are potential areas for future development.

---

## Future Scope

Potential future enhancements include:

1. Integration with Sentinel-2 satellite imagery.
2. NDVI-based forest disturbance analysis.
3. Geospatial correlation of nearby incidents.
4. Automated comparison with authorised clearance boundaries.
5. Evidence-based incident prioritisation.
6. Integration of a generative AI investigation assistant.
7. Database integration for persistent investigation records.
8. PDF-based investigation report generation.

---

## Important Disclaimer

FORENSIQ is a hackathon demonstration prototype developed to showcase a possible digital workflow for forest investigation support.

All incident and clearance records currently use sample data.

Risk classifications indicate investigation priority only and do not establish illegal activity or prove criminal involvement.

Any real-world investigation would require verified satellite evidence, official records, and authorised human assessment.

---

## Project Goal

To demonstrate how an integrated digital platform can organise forest disturbance information and support a more structured, accessible, and evidence-oriented investigation workflow.

**FORENSIQ — Turning Forest Disturbance Records into Organised Investigation Leads.**

**One final GitHub tip:** Replace `YOUR_GITHUB_REPOSITORY_URL` with your actual repository URL after creating the repository. Also, keep `node_modules` and `.env` out of GitHub.
