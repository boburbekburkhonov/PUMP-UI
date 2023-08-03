import React, { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "./UserNews.css";
import { api, apiGlobal } from "../API/Api.global";
import moment from "moment";

const UserNews = () => {
  const [todayOrYesterday, setTodayOrYesterday] = useState("today");
  const [monthOrYear, setMonthOrYear] = useState("daily");
  const [allRegionsForToday, setAllRegionsForToday] = useState([]);
  const [allStationForToday, setAllStationForToday] = useState([]);
  const [allRegionsForMonthOrYear, setAllRegionsForMonthOrYear] = useState([]);
  const [allStationForMonthOrYear, setAllStationForMonthOrYear] = useState([]);
  const [allRegionsForCustom, setAllRegionsForCustom] = useState([]);
  const [allStationForCustom, setAllStationForCustom] = useState([]);
  const [todayOrYesterdayData, setTodayOrYesterdayData] = useState([]);
  const [monthOrYearData, setMonthOrYearData] = useState([]);
  const [customData, setCustomData] = useState([]);
  const [stationNameForMonthOrYear, setStationNameForMonthOrYear] = useState(
    []
  );
  const [stationIdForTodayOrYesterday, setStationIdForTodayOrYesterday] =
    useState();
  const [stationIdForMonthOrYear, setStationIdForMonthOrYear] = useState();
  const [dataForMonthOrYear, setDataForMonthOrYear] = useState();

  useEffect(() => {
    const fetchDataDayOrYesterday = async () => {
      const requestRegionAll = await fetch(`${apiGlobal}/regions/all`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        },
      });
      const responseRegionAll = await requestRegionAll.json();
      setAllRegionsForToday(responseRegionAll.regions);

      const requestStationAll = await fetch(
        `${apiGlobal}/stations/find-by-regionNumber?regionNumber=${responseRegionAll.regions[0]?.id}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization:
              "Bearer " + window.localStorage.getItem("accessToken"),
          },
        }
      );

      const responseStationAll = await requestStationAll.json();
      setAllStationForToday(responseStationAll.data);
      setStationIdForTodayOrYesterday(responseStationAll?.data[0]?._id);

      fetch(
        `${api}/data/today?stationsId=${responseStationAll?.data[0]?._id}`,
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
    };

    fetchDataDayOrYesterday();

    const fetchDataMonthOrYear = async () => {
      const requestRegionAll = await fetch(`${apiGlobal}/regions/all`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        },
      });
      const responseRegionAll = await requestRegionAll.json();
      setAllRegionsForMonthOrYear(responseRegionAll.regions);

      const requestStationAll = await fetch(
        `${apiGlobal}/stations/find-by-regionNumber?regionNumber=${responseRegionAll.regions[0]?.id}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization:
              "Bearer " + window.localStorage.getItem("accessToken"),
          },
        }
      );

      const responseStationAll = await requestStationAll.json();
      setAllStationForMonthOrYear(responseStationAll.data);
    };

    fetchDataMonthOrYear();

    const fetchDataCustom = async () => {
      const requestRegionAll = await fetch(`${apiGlobal}/regions/all`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        },
      });
      const responseRegionAll = await requestRegionAll.json();
      setAllRegionsForCustom(responseRegionAll.regions);

      const requestStationAll = await fetch(
        `${apiGlobal}/stations/find-by-regionNumber?regionNumber=${responseRegionAll.regions[0]?.id}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization:
              "Bearer " + window.localStorage.getItem("accessToken"),
          },
        }
      );

      const responseStationAll = await requestStationAll.json();
      setAllStationForCustom(responseStationAll.data);
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

  const searchDataByRegionId = async (regionId) => {
    const requestStationAll = await fetch(
      `${apiGlobal}/stations/find-by-regionNumber?regionNumber=${regionId}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        },
      }
    );

    const responseStationAll = await requestStationAll.json();
    setAllStationForToday(responseStationAll.data);
    setStationIdForTodayOrYesterday(responseStationAll?.data[0]?._id);

    if (todayOrYesterday == "today") {
      fetch(
        `${api}/data/today?stationsId=${responseStationAll?.data[0]?._id}`,
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
    } else if (todayOrYesterday == "yesterday") {
      fetch(
        `${api}/data/yesterday?stationsId=${responseStationAll?.data[0]?._id}`,
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
  const getStationByRegionIdForMonthOrYear = (regionId) => {
    fetch(
      `${apiGlobal}/stations/find-by-regionNumber?regionNumber=${regionId}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setAllStationForMonthOrYear(data.data));
  };

  const getMonthDataMonthOrYear = (e) => {
    e.preventDefault();

    const { stationMonth, dateMonth } = e.target;

    const foundStationName = allStationForMonthOrYear.find(
      (e) => e._id == stationMonth.value
    );

    setStationNameForMonthOrYear(foundStationName.name);
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
  const getStationByRegionIdForCustom = (regionId) => {
    fetch(
      `${apiGlobal}/stations/find-by-regionNumber?regionNumber=${regionId}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setAllStationForCustom(data.data));
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
                        htmlFor="region"
                        className="text-success day-select-label fw-semibold mb-2"
                      >
                        Viloyat
                      </label>
                      <select
                        className="form-select"
                        required
                        onChange={(e) => searchDataByRegionId(e.target.value)}
                      >
                        {allRegionsForToday?.map((e, i) => {
                          return (
                            <option value={e.id} key={i}>
                              {e.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>

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
                            Nomi
                          </th>
                          <th className="c-table__col-label text-center">
                            Jami oqim
                          </th>
                          <th className="c-table__col-label text-center">
                            Ijobiy oqim
                          </th>
                          <th className="c-table__col-label text-center">
                            Oqim darajasi
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
                        {todayOrYesterdayData?.map((e, i) => {
                          return (
                            <tr className="fs-6 column-admin-station" key={i}>
                              <td className="c-table__cell text-center">
                                {
                                  allStationForToday?.find((s) => {
                                    if (s._id == e.stationId) {
                                      return s.name;
                                    }
                                  })?.name
                                }
                              </td>
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
                        htmlFor="regionMonth"
                        className="text-success day-select-label fw-semibold mb-2"
                      >
                        Viloyat
                      </label>
                      <select
                        className="form-select"
                        name="region"
                        id="regionMonth"
                        required
                        onChange={(e) =>
                          getStationByRegionIdForMonthOrYear(e.target.value)
                        }
                      >
                        {allRegionsForMonthOrYear?.map((e, i) => {
                          return (
                            <option value={e.id} key={i}>
                              {e.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>

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
                            Nomi
                          </th>
                          <th className="c-table__col-label text-center">
                            Jami oqim
                          </th>
                          <th className="c-table__col-label text-center">
                            Ijobiy oqim
                          </th>
                          <th className="c-table__col-label text-center">
                            Oqim darajasi
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
                                {stationNameForMonthOrYear}
                              </td>
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
                      Hozircha ma'lumot kelmadi...
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
                    <form className="filter-form d-flex align-items-end justify-content-between flex-wrap">
                      <div className="day-select-wrapper-month">
                        <label
                          htmlFor="regionMonth"
                          className="text-success day-select-label fw-semibold mb-2"
                        >
                          Viloyat
                        </label>
                        <select
                          className="form-select"
                          name="region"
                          id="regionMonth"
                          required
                          onChange={(e) =>
                            getStationByRegionIdForCustom(e.target.value)
                          }
                        >
                          {allRegionsForCustom?.map((e, i) => {
                            return (
                              <option value={e.id} key={i}>
                                {e.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>

                      <div className="day-select-wrapper-month">
                        <label
                          htmlFor="regionMonth"
                          className="text-success day-select-label fw-semibold mb-2"
                        >
                          Stansiya
                        </label>
                        <select
                          className="form-select"
                          name="region"
                          id="regionMonth"
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
                          htmlFor="dateMonth"
                          className="text-success day-select-label fw-semibold mb-2"
                        >
                          Boshlanish sana
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="dateMonth"
                          required
                        />
                      </div>

                      <div className="day-select-wrapper-month">
                        <label
                          htmlFor="dateMonth"
                          className="text-success day-select-label fw-semibold mb-2"
                        >
                          Tugash sana
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
                  </div>
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
