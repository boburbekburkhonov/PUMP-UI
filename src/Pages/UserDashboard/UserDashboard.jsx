import React from "react";
import { Route, Routes } from "react-router-dom";
import UserDashboardMore from "../UserDashboardMore/UserDashboardMore";
import UserDashboardNews from "../UserDashboardNews/UserDashboardNews";
import { useEffect, useState } from "react";
import { api } from "../API/Api.global";

const UserDashboard = () => {
  const [allStation, setAllStation] = useState([]);
  const [allBalansOrg, setAllBalansOrg] = useState([]);
  const [stationNotWorking, setStationNotWorking] = useState([]);
  const [stationNotWorkingFive, setStationNotWorkingFive] = useState([]);
  const [stationOtherWorking, setStationOtherWorking] = useState([]);
  const [stationOtherWorkingFive, setStationOtherWorkingFive] = useState([]);
  const [stationTodayWorking, setStationTodayWorking] = useState([]);
  const [stationTodayWorkingFive, setStationTodayWorkingFive] = useState([]);
  const [stationThreeDayWorking, setStationThreeDayWorking] = useState([]);
  const [stationThreeDayWorkingFive, setStationThreeDayWorkingFive] = useState(
    []
  );

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

      if (response.statusCode == 401) {
        const request = await fetch(`${api}/auth/signIn`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            username: window.localStorage.getItem("username"),
            password: window.localStorage.getItem("password"),
          }),
        });

        const response = await request.json();

        if (response.statusCode == 200) {
          window.localStorage.setItem("accessToken", response.data.accessToken);
          window.localStorage.setItem(
            "refreshToken",
            response.data.refreshToken
          );
        }
      }

      let stationNotWorking = [];
      let stationNotWorkingFive = [];
      let stationTodayWorking = [];
      let stationTodayWorkingFive = [];
      let stationThreeDayWorking = [];
      let stationThreeDayWorkingFive = [];
      let stationOtherWorking = [];
      let stationOtherWorkingFive = [];

      response.data.forEach((e) => {
        if (e.lastData == undefined) {
          stationNotWorking.push(e);
        } else if (checkData(e?.lastData.date) == 0) {
          stationTodayWorking.push(e);
        } else if (checkData(e.lastData.date) <= 3) {
          stationThreeDayWorking.push(e);
        } else {
          stationOtherWorking.push(e);
        }
      });

      for (let i = 0; i < 5; i++) {
        if (stationNotWorking[i] != undefined) {
          stationNotWorkingFive.push(stationNotWorking[i]);
        }

        if (stationTodayWorking[i] != undefined) {
          stationTodayWorkingFive.push(stationTodayWorking[i]);
        }

        if (stationThreeDayWorking[i] != undefined) {
          stationThreeDayWorkingFive.push(stationThreeDayWorking[i]);
        }

        if (stationOtherWorking[i] != undefined) {
          stationOtherWorkingFive.push(stationOtherWorking[i]);
        }
      }
      setStationNotWorkingFive(stationNotWorkingFive);
      setStationTodayWorkingFive(stationTodayWorkingFive);
      setStationThreeDayWorkingFive(stationThreeDayWorkingFive);
      setStationOtherWorkingFive(stationOtherWorkingFive);

      setStationNotWorking(stationNotWorking);
      setStationTodayWorking(stationTodayWorking);
      setStationThreeDayWorking(stationThreeDayWorking);
      setStationOtherWorking(stationOtherWorking);

      fetch(`${api}/balance-organizations/all-find`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        },
      })
        .then((res) => res.json())
        .then((data) => setAllBalansOrg(data.balanceOrganizations));
    };

    requestLastData();
  }, []);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <UserDashboardNews
              allStation={allStation}
              allBalansOrg={allBalansOrg}
              stationNotWorking={stationNotWorking}
              stationNotWorkingFive={stationNotWorkingFive}
              stationTodayWorking={stationTodayWorking}
              stationTodayWorkingFive={stationTodayWorkingFive}
              stationThreeDayWorking={stationThreeDayWorking}
              stationThreeDayWorkingFive={stationThreeDayWorkingFive}
              stationOtherWorking={stationOtherWorking}
              stationOtherWorkingFive={stationOtherWorkingFive}
            />
          }
        />
        <Route
          path="/*"
          element={
            <UserDashboardMore
              allStation={allStation}
              allBalansOrg={allBalansOrg}
              stationTodayWorking={stationTodayWorking}
              stationThreeDayWorking={stationThreeDayWorking}
              stationNotWorking={stationNotWorking}
              stationOtherWorking={stationOtherWorking}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default UserDashboard;
