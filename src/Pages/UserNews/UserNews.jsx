import React, { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "./UserNews.css";
import { api, apiGlobal } from "../API/Api.global";

const UserNews = () => {
  const [todayOrYesterday, setTodayOrYesterday] = useState("today");
  const [monthOrYear, setMonthOrYear] = useState("daily");
  const [allStationForToday, setAllStationForToday] = useState([]);
  const [allStationForMonthOrYear, setAllStationForMonthOrYear] = useState([]);
  const [allStationForCustom, setAllStationForCustom] = useState([]);
  const [todayOrYesterdayData, setTodayOrYesterdayData] = useState([]);
  const [monthOrYearData, setMonthOrYearData] = useState([]);
  const [customData, setCustomData] = useState([]);
  const [stationIdForTodayOrYesterday, setStationIdForTodayOrYesterday] =
    useState();
  const [stationIdForMonthOrYear, setStationIdForMonthOrYear] = useState();
  const [dataForMonthOrYear, setDataForMonthOrYear] = useState();

  useEffect(() => {
    const fetchDataDayOrYesterday = async () => {
      const requestStation = await fetch(`${apiGlobal}/last-data/get-all`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        },
      });

      const responseStation = await requestStation.json();

      setAllStationForToday(responseStation.data);
      setStationIdForTodayOrYesterday(responseStation.data[0]?._id);

      fetch(`${api}/data/today?stationsId=${responseStation.data[0]?._id}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        },
      })
        .then((res) => res.json())
        .then((data) => setTodayOrYesterdayData(data.data));
    };

    fetchDataDayOrYesterday();

    const fetchDataMonthOrYear = async () => {
      const requestStation = await fetch(`${apiGlobal}/last-data/get-all`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        },
      });

      const responseStation = await requestStation.json();

      setAllStationForMonthOrYear(responseStation.data);
    };

    fetchDataMonthOrYear();

    const fetchDataCustom = async () => {
      const requestStation = await fetch(`${apiGlobal}/last-data/get-all`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        },
      });

      const responseStation = await requestStation.json();

      setAllStationForCustom(responseStation.data);
    };

    fetchDataCustom();
  }, []);

  // ! DAY OR YESTERDAY
  const getDataTodayOrYesterday = (value) => {
    if (value == "today") {
      fetch(`${api}/data/today?stationsId=${stationIdForTodayOrYesterday}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        },
      })
        .then((res) => res.json())
        .then((data) => setTodayOrYesterdayData(data.data));
    } else if (value == "yesterday") {
      fetch(
        `${api}/data/yesterday?stationsId=${stationIdForTodayOrYesterday}`,
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
        .then((data) => setTodayOrYesterdayData(data.data));
    }
  };

  const searchDataByStationId = async (stationId) => {
    if (todayOrYesterday == "today") {
      fetch(`${api}/data/today?stationsId=${stationId}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setStationIdForTodayOrYesterday(stationId);
          setTodayOrYesterdayData(data.data);
        });
    } else if (todayOrYesterday == "yesterday") {
      fetch(`${api}/data/yesterday?stationsId=${stationId}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setStationIdForTodayOrYesterday(stationId);
          setTodayOrYesterdayData(data.data);
        });
    }
  };

  // ! MONTH OR YEAR
  const getMonthDataMonthOrYear = (e) => {
    e.preventDefault();

    const { stationMonth, dateMonth } = e.target;

    setStationIdForMonthOrYear(stationMonth.value);
    setDataForMonthOrYear(dateMonth.value);

    if (monthOrYear == "daily") {
      fetch(
        `${api}/data/day?stationsId=${stationMonth.value}&date=${dateMonth.value}`,
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
        .then((data) => setMonthOrYearData(data.data));
    } else if (monthOrYear == "month") {
      fetch(
        `${api}/data/month?stationsId=${
          stationMonth.value
        }&month=${dateMonth.value.slice(0, 7)}`,
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
        .then((data) => setMonthOrYearData(data.data));
    } else if (monthOrYear == "year") {
      fetch(
        `${api}/data/year?stationsId=${
          stationMonth.value
        }&year=${dateMonth.value.slice(0, 4)}`,
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
        .then((data) => setMonthOrYearData(data.data));
    }
  };

  const getDataMonthOrYear = (value) => {
    if (value == "daily") {
      fetch(
        `${api}/data/day?stationsId=${stationIdForMonthOrYear}&date=${dataForMonthOrYear}`,
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
        .then((data) => setMonthOrYearData(data.data));
    } else if (value == "month") {
      fetch(
        `${api}/data/month?stationsId=${stationIdForMonthOrYear}&month=${dataForMonthOrYear?.slice(
          0,
          7
        )}`,
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
        .then((data) => setMonthOrYearData(data.data));
    } else if (value == "year") {
      fetch(
        `${api}/data/year?stationsId=${stationIdForMonthOrYear}&year=${dataForMonthOrYear?.slice(
          0,
          4
        )}`,
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
        .then((data) => setMonthOrYearData(data.data));
    }
  };

  // ! CUSTOM
  const searchDataByStationIdAndDataForCustom = (e) => {
    e.preventDefault();

    const { stationCustom, dateStart, dateEnd } = e.target;

    fetch(
      `${api}/data/custom?stationsId=${stationCustom.value}&startDate=${dateStart.value}&endDate=${dateEnd.value}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setCustomData(data.data));
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
                  data-bs-target="#profile-users"
                >
                  Bugungi va kechagi ma'lumotlar
                </button>
              </li>

              <li className="nav-item">
                <button
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#profile-overview"
                >
                  Kunlik, oylik, yillik ma'lumotlar
                </button>
              </li>

              <li className="nav-item">
                <button
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#profile-edit"
                >
                  Qidirish
                </button>
              </li>
            </ul>
            <div className="tab-content pt-2">
              <div
                className="tab-pane fade show active profile-users pt-3"
                id="profile-users"
              >
                <h3 className="m-0">
                  {todayOrYesterday == "today"
                    ? "Bugungi ma'lumotlar"
                    : todayOrYesterday == "yesterday"
                    ? "Kechaki ma'lumotlar"
                    : null}
                </h3>
                <div className="d-flex  justify-content-between flex-wrap mt-3">
                  <form className="day-form d-flex align-items-center justify-content-between flex-wrap">
                    <div className="day-select-wrapper">
                      <label
                        htmlFor="station"
                        className="text-success day-select-label fw-semibold mb-2"
                      >
                        Stansiya
                      </label>
                      <select
                        className="form-select"
                        name="region"
                        id="station"
                        onChange={(e) => searchDataByStationId(e.target.value)}
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
                      className="btn btn-success"
                      onClick={() => {
                        setTodayOrYesterday("today");
                        getDataTodayOrYesterday("today");
                      }}
                    >
                      Bugungi
                    </button>
                    <button
                      className="btn btn-success ms-3"
                      onClick={() => {
                        setTodayOrYesterday("yesterday");
                        getDataTodayOrYesterday("yesterday");
                      }}
                    >
                      Kechagi
                    </button>
                  </div>
                </div>

                <div>
                  {todayOrYesterdayData?.length > 0 ? (
                    <table className="c-table mt-4">
                      <thead className="c-table__header">
                        <tr>
                          <th className="c-table__col-label text-center">
                            Jami oqim
                          </th>
                          <th className="c-table__col-label text-center">
                            Musbat oqim
                          </th>
                          <th className="c-table__col-label text-center">
                            Oqim tezligi
                          </th>
                          <th className="c-table__col-label text-center">
                            Tezlik
                          </th>
                          <th className="c-table__col-label text-center">
                            Soat
                          </th>
                        </tr>
                      </thead>
                      <tbody className="c-table__body">
                        {todayOrYesterdayData?.map((e, i) => {
                          return (
                            <tr className="fs-6 column-admin-station" key={i}>
                              <td className="c-table__cell text-center">
                                {e.totalsFlow}
                              </td>
                              <td className="c-table__cell text-center">
                                {e.positiveFlow}
                              </td>
                              <td className="c-table__cell text-center">
                                {e.flowRate}
                              </td>
                              <td className="c-table__cell text-center">
                                {e.velocity}
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
                    <div className="alert alert-success fw-semibold mt-3 text-center fs-5">
                      Hozircha ma'lumot kelmadi...
                    </div>
                  )}
                </div>
              </div>

              <div
                className="tab-pane fade profile-overview pt-3"
                id="profile-overview"
              >
                <h3 className="m-0">
                  {monthOrYear == "daily"
                    ? "Kunlik ma'lumotlar"
                    : monthOrYear == "month"
                    ? "Oylik ma'lumotlar"
                    : monthOrYear == "year"
                    ? "Yillik ma'lumotlar"
                    : null}
                </h3>

                <div className="d-flex  justify-content-between flex-wrap mt-3">
                  <form
                    onSubmit={getMonthDataMonthOrYear}
                    className="month-form d-flex align-items-end justify-content-between flex-wrap"
                  >
                    <div className="day-select-wrapper-month">
                      <label
                        htmlFor="stationMonth"
                        className="text-success day-select-label fw-semibold mb-2"
                      >
                        Stansiya
                      </label>
                      <select
                        className="form-select"
                        name="stationMonth"
                        id="stationMonth"
                        required
                      >
                        {allStationForMonthOrYear?.map((e, i) => {
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
                        className="text-success day-select-label fw-semibold mb-2"
                      >
                        Sana
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="dateMonth"
                        required
                      />
                    </div>

                    <button className="btn btn-success mt-2">Qidirish</button>
                  </form>

                  <div className="day-btn-wrapper mt-2">
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        setMonthOrYear("daily");
                        getDataMonthOrYear("daily");
                      }}
                    >
                      Kunlik
                    </button>

                    <button
                      className="btn btn-success ms-3"
                      onClick={() => {
                        setMonthOrYear("month");
                        getDataMonthOrYear("month");
                      }}
                    >
                      Oylik
                    </button>

                    <button
                      className="btn btn-success ms-3"
                      onClick={() => {
                        setMonthOrYear("year");
                        getDataMonthOrYear("year");
                      }}
                    >
                      Yillik
                    </button>
                  </div>
                </div>

                <div>
                  {monthOrYearData?.length > 0 ? (
                    <table className="c-table mt-4">
                      <thead className="c-table__header">
                        <tr>
                          <th className="c-table__col-label text-center">
                            Jami oqim
                          </th>
                          <th className="c-table__col-label text-center">
                            Musbat oqim
                          </th>
                          <th className="c-table__col-label text-center">
                            Oqim tezligi
                          </th>
                          <th className="c-table__col-label text-center">
                            Tezlik
                          </th>
                          <th className="c-table__col-label text-center">
                            Sana
                          </th>
                        </tr>
                      </thead>
                      <tbody className="c-table__body">
                        {monthOrYearData?.map((e, i) => {
                          return (
                            <tr className="fs-6 column-admin-station" key={i}>
                              <td className="c-table__cell text-center">
                                {e.totalsFlow}
                              </td>
                              <td className="c-table__cell text-center">
                                {e.positiveFlow}
                              </td>
                              <td className="c-table__cell text-center">
                                {e.flowRate}
                              </td>
                              <td className="c-table__cell text-center">
                                {e.velocity}
                              </td>
                              <td className="c-table__cell text-center">
                                {monthOrYear == "daily"
                                  ? `${e?.date?.split("T")[1]?.split(".")[0]}`
                                  : monthOrYear == "month"
                                  ? e.day
                                  : monthOrYear == "year"
                                  ? e.day
                                  : null}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  ) : (
                    <div className="alert alert-success fw-semibold mt-3 text-center fs-5">
                      Hozircha ma'lumot yo'q...
                    </div>
                  )}
                </div>
              </div>

              <div
                className="tab-pane fade profile-edit pt-3"
                id="profile-edit"
              >
                <div className="role-create-list-wrapper">
                  <h3 className="m-0">Qidirish</h3>

                  <div className="d-flex  justify-content-between flex-wrap mt-3">
                    <form
                      className="filter-form d-flex align-items-end justify-content-between flex-wrap"
                      onSubmit={searchDataByStationIdAndDataForCustom}
                    >
                      <div className="day-select-wrapper-month">
                        <label
                          htmlFor="stationCustom"
                          className="text-success day-select-label fw-semibold mb-2"
                        >
                          Stansiya
                        </label>
                        <select
                          className="form-select"
                          name="stationCustom"
                          id="stationCustom"
                          required
                        >
                          {allStationForCustom?.map((e, i) => {
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
                          className="text-success day-select-label fw-semibold mb-2"
                        >
                          Boshlanish sana
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="dateStart"
                          name="dateStart"
                          required
                        />
                      </div>

                      <div className="day-select-wrapper-month">
                        <label
                          htmlFor="dateEnd"
                          className="text-success day-select-label fw-semibold mb-2"
                        >
                          Tugash sana
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="dateEnd"
                          name="dateEnd"
                          required
                        />
                      </div>

                      <button className="btn btn-success mt-2">Qidirish</button>
                    </form>
                  </div>
                </div>

                <div>
                  {customData?.length > 0 ? (
                    <table className="c-table mt-4">
                      <thead className="c-table__header">
                        <tr>
                          <th className="c-table__col-label text-center">
                            Jami oqim
                          </th>
                          <th className="c-table__col-label text-center">
                            Musbat oqim
                          </th>
                          <th className="c-table__col-label text-center">
                            Oqim tezligi
                          </th>
                          <th className="c-table__col-label text-center">
                            Tezlik
                          </th>
                          <th className="c-table__col-label text-center">
                            Sana
                          </th>
                        </tr>
                      </thead>
                      <tbody className="c-table__body">
                        {customData?.map((e, i) => {
                          return (
                            <tr className="fs-6 column-admin-station" key={i}>
                              <td className="c-table__cell text-center">
                                {e.totalsFlow}
                              </td>
                              <td className="c-table__cell text-center">
                                {e.positiveFlow}
                              </td>
                              <td className="c-table__cell text-center">
                                {e.flowRate}
                              </td>
                              <td className="c-table__cell text-center">
                                {e.velocity}
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
                    <div className="alert alert-success fw-semibold mt-3 text-center fs-5">
                      Hozircha ma'lumot yo'q...
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

export default UserNews;
