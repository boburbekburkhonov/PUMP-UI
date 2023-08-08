import React, { useEffect } from "react";
import "./User.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import menuBar from "../../assets/images/menu-bar.png";
import dashboard from "../../assets/images/dashboard.png";
import news from "../../assets/images/news.png";
import stations from "../../assets/images/station.png";
import map from "../../assets/images/map.png";
import userLogout from "../../assets/images/user-logout.png";
import logout from "../../assets/images/logout.png";
import UserNews from "../UserNews/UserNews";
import UserMap from "../UserMap/UserMap";
import UserStations from "../UserStations/UserStations";
import UserDashboard from "../UserDashboard/UserDashboard";

const User = () => {
  const token = window.localStorage.getItem("accessToken");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      window.location.href = "/";
    }
  }, []);

  function logoutFunction() {
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("password");
    window.localStorage.removeItem("accessToken");
    window.localStorage.removeItem("refreshToken");
    window.location.reload();
  }

  return (
    <HelmetProvider>
      <div className="admin-wrapper">
        <div className="sidebar">
          <div className="logo-details">
            <img
              className="bx bx-menu"
              src={menuBar}
              alt="menuBar"
              width={42}
              height={27}
            />
          </div>
          <ul className="nav-links">
            <li>
              <a
                href="#"
                className={
                  location.pathname == "/user"
                    ? "sidebar-active sidebar-style"
                    : "sidebar-style"
                }
                onClick={() => navigate("/user")}
              >
                <img
                  className="bx bx-menu"
                  src={dashboard}
                  alt="menuBar"
                  width={26}
                  height={26}
                />
                <span className="link_name ms-3">Dashboard</span>
              </a>
              <ul className="sub-menu blank">
                <li>
                  <a className="link_name" href="#">
                    Dashboard
                  </a>
                </li>
              </ul>
            </li>
            <li className="mt-3">
              <a
                href="#"
                className={
                  location.pathname == "/user/map"
                    ? "sidebar-active sidebar-style"
                    : "sidebar-style"
                }
                onClick={() => navigate("/user/map")}
              >
                <img
                  className="bx bx-menu"
                  src={map}
                  alt="menuBar"
                  width={26}
                  height={26}
                />
                <span className="link_name ms-3">Xarita</span>
              </a>
              <ul className="sub-menu blank">
                <li>
                  <a className="link_name" href="#">
                    Xarita
                  </a>
                </li>
              </ul>
            </li>
            <li className="mt-3">
              <div className="icon-link">
                <a
                  href="#"
                  className={
                    location.pathname == "/user/news"
                      ? "sidebar-active sidebar-style"
                      : "sidebar-style"
                  }
                  onClick={() => navigate("/user/news")}
                >
                  <img
                    className="bx bx-menu"
                    src={news}
                    alt="menuBar"
                    width={26}
                    height={26}
                  />
                  <span className="link_name ms-3">Ma'lumotlar</span>
                </a>
              </div>
              <ul className="sub-menu">
                <li>
                  <a className="link_name" href="#">
                    Ma'lumotlar
                  </a>
                </li>
              </ul>
            </li>
            <li className="mt-3">
              <div className="icon-link">
                <a
                  href="#"
                  className={
                    location.pathname == "/user/stations"
                      ? "sidebar-active sidebar-style"
                      : "sidebar-style"
                  }
                  onClick={() => navigate("/user/stations")}
                >
                  <img
                    className="bx bx-menu"
                    src={stations}
                    alt="menuBar"
                    width={33}
                    height={35}
                  />
                  <span className="link_name ms-3">Stansiyalar</span>
                </a>
              </div>
              <ul className="sub-menu">
                <li>
                  <a className="link_name" href="#">
                    Stansiyalar
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <header className="home-section-header">
          <div className="container-fluid py-3">
            <div className="dropdown text-end">
              <button
                className="btn-logout dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  className="bx bx-menu"
                  src={userLogout}
                  alt="menuBar"
                  width={30}
                  height={30}
                />
                <span className="mx-2">Nasos</span>
              </button>
              <ul className="dropdown-menu">
                <li className="d-flex align-items-center justify-content-center ms-auto">
                  <a
                    className="dropdown-item ps-1 d-flex align-items-center"
                    href="#"
                    onClick={logoutFunction}
                  >
                    <img
                      className="bx bx-menu mx-2"
                      src={logout}
                      alt="menuBar"
                      width={22}
                      height={22}
                    />
                    <span>Chiqish</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </header>

        <section className="home-section py-3">
          <div className="container-fluid">
            <Routes>
              <Route path="/" element={<UserDashboard />} />
              <Route path="/map" element={<UserMap />} />
              <Route path="/news" element={<UserNews />} />
              <Route path="/stations" element={<UserStations />} />
            </Routes>
          </div>
        </section>
      </div>

      <Helmet>
        <script src="../src/assets/js/Admin.js"></script>
      </Helmet>
    </HelmetProvider>
  );
};

export default User;
