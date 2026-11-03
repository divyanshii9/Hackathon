import "./Header.css";

import { Search, Bell, UserCircle } from "lucide-react";

function Header() {
  return (
    <header className="top-header">

      <div className="header-title">
        <h2>Forest Intelligence Dashboard</h2>
        <p>Monitor, investigate and analyse forest disturbances</p>
      </div>

      <div className="header-actions">

        <div className="header-search">
          <Search size={17} />

          <input
            type="text"
            placeholder="Search incidents..."
          />
        </div>

        <button className="notification-button">
          <Bell size={21} />
          <span></span>
        </button>

        <div className="header-profile">
          <UserCircle size={30} />

          <div>
            <p>Admin</p>
            <small>Forest Department</small>
          </div>
        </div>

      </div>

    </header>
  );
}

export default Header;