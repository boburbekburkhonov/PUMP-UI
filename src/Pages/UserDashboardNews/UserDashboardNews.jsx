import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "./UserDashboard.css";
import { useNavigate } from "react-router-dom";

const UserDashboardNews = (props) => {
  const {
    allStation,
    allBalansOrg,
    stationNotWorking,
    stationNotWorkingFive,
    stationTodayWorking,
    stationTodayWorkingFive,
    stationThreeDayWorking,
    stationThreeDayWorkingFive,
    stationOtherWorking,
    stationOtherWorkingFive,
  } = props;

  const navigate = useNavigate();

  return (
    <HelmetProvider>
      <div>
        <div className="card user-dashboard-card">
          <div className="card-body pt-3">
            <div className="d-flex align-items-center mb-3">
              <img
                src="https://img.icons8.com/?size=512&id=7880&format=png"
                alt="location"
                width={35}
                height={35}
              />
              <h3 className="dashboard-heading m-0 ms-2 text-primary">
                {
                  allBalansOrg.find((e) => {
                    if (e.id == allStation[0]?.balance_organization_id) {
                      return e;
                    }
                  })?.name
                }
              </h3>
            </div>

            <div className="dashboard-top-wrapper">
              <ul className="list-unstyled dashboard-statis-wrapper m-0 d-flex flex-wrap justify-content-between align-items-center m-0 list-unstyled">
                <li className="dashboard-top-list-item dashboard-top-list-item-one-month mt-4">
                  <a href="#" className="text-decoration-none text-black">
                    <h4 className="dashboard-top-list-item-heading m-0">
                      Umumiy stansiyalar
                    </h4>
                    <div className="d-flex align-items-center justify-content-end mt-4">
                      <img
                        src="https://img.icons8.com/?size=512&id=SCY7gqvxY0DC&format=png"
                        alt="todayChart"
                        width={30}
                        height={30}
                      />
                      <p className="m-0 dashboard-top-list-item-desc ms-2">
                        {allStation.length} ta
                      </p>
                    </div>
                  </a>
                </li>

                <li className="dashboard-top-list-item mt-4">
                  <a href="#today" className="text-decoration-none text-black">
                    <h4 className="dashboard-top-list-item-heading m-0">
                      Bugungi ishlagan stansiyalar
                    </h4>
                    <div className="d-flex align-items-center justify-content-end mt-4">
                      <img
                        src="https://img.icons8.com/?size=512&id=FkQHNSmqWQWH&format=png"
                        alt="todayChart"
                        width={30}
                        height={30}
                      />
                      <p className="m-0 dashboard-top-list-item-desc ms-2">
                        {stationTodayWorking.length} ta
                      </p>
                    </div>
                  </a>
                </li>

                <li className="dashboard-top-list-item dashboard-top-list-item-three mt-4">
                  <a href="#three" className="text-decoration-none text-black">
                    <h4 className="dashboard-top-list-item-heading m-0">
                      3 kun ichida ishlagan stansiyalar
                    </h4>
                    <div className="d-flex align-items-center justify-content-end mt-4">
                      <img
                        src="https://img.icons8.com/?size=512&id=zQ1yf8Peqsvz&format=png"
                        alt="todayChart"
                        width={30}
                        height={30}
                      />
                      <p className="m-0 dashboard-top-list-item-desc ms-2">
                        {stationThreeDayWorking.length} ta
                      </p>
                    </div>
                  </a>
                </li>

                <li className="dashboard-top-list-item dashboard-top-list-item-not-working mt-4">
                  <a
                    href="#notworking"
                    className="text-decoration-none text-black"
                  >
                    <h4 className="dashboard-top-list-item-heading m-0">
                      Ishlamagan stansiyalar
                    </h4>
                    <div className="d-flex align-items-center justify-content-end mt-4">
                      <img
                        src="https://img.icons8.com/?size=512&id=Zyo5wDjgJxRW&format=png"
                        alt="todayChart"
                        width={30}
                        height={30}
                      />
                      <p className="m-0 dashboard-top-list-item-desc ms-2">
                        {stationNotWorking.length + stationOtherWorking.length}{" "}
                        ta
                      </p>
                    </div>
                  </a>
                </li>
              </ul>
            </div>

            <div id="today">
              <h5 className="dashboard-today-heading">
                Bugun ishlagan stansiyalar
              </h5>

              <div
                onClick={() => navigate("/user/today")}
                className="dashboard-more-wrapper d-flex align-items-center"
              >
                <button
                  className="d-inline-block ms-2 dashboard-more text-primary fw-semibold background"
                  disabled={stationTodayWorking?.length > 0 ? false : true}
                >
                  Batafsil
                </button>
              </div>

              <div className="table-scrol">
                <table className="c-table mt-4">
                  <thead className="c-table__header c-table__header-today">
                    <tr>
                      <th className="c-table__col-label text-center">Nomi</th>
                      <th className="c-table__col-label text-center">Topic</th>
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
                      <th className="c-table__col-label text-center">Sana</th>
                    </tr>
                  </thead>
                  <tbody className="c-table__body">
                    {stationTodayWorking?.length > 0
                      ? stationTodayWorkingFive.map((e, i) => {
                          return (
                            <tr className="fs-6 column-admin-station" key={i}>
                              <td className="c-table__cell text-center">
                                {e.name}
                              </td>
                              <td className="c-table__cell text-center">
                                {e.topic}
                              </td>
                              <td className="c-table__cell text-center">
                                {String(e?.lastData.totalsFlow).includes(".")
                                  ? String(e?.lastData.totalsFlow).slice(
                                      0,
                                      String(e?.lastData.totalsFlow).indexOf(
                                        "."
                                      ) *
                                        1 +
                                        3
                                    )
                                  : e?.lastData.totalsFlow}
                              </td>
                              <td className="c-table__cell text-center">
                                {String(e?.lastData.positiveFlow).includes(".")
                                  ? String(e?.lastData.positiveFlow).slice(
                                      0,
                                      String(e?.lastData.positiveFlow).indexOf(
                                        "."
                                      ) *
                                        1 +
                                        3
                                    )
                                  : e?.lastData.positiveFlow}
                              </td>
                              <td className="c-table__cell text-center">
                                {String(e?.lastData.flowRate).includes(".")
                                  ? String(e?.lastData.flowRate).slice(
                                      0,
                                      String(e?.lastData.flowRate).indexOf(
                                        "."
                                      ) *
                                        1 +
                                        3
                                    )
                                  : e?.lastData.flowRate}
                              </td>
                              <td className="c-table__cell text-center">
                                {String(e?.lastData.velocity).includes(".")
                                  ? String(e?.lastData.velocity).slice(
                                      0,
                                      String(e?.lastData.velocity).indexOf(
                                        "."
                                      ) *
                                        1 +
                                        3
                                    )
                                  : e?.lastData.velocity}
                              </td>
                              <td className="c-table__cell text-center">
                                {`${
                                  e?.lastData.date.split("T")[1].split(".")[0]
                                }`}
                              </td>
                            </tr>
                          );
                        })
                      : null}
                  </tbody>
                </table>
              </div>
            </div>

            <div id="three">
              <h5 className="dashboard-today-heading">
                3 kun ichida ishlagan stansiyalar
              </h5>

              <div
                onClick={() => navigate("/user/three")}
                className="dashboard-more-wrapper d-flex align-items-center"
              >
                <button
                  disabled={
                    stationThreeDayWorkingFive?.length > 0 ? false : true
                  }
                  className="d-inline-block ms-2 dashboard-more text-primary fw-semibold background"
                >
                  Batafsil
                </button>
              </div>

              <div className="table-scrol">
                <table className="c-table mt-4">
                  <thead className="c-table__header c-table__header-three">
                    <tr>
                      <th className="c-table__col-label text-center">Nomi</th>
                      <th className="c-table__col-label text-center">Topic</th>
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
                      <th className="c-table__col-label text-center">Sana</th>
                    </tr>
                  </thead>
                  <tbody className="c-table__body">
                    {stationThreeDayWorkingFive?.length > 0
                      ? stationThreeDayWorkingFive?.map((e, i) => {
                          return (
                            <tr className="fs-6 column-admin-station" key={i}>
                              <td className="c-table__cell text-center">
                                {e.name}
                              </td>
                              <td className="c-table__cell text-center">
                                {e.topic}
                              </td>
                              <td className="c-table__cell text-center">
                                {String(e?.lastData.totalsFlow).includes(".")
                                  ? String(e?.lastData.totalsFlow).slice(
                                      0,
                                      String(e?.lastData.totalsFlow).indexOf(
                                        "."
                                      ) *
                                        1 +
                                        3
                                    )
                                  : e?.lastData.totalsFlow}
                              </td>
                              <td className="c-table__cell text-center">
                                {String(e?.lastData.positiveFlow).includes(".")
                                  ? String(e?.lastData.positiveFlow).slice(
                                      0,
                                      String(e?.lastData.positiveFlow).indexOf(
                                        "."
                                      ) *
                                        1 +
                                        3
                                    )
                                  : e?.lastData.positiveFlow}
                              </td>
                              <td className="c-table__cell text-center">
                                {String(e?.lastData.flowRate).includes(".")
                                  ? String(e?.lastData.flowRate).slice(
                                      0,
                                      String(e?.lastData.flowRate).indexOf(
                                        "."
                                      ) *
                                        1 +
                                        3
                                    )
                                  : e?.lastData.flowRate}
                              </td>
                              <td className="c-table__cell text-center">
                                {String(e?.lastData.velocity).includes(".")
                                  ? String(e?.lastData.velocity).slice(
                                      0,
                                      String(e?.lastData.velocity).indexOf(
                                        "."
                                      ) *
                                        1 +
                                        3
                                    )
                                  : e?.lastData.velocity}
                              </td>
                              <td className="c-table__cell text-center">
                                {`${
                                  e?.lastData.date.split("-")[1]
                                }/${e?.lastData.date
                                  .split("-")[2]
                                  .slice(0, 2)}/${
                                  e?.lastData.date.split("-")[0]
                                }`}{" "}
                                {`${
                                  e?.lastData.date.split("T")[1].split(".")[0]
                                }`}
                              </td>
                            </tr>
                          );
                        })
                      : null}
                  </tbody>
                </table>
              </div>
            </div>

            <div id="notworking">
              <h5 className="dashboard-today-heading">
                Uzoq vaqt ishlamagan stansiyalar
              </h5>

              <div
                onClick={() => navigate("/user/other")}
                className="dashboard-more-wrapper d-flex align-items-center"
              >
                <button
                  className="d-inline-block ms-2 dashboard-more text-primary fw-semibold background"
                  disabled={stationOtherWorkingFive.length > 0 ? false : true}
                >
                  Batafsil
                </button>
              </div>

              <div className="table-scrol">
                <table className="c-table mt-4">
                  <thead className="c-table__header c-table__header-others">
                    <tr>
                      <th className="c-table__col-label text-center">Nomi</th>
                      <th className="c-table__col-label text-center">Topic</th>
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
                      <th className="c-table__col-label text-center">Sana</th>
                    </tr>
                  </thead>
                  <tbody className="c-table__body">
                    {stationOtherWorkingFive.length > 0
                      ? stationOtherWorkingFive?.map((e, i) => {
                          return (
                            <tr className="fs-6 column-admin-station" key={i}>
                              <td className="c-table__cell text-center">
                                {e.name}
                              </td>
                              <td className="c-table__cell text-center">
                                {e.topic}
                              </td>
                              <td className="c-table__cell text-center">
                                {String(e?.lastData.totalsFlow).includes(".")
                                  ? String(e?.lastData.totalsFlow).slice(
                                      0,
                                      String(e?.lastData.totalsFlow).indexOf(
                                        "."
                                      ) *
                                        1 +
                                        3
                                    )
                                  : e?.lastData.totalsFlow}
                              </td>
                              <td className="c-table__cell text-center">
                                {String(e?.lastData.positiveFlow).includes(".")
                                  ? String(e?.lastData.positiveFlow).slice(
                                      0,
                                      String(e?.lastData.positiveFlow).indexOf(
                                        "."
                                      ) *
                                        1 +
                                        3
                                    )
                                  : e?.lastData.positiveFlow}
                              </td>
                              <td className="c-table__cell text-center">
                                {String(e?.lastData.flowRate).includes(".")
                                  ? String(e?.lastData.flowRate).slice(
                                      0,
                                      String(e?.lastData.flowRate).indexOf(
                                        "."
                                      ) *
                                        1 +
                                        3
                                    )
                                  : e?.lastData.flowRate}
                              </td>
                              <td className="c-table__cell text-center">
                                {String(e?.lastData.velocity).includes(".")
                                  ? String(e?.lastData.velocity).slice(
                                      0,
                                      String(e?.lastData.velocity).indexOf(
                                        "."
                                      ) *
                                        1 +
                                        3
                                    )
                                  : e?.lastData.velocity}
                              </td>
                              <td className="c-table__cell text-center">
                                {`${
                                  e?.lastData.date.split("-")[1]
                                }/${e?.lastData.date
                                  .split("-")[2]
                                  .slice(0, 2)}/${
                                  e?.lastData.date.split("-")[0]
                                }`}{" "}
                                {`${
                                  e?.lastData.date.split("T")[1].split(".")[0]
                                }`}
                              </td>
                            </tr>
                          );
                        })
                      : null}
                  </tbody>
                </table>
              </div>
            </div>

            <div id="notworking">
              <h5 className="dashboard-today-heading">
                Umuman ishlamagan stansiyalar
              </h5>

              <div
                onClick={() => navigate("/user/notworking")}
                className="dashboard-more-wrapper d-flex align-items-center"
              >
                <button
                  disabled={stationNotWorkingFive?.length > 0 ? false : true}
                  className="d-inline-block ms-2 dashboard-more text-primary fw-semibold background"
                >
                  Batafsil
                </button>
              </div>

              <div className="table-scrol">
                <table className="c-table mt-4">
                  <thead className="c-table__header c-table__header-notworking">
                    <tr>
                      <th className="c-table__col-label text-center">Nomi</th>
                      <th className="c-table__col-label text-center">Topic</th>
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
                      <th className="c-table__col-label text-center">Sana</th>
                    </tr>
                  </thead>
                  <tbody className="c-table__body">
                    {stationNotWorkingFive?.length > 0
                      ? stationNotWorkingFive?.map((e, i) => {
                          return (
                            <tr className="fs-6 column-admin-station" key={i}>
                              <td className="c-table__cell text-center">
                                {e.name}
                              </td>
                              <td className="c-table__cell text-center">
                                {e.topic}
                              </td>
                              <td
                                className={`c-table__cell text-center ${
                                  e?.lastData == undefined
                                    ? "text-danger"
                                    : "text-black"
                                }`}
                              >
                                {e?.lastData != undefined
                                  ? e?.lastData.totalsFlow
                                  : "Ma'lumot kelmagan!"}
                              </td>
                              <td
                                className={`c-table__cell text-center ${
                                  e?.lastData == undefined
                                    ? "text-danger"
                                    : "text-black"
                                }`}
                              >
                                {e?.lastData != undefined
                                  ? e?.lastData.positiveFlow
                                  : "Ma'lumot kelmagan!"}
                              </td>
                              <td
                                className={`c-table__cell text-center ${
                                  e?.lastData == undefined
                                    ? "text-danger"
                                    : "text-black"
                                }`}
                              >
                                {e?.lastData != undefined
                                  ? e?.lastData.flowRate
                                  : "Ma'lumot kelmagan!"}
                              </td>
                              <td
                                className={`c-table__cell text-center ${
                                  e?.lastData == undefined
                                    ? "text-danger"
                                    : "text-black"
                                }`}
                              >
                                {e?.lastData != undefined
                                  ? e?.lastData.velocity
                                  : "Ma'lumot kelmagan!"}
                              </td>
                              <td
                                className={`c-table__cell text-center ${
                                  e?.lastData == undefined
                                    ? "text-danger"
                                    : "text-black"
                                }`}
                              >
                                {e?.lastData != undefined
                                  ? `${
                                      e?.lastData.date
                                        .split("T")[1]
                                        .split(".")[0]
                                    }`
                                  : "Ma'lumot kelmagan!"}
                              </td>
                            </tr>
                          );
                        })
                      : null}
                  </tbody>
                </table>
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

export default UserDashboardNews;
