import "./Sidebar.css";

import {
  LayoutDashboard,
  Map,
  AlertTriangle,
  FileCheck,
  FileText,
  Bot,
  Trees,
  Settings
} from "lucide-react";

import { NavLink } from "react-router-dom";

function Sidebar() {

  const menu = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Forest Map", path: "/map", icon: Map },
    { name: "Incidents", path: "/incidents", icon: AlertTriangle },
    { name: "Clearance Verification", path: "/clearance", icon: FileCheck },
    { name: "Investigation Reports", path: "/reports", icon: FileText },
    { name: "AI Assistant", path: "/assistant", icon: Bot }
  ];

  return (
    <aside className="sidebar">

      {/* Logo Section */}
      <div className="sidebar-brand">

        <div className="brand-icon">
          <Trees size={25} />
        </div>

        <div>
          <h1>FORENSIQ</h1>
          <p>Forest Intelligence</p>
        </div>

      </div>

      {/* Navigation Menu */}
      <div className="sidebar-menu">

        <p className="menu-label">MAIN MENU</p>

        <nav>
          {menu.map((item) => {

            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? "active" : ""}`
                }
              >

                <Icon size={19} />

                <span>{item.name}</span>

              </NavLink>
            );

          })}
        </nav>

      </div>

      {/* Settings Section */}
      <div className="sidebar-settings">

        <button>
          <Settings size={19} />
          <span>Settings</span>
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;