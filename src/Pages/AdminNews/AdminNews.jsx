import React, { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "./AdminNews.css";
import { api } from "../API/Api.global";
import moment from "moment";
import * as XLSX from "xlsx";
import "moment/dist/locale/uz-latn";

moment.locale("uz-latn");

const AdminNews = () => {
  const [allStationForToday, setAllStationForToday] = useState([]);
  const [todayData, setTodayData] = useState([]);
  const [todayStationName, setTodayStationName] = useState();
  const [allStationForYesterday, setAllStationForYesterday] = useState([]);
  const [yesterdayData, setYesterdayData] = useState([]);
  const [yesterdayStationName, setYesterdayStationName] = useState();
  const [allStationForDaily, setAllStationForDaily] = useState([]);
  const [dailyData, setDailyData] = useState([]);
  const [dailyStationName, setDailyStationName] = useState();
  const [allStationForMonth, setAllStationForMonth] = useState([]);
  const [monthData, setMonthData] = useState([]);
  const [monthStationName, setMonthStationName] = useState();
  const [allStationForYear, setAllStationForYear] = useState([]);
  const [yearData, setYearData] = useState([]);
  const [yearStationName, setYearStationName] = useState();
  const [yearsForYear, setYearsForYear] = useState([]);
  const [allStationForSearch, setAllStationForSearch] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [searchStationName, setSearchStationName] = useState();

  useEffect(() => {
    const fetchDataToday = async () => {
      const requestStation = await fetch(`${api}/last-data/get-all`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        },
      });

      const responseStation = await requestStation.json();

      if (responseStation.statusCode == 401) {
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
            window.localStorage.setItem(
              "accessToken",
              response.data.accessToken
            );
            window.localStorage.setItem(
              "refreshToken",
              response.data.refreshToken
            );
          }
        }

        if (response.statusCode == 200) {
          window.localStorage.setItem("accessToken", response.data.accessToken);
          window.localStorage.setItem(
            "refreshToken",
            response.data.refreshToken
          );
        }
      }

      setAllStationForToday(responseStation.data);
      setTodayStationName(responseStation.data[0]?.name);

      fetch(`${api}/data/today?stationsId=${responseStation.data[0]?._id}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        },
      })
        .then((res) => res.json())
        .then((data) => setTodayData(data.data));
    };

    fetchDataToday();

    const fetchDataYesterday = async () => {
      const requestStation = await fetch(`${api}/last-data/get-all`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        },
      });

      const responseStation = await requestStation.json();

      setAllStationForYesterday(responseStation.data);
      setYesterdayStationName(responseStation.data[0]?.name);

      fetch(
        `${api}/data/yesterday?stationsId=${responseStation.data[0]?._id}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization:
              "Bearer " + window.localStorage.getItem("accessToken"),
          },
        }
      )
        .then((res) => res.json())
        .then((data) => setYesterdayData(data.data));
    };

    fetchDataYesterday();

    const fetchDataDaily = async () => {
      const requestStation = await fetch(`${api}/last-data/get-all`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        },
      });

      const responseStation = await requestStation.json();

      setAllStationForDaily(responseStation.data);
      setDailyStationName(responseStation.data[0]?.name);

      fetch(
        `${api}/data/day?stationsId=${
          responseStation.data[0]?._id
        }&date=${new Date().toISOString().substring(0, 10)}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization:
              "Bearer " + window.localStorage.getItem("accessToken"),
          },
        }
      )
        .then((res) => res.json())
        .then((data) => setDailyData(data.data));
    };

    fetchDataDaily();

    const fetchDataMonth = async () => {
      const requestStation = await fetch(`${api}/last-data/get-all`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        },
      });

      const responseStation = await requestStation.json();

      setAllStationForMonth(responseStation.data);
      setMonthStationName(responseStation.data[0]?.name);

      fetch(
        `${api}/data/month?stationsId=${
          responseStation.data[0]?._id
        }&month=${new Date().toISOString().substring(0, 7)}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization:
              "Bearer " + window.localStorage.getItem("accessToken"),
          },
        }
      )
        .then((res) => res.json())
        .then((data) => setMonthData(data.data));
    };

    fetchDataMonth();

    const fetchDataYear = async () => {
      const requestStation = await fetch(`${api}/last-data/get-all`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        },
      });

      const responseStation = await requestStation.json();

      setAllStationForYear(responseStation.data);
      setYearStationName(responseStation.data[0]?.name);

      fetch(
        `${api}/data/year?stationsId=${
          responseStation.data[0]?._id
        }&year=${new Date().toISOString().substring(0, 4)}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization:
              "Bearer " + window.localStorage.getItem("accessToken"),
          },
        }
      )
        .then((res) => res.json())
        .then((data) => setYearData(data.data));

      let years = [];

      for (
        let i = 2023;
        i <= Number(new Date().toISOString().substring(0, 4));
        i++
      ) {
        years.push(String(i));
        setYearsForYear(years);
      }
    };

    fetchDataYear();

    const fetchDataSearch = async () => {
      const requestStation = await fetch(`${api}/last-data/get-all`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        },
      });

      const responseStation = await requestStation.json();

      setAllStationForSearch(responseStation.data);
      setSearchStationName(responseStation.data[0]?.name);

      fetch(
        `${api}/data/custom?stationsId=${
          responseStation.data[0]?._id
        }&startDate=${new Date()
          .toISOString()
          .substring(0, 10)}&endDate=${new Date()
          .toISOString()
          .substring(0, 10)}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization:
              "Bearer " + window.localStorage.getItem("accessToken"),
          },
        }
      )
        .then((res) => res.json())
        .then((data) => setSearchData(data.data));
    };

    fetchDataSearch();
  }, []);

  // ! DAY
  const searchDataByStationIdForToday = async (stationId) => {
    const stationName = allStationForToday.find((e) => e._id == stationId);
    setTodayStationName(stationName.name);

    fetch(`${api}/data/today?stationsId=${stationId}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTodayData(data.data);
      });
  };

  // ! YESTERDAY
  const searchDataByStationIdForYesterday = async (stationId) => {
    const stationName = allStationForYesterday.find((e) => e._id == stationId);
    setYesterdayStationName(stationName.name);

    fetch(`${api}/data/yesterday?stationsId=${stationId}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setYesterdayData(data.data);
      });
  };

  // ! DAILY
  const getDataDaily = (e) => {
    e.preventDefault();

    const { stationMonth, dateDaily } = e.target;

    const stationName = allStationForDaily.find(
      (e) => e._id == stationMonth.value
    );
    setDailyStationName(stationName.name);

    fetch(
      `${api}/data/day?stationsId=${stationMonth.value}&date=${dateDaily.value}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setDailyData(data.data));
  };

  // ! MONTH
  const getDataMonth = (e) => {
    e.preventDefault();

    const { stationMonth, dateMonth } = e.target;

    const stationName = allStationForMonth.find(
      (e) => e._id == stationMonth.value
    );
    setMonthStationName(stationName.name);

    fetch(
      `${api}/data/month?stationsId=${stationMonth.value}&month=${dateMonth.value}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setMonthData(data.data));
  };

  // ! YEAR
  const getDataYear = (e) => {
    e.preventDefault();

    const { stationYear, stationYearDate } = e.target;

    const stationName = allStationForYear.find(
      (e) => e._id == stationYear.value
    );

    setYearStationName(stationName.name);

    fetch(
      `${api}/data/year?stationsId=${stationYear.value}&year=${stationYearDate.value}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setYearData(data.data));
  };

  // ! SEARCH
  const getSearchData = (e) => {
    e.preventDefault();

    const { stationSearch, dateStart, dateEnd } = e.target;

    const stationName = allStationForSearch.find(
      (e) => e._id == stationSearch.value
    );

    setSearchStationName(stationName.name);

    fetch(
      `${api}/data/custom?stationsId=${stationSearch.value}&startDate=${dateStart.value}&endDate=${dateEnd.value}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setSearchData(data.data));
  };

  // ! SAVE DATA
  const exportDataToExcel = (data) => {
    if (data == "today") {
      const workBook = XLSX.utils.book_new();
      const workSheet = XLSX.utils.json_to_sheet(todayData);

      XLSX.utils.book_append_sheet(workBook, workSheet, "MySheet1");

      XLSX.writeFile(
        workBook,
        `${todayStationName} ning bugungi ma'lumotlari.xlsx`
      );
    } else if (data == "yesterday") {
      const workBook = XLSX.utils.book_new();
      const workSheet = XLSX.utils.json_to_sheet(yesterdayData);

      XLSX.utils.book_append_sheet(workBook, workSheet, "MySheet1");

      XLSX.writeFile(
        workBook,
        `${yesterdayStationName} ning kecha kelgan ma'lumotlari.xlsx`
      );
    } else if (data == "daily") {
      const workBook = XLSX.utils.book_new();
      const workSheet = XLSX.utils.json_to_sheet(dailyData);

      XLSX.utils.book_append_sheet(workBook, workSheet, "MySheet1");

      XLSX.writeFile(
        workBook,
        `${dailyStationName} ning kunlik ma'lumotlari.xlsx`
      );
    } else if (data == "month") {
      const workBook = XLSX.utils.book_new();
      const workSheet = XLSX.utils.json_to_sheet(monthData);

      XLSX.utils.book_append_sheet(workBook, workSheet, "MySheet1");

      XLSX.writeFile(
        workBook,
        `${monthStationName} ning oylik ma'lumotlari.xlsx`
      );
    } else if (data == "year") {
      const workBook = XLSX.utils.book_new();
      const workSheet = XLSX.utils.json_to_sheet(yearData);

      XLSX.utils.book_append_sheet(workBook, workSheet, "MySheet1");

      XLSX.writeFile(
        workBook,
        `${yearStationName} ning yillik ma'lumotlari.xlsx`
      );
    } else if (data == "search") {
      const workBook = XLSX.utils.book_new();
      const workSheet = XLSX.utils.json_to_sheet(searchData);

      XLSX.utils.book_append_sheet(workBook, workSheet, "MySheet1");

      XLSX.writeFile(workBook, `${searchStationName} ning ma'lumotlari.xlsx`);
    }
  };

  return (
    <HelmetProvider>
      <div>
        <div className="card">
          <div className="card-body pt-3">
            <ul className="nav nav-tabs nav-tabs-bordered">
              <li className="nav-item">
                <button
                  className="nav-link active"
                  data-bs-toggle="tab"
                  data-bs-target="#profile-users-today"
                >
                  Bugungi ma'lumotlar
                </button>
              </li>

              <li className="nav-item">
                <button
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#profile-users-yesterday"
                >
                  Kecha kelgan ma'lumotlar
                </button>
              </li>

              <li className="nav-item">
                <button
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#profile-users-daily"
                >
                  Kunlik ma'lumotlar
                </button>
              </li>

              <li className="nav-item">
                <button
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#profile-users-month"
                >
                  Oylik ma'lumotlar
                </button>
              </li>

              <li className="nav-item">
                <button
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#profile-users-year"
                >
                  Yillik ma'lumotlar
                </button>
              </li>

              <li className="nav-item">
                <button
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#profile-users-search"
                >
                  Qidirish
                </button>
              </li>
            </ul>

            <div className="tab-content pt-2">
              <div
                className="tab-pane fade show active profile-users-today pt-3"
                id="profile-users-today"
              >
                <h3 className="m-0">
                  <span className="text-primary">{todayStationName}</span> ning
                  bugungi ma'lumotlari
                </h3>
                <div className="d-flex  justify-content-between flex-wrap mt-3">
                  <form className="day-form d-flex align-items-center justify-content-between flex-wrap">
                    <div className="day-select-wrapper">
                      <label
                        htmlFor="station"
                        className="text-primary day-select-label fw-semibold mb-2"
                      >
                        Stansiya
                      </label>
                      <select
                        className="form-select"
                        name="region"
                        id="station"
                        onChange={(e) => {
                          searchDataByStationIdForToday(e.target.value);
                        }}
                      >
                        {allStationForToday?.map((e, i) => {
                          return (
                            <option value={e._id} key={i}>
                              {e.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </form>

                  <div className="day-btn-wrapper mt-2">
                    <button
                      onClick={() => exportDataToExcel("today")}
                      className="btn btn-primary ms-3"
                    >
                      Ma'lumotlarni saqlash
                    </button>
                  </div>
                </div>

                <div>
                  {todayData?.length > 0 ? (
                    <table className="c-table mt-4">
                      <thead className="c-table__header">
                        <tr>
                          <th className="c-table__col-label text-center">
                            Jami oqim m3
                          </th>
                          <th className="c-table__col-label text-center">
                            Musbat oqim m3
                          </th>
                          <th className="c-table__col-label text-center">
                            Oqim tezligi m3/s
                          </th>
                          <th className="c-table__col-label text-center">
                            Tezlik m/s
                          </th>
                          <th className="c-table__col-label text-center">
                            Soat
                          </th>
                        </tr>
                      </thead>
                      <tbody className="c-table__body">
                        {todayData?.map((e, i) => {
                          return (
                            <tr className="fs-6 column-admin-station" key={i}>
                              <td className="c-table__cell text-center">
                                {String(e.totalsFlow).includes(".")
                                  ? String(e.totalsFlow).slice(
                                      0,
                                      String(e.totalsFlow).indexOf(".") * 1 + 3
                                    )
                                  : e.totalsFlow}
                              </td>
                              <td className="c-table__cell text-center">
                                {String(e.positiveFlow).includes(".")
                                  ? String(e.positiveFlow).slice(
                                      0,
                                      String(e.positiveFlow).indexOf(".") * 1 +
                                        3
                                    )
                                  : e.positiveFlow}
                              </td>
                              <td className="c-table__cell text-center">
                                {String(e.flowRate).includes(".")
                                  ? String(e.flowRate).slice(
                                      0,
                                      String(e.flowRate).indexOf(".") * 1 + 3
                                    )
                                  : e.flowRate}
                              </td>
                              <td className="c-table__cell text-center">
                                {String(e.velocity).includes(".")
                                  ? String(e.velocity).slice(
                                      0,
                                      String(e.velocity).indexOf(".") * 1 + 3
                                    )
                                  : e.velocity}
                              </td>
                              <td className="c-table__cell text-center">
                                {`${e.date.split("T")[1].split(".")[0]}`}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  ) : (
                    <div className="alert alert-primary fw-semibold mt-3 text-center fs-5">
                      Hozircha ma'lumot kelmadi...
                    </div>
                  )}
                </div>
              </div>

              <div
                className="tab-pane fade profile-users-yesterday pt-3"
                id="profile-users-yesterday"
              >
                <h3 className="m-0">
                  <span className="text-primary">{yesterdayStationName}</span>{" "}
                  ning kecha kelgan ma'lumotlari
                </h3>
                <div className="d-flex  justify-content-between flex-wrap mt-3">
                  <form className="day-form d-flex align-items-center justify-content-between flex-wrap">
                    <div className="day-select-wrapper">
                      <label
                        htmlFor="station"
                        className="text-primary day-select-label fw-semibold mb-2"
                      >
                        Stansiya
                      </label>
                      <select
                        className="form-select"
                        name="region"
                        id="station"
                        onChange={(e) => {
                          searchDataByStationIdForYesterday(e.target.value);
                        }}
                      >
                        {allStationForYesterday?.map((e, i) => {
                          return (
                            <option value={e._id} key={i}>
                              {e.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </form>

                  <div className="day-btn-wrapper mt-2">
                    <button
                      onClick={() => exportDataToExcel("yesterday")}
                      className="btn btn-primary ms-3"
                    >
                      Ma'lumotlarni saqlash
                    </button>
                  </div>
                </div>

                <div>
                  {yesterdayData?.length > 0 ? (
                    <table className="c-table mt-4">
                      <thead className="c-table__header">
                        <tr>
                          <th className="c-table__col-label text-center">
                            Jami oqim m3
                          </th>
                          <th className="c-table__col-label text-center">
                            Musbat oqim m3
                          </th>
                          <th className="c-table__col-label text-center">
                            Oqim tezligi m3/s
                          </th>
                          <th className="c-table__col-label text-center">
                            Tezlik m/s
                          </th>
                          <th className="c-table__col-label text-center">
                            Soat
                          </th>
                        </tr>
                      </thead>
                      <tbody className="c-table__body">
                        {yesterdayData?.map((e, i) => {
                          return (
                            <tr className="fs-6 column-admin-station" key={i}>
                              <td className="c-table__cell text-center">
                                {String(e.totalsFlow).includes(".")
                                  ? String(e.totalsFlow).slice(
                                      0,
                                      String(e.totalsFlow).indexOf(".") * 1 + 3
                                    )
                                  : e.totalsFlow}
                              </td>
                              <td className="c-table__cell text-center">
                                {String(e.positiveFlow).includes(".")
                                  ? String(e.positiveFlow).slice(
                                      0,
                                      String(e.positiveFlow).indexOf(".") * 1 +
                                        3
                                    )
                                  : e.positiveFlow}
                              </td>
                              <td className="c-table__cell text-center">
                                {String(e.flowRate).includes(".")
                                  ? String(e.flowRate).slice(
                                      0,
                                      String(e.flowRate).indexOf(".") * 1 + 3
                                    )
                                  : e.flowRate}
                              </td>
                              <td className="c-table__cell text-center">
                                {String(e.velocity).includes(".")
                                  ? String(e.velocity).slice(
                                      0,
                                      String(e.velocity).indexOf(".") * 1 + 3
                                    )
                                  : e.velocity}
                              </td>
                              <td className="c-table__cell text-center">
                                {`${e.date.split("T")[1].split(".")[0]}`}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  ) : (
                    <div className="alert alert-primary fw-semibold mt-3 text-center fs-5">
                      Hozircha ma'lumot kelmadi...
                    </div>
                  )}
                </div>
              </div>

              <div
                className="tab-pane fade profile-users-daily pt-3"
                id="profile-users-daily"
              >
                <h3 className="m-0">
                  <span className="text-primary">{dailyStationName}</span> ning
                  kunlik ma'lumotlari
                </h3>
                <div className="d-flex  justify-content-between flex-wrap mt-3">
                  <form
                    onSubmit={getDataDaily}
                    className="month-form d-flex align-items-end justify-content-between flex-wrap"
                  >
                    <div className="day-select-wrapper-month">
                      <label
                        htmlFor="stationMonth"
                        className="text-primary day-select-label fw-semibold mb-2"
                      >
                        Stansiya
                      </label>
                      <select
                        className="form-select"
                        name="stationMonth"
                        id="stationMonth"
                        required
                      >
                        {allStationForDaily?.map((e, i) => {
                          return (
                            <option value={e._id} key={i}>
                              {e.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div className="day-select-wrapper-month">
                      <label
                        htmlFor="dateMonth"
                        className="text-primary day-select-label fw-semibold mb-2"
                      >
                        Sana
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="dateMonth"
                        name="dateDaily"
                        required
                        defaultValue={new Date().toISOString().substring(0, 10)}
                      />
                    </div>

                    <button className="btn btn-primary mt-2">Qidirish</button>
                  </form>

                  <div className="day-btn-wrapper mt-2">
                    <button
                      onClick={() => exportDataToExcel("daily")}
                      className="btn btn-primary ms-3"
                    >
                      Ma'lumotlarni saqlash
                    </button>
                  </div>
                </div>

                <div>
                  {dailyData?.length > 0 ? (
                    <table className="c-table mt-4">
                      <thead className="c-table__header">
                        <tr>
                          <th className="c-table__col-label text-center">
                            Jami oqim m3
                          </th>
                          <th className="c-table__col-label text-center">
                            Musbat oqim m3
                          </th>
                          <th className="c-table__col-label text-center">
                            Oqim tezligi m3/s
                          </th>
                          <th className="c-table__col-label text-center">
                            Tezlik m/s
                          </th>
                          <th className="c-table__col-label text-center">
                            Sana
                          </th>
                        </tr>
                      </thead>
                      <tbody className="c-table__body">
                        {dailyData?.map((e, i) => {
                          return (
                            <tr className="fs-6 column-admin-station" key={i}>
                              <td className="c-table__cell text-center">
                                {String(e.totalsFlow).includes(".")
                                  ? String(e.totalsFlow).slice(
                                      0,
                                      String(e.totalsFlow).indexOf(".") * 1 + 3
                                    )
                                  : e.totalsFlow}
                              </td>
                              <td className="c-table__cell text-center">
                                {String(e.positiveFlow).includes(".")
                                  ? String(e.positiveFlow).slice(
                                      0,
                                      String(e.positiveFlow).indexOf(".") * 1 +
                                        3
                                    )
                                  : e.positiveFlow}
                              </td>
                              <td className="c-table__cell text-center">
                                {String(e.flowRate).includes(".")
                                  ? String(e.flowRate).slice(
                                      0,
                                      String(e.flowRate).indexOf(".") * 1 + 3
                                    )
                                  : e.flowRate}
                              </td>
                              <td className="c-table__cell text-center">
                                {String(e.velocity).includes(".")
                                  ? String(e.velocity).slice(
                                      0,
                                      String(e.velocity).indexOf(".") * 1 + 3
                                    )
                                  : e.velocity}
                              </td>
                              <td className="c-table__cell text-center">
                                {`${e.date.split("T")[1].split(".")[0]}`}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  ) : (
                    <div className="alert alert-primary fw-semibold mt-3 text-center fs-5">
                      Hozircha ma'lumot kelmadi...
                    </div>
                  )}
                </div>
              </div>

              <div
                className="tab-pane fade profile-users-month pt-3"
                id="profile-users-month"
              >
                <h3 className="m-0">
                  <span className="text-primary">{monthStationName}</span> ning
                  oylik ma'lumotlari
                </h3>
                <div className="d-flex  justify-content-between flex-wrap mt-3">
                  <form
                    onSubmit={getDataMonth}
                    className="month-form month-form-month d-flex align-items-end justify-content-between flex-wrap"
                  >
                    <div className="day-select-wrapper-month">
                      <label
                        htmlFor="stationMonth"
                        className="text-primary day-select-label fw-semibold mb-2"
                      >
                        Stansiya
                      </label>
                      <select
                        className="form-select"
                        name="stationMonth"
                        id="stationMonth"
                        required
                      >
                        {allStationForMonth?.map((e, i) => {
                          return (
                            <option value={e._id} key={i}>
                              {e.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div className="day-select-wrapper-month">
                      <label
                        htmlFor="dateMonth"
                        className="text-primary day-select-label fw-semibold mb-2"
                      >
                        Oy
                      </label>
                      <input
                        type="month"
                        className="form-control"
                        id="dateMonth"
                        name="dateMonth"
                        required
                        defaultValue={new Date().toISOString().substring(0, 7)}
                      />
                    </div>

                    <button className="btn btn-primary mt-2">Qidirish</button>
                  </form>

                  <div className="day-btn-wrapper mt-2">
                    <button
                      onClick={() => exportDataToExcel("month")}
                      className="btn btn-primary ms-3"
                    >
                      Ma'lumotlarni saqlash
                    </button>
                  </div>
                </div>

                <div>
                  {monthData?.length > 0 ? (
                    <table className="c-table mt-4">
                      <thead className="c-table__header">
                        <tr>
                          <th className="c-table__col-label text-center">
                            Jami oqim m3
                          </th>
                          <th className="c-table__col-label text-center">
                            Musbat oqim m3
                          </th>
                          <th className="c-table__col-label text-center">
                            Oqim tezligi m3/s
                          </th>
                          <th className="c-table__col-label text-center">
                            Tezlik m/s
                          </th>
                          <th className="c-table__col-label text-center">
                            Sana
                          </th>
                        </tr>
                      </thead>
                      <tbody className="c-table__body">
                        {monthData?.map((e, i) => {
                          return (
                            <tr className="fs-6 column-admin-station" key={i}>
                              <td className="c-table__cell text-center">
                                {String(e.totalsFlow).includes(".")
                                  ? String(e.totalsFlow).slice(
                                      0,
                                      String(e.totalsFlow).indexOf(".") * 1 + 3
                                    )
                                  : e.totalsFlow}
                              </td>
                              <td className="c-table__cell text-center">
                                {String(e.positiveFlow).includes(".")
                                  ? String(e.positiveFlow).slice(
                                      0,
                                      String(e.positiveFlow).indexOf(".") * 1 +
                                        3
                                    )
                                  : e.positiveFlow}
                              </td>
                              <td className="c-table__cell text-center">
                                {String(e.flowRate).includes(".")
                                  ? String(e.flowRate).slice(
                                      0,
                                      String(e.flowRate).indexOf(".") * 1 + 3
                                    )
                                  : e.flowRate}
                              </td>
                              <td className="c-table__cell text-center">
                                {String(e.velocity).includes(".")
                                  ? String(e.velocity).slice(
                                      0,
                                      String(e.velocity).indexOf(".") * 1 + 3
                                    )
                                  : e.velocity}
                              </td>
                              <td className="c-table__cell text-center">
                                {e.day}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  ) : (
                    <div className="alert alert-primary fw-semibold mt-3 text-center fs-5">
                      Hozircha ma'lumot kelmadi...
                    </div>
                  )}
                </div>
              </div>

              <div
                className="tab-pane fade profile-users-year pt-3"
                id="profile-users-year"
              >
                <h3 className="m-0">
                  <span className="text-primary">{yearStationName}</span> ning
                  yillik ma'lumotlari
                </h3>
                <div className="d-flex  justify-content-between flex-wrap mt-3">
                  <form
                    onSubmit={getDataYear}
                    className="month-form year-form d-flex align-items-end justify-content-between flex-wrap"
                  >
                    <div className="day-select-wrapper-month">
                      <label
                        htmlFor="stationMonth"
                        className="text-primary day-select-label fw-semibold mb-2"
                      >
                        Stansiya
                      </label>
                      <select
                        className="form-select"
                        name="stationYear"
                        id="stationMonth"
                        required
                      >
                        {allStationForYear?.map((e, i) => {
                          return (
                            <option value={e._id} key={i}>
                              {e.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div className="day-select-wrapper-month">
                      <label
                        htmlFor="dateMonth"
                        className="text-primary day-select-label fw-semibold mb-2"
                      >
                        Yil
                      </label>
                      <select
                        className="form-select"
                        name="stationYearDate"
                        id="stationMonth"
                        required
                      >
                        {yearsForYear?.map((e, i) => {
                          return (
                            <option value={e} key={i}>
                              {e}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <button className="btn btn-primary mt-2">Qidirish</button>
                  </form>

                  <div className="day-btn-wrapper mt-2">
                    <button
                      onClick={() => exportDataToExcel("year")}
                      className="btn btn-primary ms-3"
                    >
                      Ma'lumotlarni saqlash
                    </button>
                  </div>
                </div>

                <div>
                  {yearData?.length > 0 ? (
                    <table className="c-table mt-4">
                      <thead className="c-table__header">
                        <tr>
                          <th className="c-table__col-label text-center">
                            Jami oqim m3
                          </th>
                          <th className="c-table__col-label text-center">
                            Musbat oqim m3
                          </th>
                          <th className="c-table__col-label text-center">
                            Oqim tezligi m3/s
                          </th>
                          <th className="c-table__col-label text-center">
                            Tezlik m/s
                          </th>
                          <th className="c-table__col-label text-center">
                            Sana
                          </th>
                        </tr>
                      </thead>
                      <tbody className="c-table__body">
                        {yearData?.map((e, i) => {
                          return (
                            <tr className="fs-6 column-admin-station" key={i}>
                              <td className="c-table__cell text-center">
                                {String(e.totalsFlow).includes(".")
                                  ? String(e.totalsFlow).slice(
                                      0,
                                      String(e.totalsFlow).indexOf(".") * 1 + 3
                                    )
                                  : e.totalsFlow}
                              </td>
                              <td className="c-table__cell text-center">
                                {String(e.positiveFlow).includes(".")
                                  ? String(e.positiveFlow).slice(
                                      0,
                                      String(e.positiveFlow).indexOf(".") * 1 +
                                        3
                                    )
                                  : e.positiveFlow}
                              </td>
                              <td className="c-table__cell text-center">
                                {String(e.flowRate).includes(".")
                                  ? String(e.flowRate).slice(
                                      0,
                                      String(e.flowRate).indexOf(".") * 1 + 3
                                    )
                                  : e.flowRate}
                              </td>
                              <td className="c-table__cell text-center">
                                {String(e.velocity).includes(".")
                                  ? String(e.velocity).slice(
                                      0,
                                      String(e.velocity).indexOf(".") * 1 + 3
                                    )
                                  : e.velocity}
                              </td>
                              <td className="c-table__cell text-center">
                                {moment(e.day).format("LL").split(" ")[1]}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  ) : (
                    <div className="alert alert-primary fw-semibold mt-3 text-center fs-5">
                      Hozircha ma'lumot kelmadi...
                    </div>
                  )}
                </div>
              </div>

              <div
                className="tab-pane fade profile-users-search pt-3"
                id="profile-users-search"
              >
                <h3 className="m-0">
                  <span className="text-primary">{searchStationName}</span>
                </h3>
                <div className="d-flex  justify-content-between flex-wrap mt-3">
                  <form
                    className="filter-form d-flex align-items-end justify-content-between flex-wrap"
                    onSubmit={getSearchData}
                  >
                    <div className="day-select-wrapper-month">
                      <label
                        htmlFor="stationCustom"
                        className="text-primary day-select-label fw-semibold mb-2"
                      >
                        Stansiya
                      </label>
                      <select
                        className="form-select"
                        name="stationSearch"
                        id="stationCustom"
                        required
                      >
                        {allStationForSearch?.map((e, i) => {
                          return (
                            <option value={e._id} key={i}>
                              {e.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div className="day-select-wrapper-month">
                      <label
                        htmlFor="dateStart"
                        className="text-primary day-select-label fw-semibold mb-2"
                      >
                        Boshlanish sana
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="dateStart"
                        name="dateStart"
                        required
                        defaultValue={new Date().toISOString().substring(0, 10)}
                      />
                    </div>

                    <div className="day-select-wrapper-month">
                      <label
                        htmlFor="dateEnd"
                        className="text-primary day-select-label fw-semibold mb-2"
                      >
                        Tugash sana
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="dateEnd"
                        name="dateEnd"
                        required
                        defaultValue={new Date().toISOString().substring(0, 10)}
                      />
                    </div>

                    <button className="btn btn-primary mt-2">Qidirish</button>
                  </form>

                  <div className="day-btn-wrapper mt-2">
                    <button
                      onClick={() => exportDataToExcel("search")}
                      className="btn btn-primary ms-3"
                    >
                      Ma'lumotlarni saqlash
                    </button>
                  </div>
                </div>

                <div>
                  {searchData?.length > 0 ? (
                    <table className="c-table mt-4">
                      <thead className="c-table__header">
                        <tr>
                          <th className="c-table__col-label text-center">
                            Jami oqim m3
                          </th>
                          <th className="c-table__col-label text-center">
                            Musbat oqim m3
                          </th>
                          <th className="c-table__col-label text-center">
                            Oqim tezligi m3/s
                          </th>
                          <th className="c-table__col-label text-center">
                            Tezlik m/s
                          </th>
                          <th className="c-table__col-label text-center">
                            Sana
                          </th>
                        </tr>
                      </thead>
                      <tbody className="c-table__body">
                        {searchData?.map((e, i) => {
                          return (
                            <tr className="fs-6 column-admin-station" key={i}>
                              <td className="c-table__cell text-center">
                                {String(e.totalsFlow).includes(".")
                                  ? String(e.totalsFlow).slice(
                                      0,
                                      String(e.totalsFlow).indexOf(".") * 1 + 3
                                    )
                                  : e.totalsFlow}
                              </td>
                              <td className="c-table__cell text-center">
                                {String(e.positiveFlow).includes(".")
                                  ? String(e.positiveFlow).slice(
                                      0,
                                      String(e.positiveFlow).indexOf(".") * 1 +
                                        3
                                    )
                                  : e.positiveFlow}
                              </td>
                              <td className="c-table__cell text-center">
                                {String(e.flowRate).includes(".")
                                  ? String(e.flowRate).slice(
                                      0,
                                      String(e.flowRate).indexOf(".") * 1 + 3
                                    )
                                  : e.flowRate}
                              </td>
                              <td className="c-table__cell text-center">
                                {String(e.velocity).includes(".")
                                  ? String(e.velocity).slice(
                                      0,
                                      String(e.velocity).indexOf(".") * 1 + 3
                                    )
                                  : e.velocity}
                              </td>
                              <td className="c-table__cell text-center">
                                {`${e.date.split("-")[1]}/${e.date
                                  .split("-")[2]
                                  .slice(0, 2)}/${e.date.split("-")[0]}`}{" "}
                                {`${e.date.split("T")[1].split(".")[0]}`}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  ) : (
                    <div className="alert alert-primary fw-semibold mt-3 text-center fs-5">
                      Hozircha ma'lumot kelmadi...
                    </div>
                  )}
                </div>
              </div>
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

export default AdminNews;
