import React from "react";
import { useEffect, useState } from "react";
import { api } from "../API/Api.global";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "./UserDashboard.css";
import todayChart from "../../assets/images/today-chart.png";

const UserDashboard = () => {
  const [allStation, setAllStation] = useState([]);
  const [stationNotWorking, setStationNotWorking] = useState([]);
  const [stationTodayWorking, setStationTodayWorking] = useState([]);
  const [stationThreeDayWorking, setStationThreeDayWorking] = useState([]);
  const [stationOneMonthWorking, setStationOneMonthWorking] = useState([]);

  const checkData = (time) => {
    const presentDate = new Date();
    let startDate = new Date(time);
    startDate.setHours(startDate.getHours() - 5);

    if (
      startDate.getFullYear() == presentDate.getFullYear() &&
      startDate.getMonth() == presentDate.getMonth()
    ) {
      return presentDate.getDate() - startDate.getDate();
    } else if (
      (startDate.getFullYear() == presentDate.getFullYear() &&
        presentDate.getMonth() - startDate.getMonth() == 1 &&
        presentDate.getDate() == 2 &&
        30 <= startDate.getDate() &&
        startDate.getDate() <= 31) ||
      (startDate.getFullYear() == presentDate.getFullYear() &&
        presentDate.getMonth() - startDate.getMonth() == 1 &&
        presentDate.getDate() == 1 &&
        29 <= startDate.getDate() &&
        startDate.getDate() <= 31)
    ) {
      return 1;
    } else if (
      (startDate.getFullYear() == presentDate.getFullYear() &&
        presentDate.getMonth() == startDate.getMonth() &&
        presentDate.getDate() - startDate.getDate() > 3 &&
        presentDate.getDate() - startDate.getDate() < 31) ||
      (startDate.getFullYear() == presentDate.getFullYear() &&
        presentDate.getMonth() - startDate.getMonth() == 1 &&
        presentDate.getDate() - startDate.getDate() <= 0)
    ) {
      return 30;
    }
  };

  useEffect(() => {
    const requestLastData = async () => {
      const request = await fetch(`${api}/last-data/get-all`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        },
      });

      const response = await request.json();
      setAllStation(response.data);

      let stationNotWorking = [];
      let stationTodayWorking = [];
      let stationThreeDayWorking = [];
      let stationOneMonthWorking = [];

      response.data.forEach((e) => {
        if (e.lastData == undefined) {
          stationNotWorking.push(e);
        } else if (checkData(e?.lastData.date) == 0) {
          stationTodayWorking.push(e);
        } else if (checkData(e.lastData.date) <= 3) {
          stationThreeDayWorking.push(e);
        } else if (checkData(e.lastData.date) == 30) {
          stationOneMonthWorking.push(e);
        }
      });

      setStationNotWorking(stationNotWorking);
      setStationTodayWorking(stationTodayWorking);
      setStationThreeDayWorking(stationThreeDayWorking);
      setStationOneMonthWorking(stationOneMonthWorking);
    };

    requestLastData();
  }, []);

  return (
    <HelmetProvider>
      <div>
        <div className="card user-dashboard-card">
          <div className="card-body pt-3">
            <div className="dashboard-top-wrapper">
              <ul className="list-unstyled m-0">
                <li className="dashboard-top-list-item">
                  <h4 className="dashboard-top-list-item-heading m-0">
                    Bugungi ishlagan stansiyalar
                  </h4>
                  <div className="d-flex align-items-center justify-content-end mt-4">
                    <img
                      src={todayChart}
                      alt="todayChart"
                      width={30}
                      height={30}
                    />
                    <p className="m-0 dashboard-top-list-item-desc ms-2">
                      20 ta
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Helmet>
        <script src="../src/assets/js/table.js"></script>
      </Helmet>
    </HelmetProvider>
  );
};

export default UserDashboard;
