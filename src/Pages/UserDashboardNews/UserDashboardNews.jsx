import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "./UserDashboard.css";
import todayChart from "../../assets/images/today-chart.png";
import more from "../../assets/images/more.png";
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
  } = props;

  const navigate = useNavigate();

  return (
    <HelmetProvider>
      <div>
        <div className="card user-dashboard-card">
          <div className="card-body pt-3">
            <h3 className="dashboard-heading m-0">
              {
                allBalansOrg.find((e) => {
                  if (e.id == allStation[0]?.balance_organization_id) {
                    return e;
                  }
                })?.name
              }
            </h3>
            <div className="dashboard-top-wrapper">
              <ul className="list-unstyled m-0 d-flex flex-wrap justify-content-between align-items-center m-0 list-unstyled">
                <li className="dashboard-top-list-item dashboard-top-list-item-one-month">
                  <h4 className="dashboard-top-list-item-heading m-0">
                    Umumiy stansiyalar
                  </h4>
                  <div className="d-flex align-items-center justify-content-end mt-4">
                    <img
                      src={todayChart}
                      alt="todayChart"
                      width={30}
                      height={30}
                    />
                    <p className="m-0 dashboard-top-list-item-desc ms-2">
                      {allStation.length} ta
                    </p>
                  </div>
                </li>

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
                      {stationTodayWorking.length} ta
                    </p>
                  </div>
                </li>

                <li className="dashboard-top-list-item dashboard-top-list-item-three">
                  <h4 className="dashboard-top-list-item-heading m-0">
                    3 kun ichida ishlagan stansiyalar
                  </h4>
                  <div className="d-flex align-items-center justify-content-end mt-4">
                    <img
                      src={todayChart}
                      alt="todayChart"
                      width={30}
                      height={30}
                    />
                    <p className="m-0 dashboard-top-list-item-desc ms-2">
                      {stationThreeDayWorking.length} ta
                    </p>
                  </div>
                </li>

                <li className="dashboard-top-list-item dashboard-top-list-item-not-working">
                  <h4 className="dashboard-top-list-item-heading m-0">
                    Ishlamagan stansiyalar
                  </h4>
                  <div className="d-flex align-items-center justify-content-end mt-4">
                    <img
                      src={todayChart}
                      alt="todayChart"
                      width={30}
                      height={30}
                    />
                    <p className="m-0 dashboard-top-list-item-desc ms-2">
                      {stationNotWorking.length} ta
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="dashboard-today-heading">
                Bugun ishlagan stansiyalar
              </h5>

              <div
                onClick={() => navigate("/user/today")}
                className="dashboard-more-wrapper d-flex align-items-center"
              >
                <img src={more} alt="more" width={20} height={20} />
                <span className="d-inline-block ms-2 dashboard-more">
                  Batafsil
                </span>
              </div>

              {stationTodayWorking?.length > 0 ? (
                <table className="c-table mt-4">
                  <thead className="c-table__header">
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
                    {stationTodayWorkingFive.map((e, i) => {
                      return (
                        <tr className="fs-6 column-admin-station" key={i}>
                          <td className="c-table__cell text-center">
                            {e.name}
                          </td>
                          <td className="c-table__cell text-center">
                            {e.topic}
                          </td>
                          <td className="c-table__cell text-center">
                            {e?.lastData.totalsFlow}
                          </td>
                          <td className="c-table__cell text-center">
                            {e?.lastData.positiveFlow}
                          </td>
                          <td className="c-table__cell text-center">
                            {e?.lastData.flowRate}
                          </td>
                          <td className="c-table__cell text-center">
                            {e?.lastData.velocity}
                          </td>
                          <td className="c-table__cell text-center">
                            {`${e?.lastData.date.split("T")[1].split(".")[0]}`}
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

            <div>
              <h5 className="dashboard-today-heading">
                3 kun ichida ishlagan stansiyalar
              </h5>

              <div
                onClick={() => navigate("/user/three")}
                className="dashboard-more-wrapper d-flex align-items-center"
              >
                <img src={more} alt="more" width={20} height={20} />
                <span className="d-inline-block ms-2 dashboard-more">
                  Batafsil
                </span>
              </div>

              {stationThreeDayWorkingFive?.length > 0 ? (
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
                    {stationThreeDayWorkingFive?.map((e, i) => {
                      return (
                        <tr className="fs-6 column-admin-station" key={i}>
                          <td className="c-table__cell text-center">
                            {e.name}
                          </td>
                          <td className="c-table__cell text-center">
                            {e.topic}
                          </td>
                          <td className="c-table__cell text-center">
                            {e?.lastData.totalsFlow}
                          </td>
                          <td className="c-table__cell text-center">
                            {e?.lastData.positiveFlow}
                          </td>
                          <td className="c-table__cell text-center">
                            {e?.lastData.flowRate}
                          </td>
                          <td className="c-table__cell text-center">
                            {e?.lastData.velocity}
                          </td>
                          <td className="c-table__cell text-center">
                            {`${e?.lastData.date.split("T")[1].split(".")[0]}`}
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
        </div>
      </div>

      <Helmet>
        <script src="../src/assets/js/table.js"></script>
      </Helmet>
    </HelmetProvider>
  );
};

export default UserDashboardNews;
