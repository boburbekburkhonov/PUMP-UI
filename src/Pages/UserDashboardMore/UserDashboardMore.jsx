import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import * as XLSX from "xlsx";

const UserDashboardMore = (props) => {
  const location = useLocation();
  const {
    allStation,
    allBalansOrg,
    stationNotWorking,
    stationTodayWorking,
    stationThreeDayWorking,
  } = props;

  // ! SAVE DATA
  const exportDataToExcel = (data) => {
    if (data == "today") {
      const workBook = XLSX.utils.book_new();
      const workSheet = XLSX.utils.json_to_sheet(stationTodayWorking);

      XLSX.utils.book_append_sheet(workBook, workSheet, "MySheet1");

      XLSX.writeFile(workBook, "Nasos.xlsx");
    } else if (data == "three") {
      const workBook = XLSX.utils.book_new();
      const workSheet = XLSX.utils.json_to_sheet(stationThreeDayWorking);

      XLSX.utils.book_append_sheet(workBook, workSheet, "MySheet1");

      XLSX.writeFile(workBook, "Nasos.xlsx");
    } else if (data == "custom") {
      const workBook = XLSX.utils.book_new();
      const workSheet = XLSX.utils.json_to_sheet(customData);

      XLSX.utils.book_append_sheet(workBook, workSheet, "MySheet1");

      XLSX.writeFile(workBook, "Nasos.xlsx");
    }
  };

  return (
    <HelmetProvider>
      <div>
        <div className="card user-dashboard-card">
          <div className="card-body pt-3">
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="dashboard-heading m-0">
                {
                  allBalansOrg.find((e) => {
                    if (e.id == allStation[0]?.balance_organization_id) {
                      return e;
                    }
                  })?.name
                }
              </h3>

              <button
                onClick={() =>
                  exportDataToExcel(location.pathname.split("/")[2])
                }
                className="btn btn-primary ms-3"
              >
                Ma'lumotlarni saqlash
              </button>
            </div>

            {location.pathname.split("/")[2] == "today" ? (
              <div>
                {stationTodayWorking?.length > 0 ? (
                  <table className="c-table mt-4">
                    <thead className="c-table__header">
                      <tr>
                        <th className="c-table__col-label text-center">Nomi</th>
                        <th className="c-table__col-label text-center">
                          Topic
                        </th>
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
                      {stationTodayWorking.map((e, i) => {
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
                              {`${
                                e?.lastData.date.split("T")[1].split(".")[0]
                              }`}
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
            ) : location.pathname.split("/")[2] == "three" ? (
              <div>
                {stationThreeDayWorking?.length > 0 ? (
                  <table className="c-table mt-4">
                    <thead className="c-table__header c-table__header-three">
                      <tr>
                        <th className="c-table__col-label text-center">Nomi</th>
                        <th className="c-table__col-label text-center">
                          Topic
                        </th>
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
                      {stationThreeDayWorking.map((e, i) => {
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
                              {`${
                                e?.lastData.date.split("T")[1].split(".")[0]
                              }`}
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
            ) : null}
          </div>
        </div>
      </div>

      <Helmet>
        <script src="../src/assets/js/table.js"></script>
      </Helmet>
    </HelmetProvider>
  );
};

export default UserDashboardMore;
