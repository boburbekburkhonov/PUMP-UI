import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import * as XLSX from "xlsx";
import { api } from "../API/Api.global";

const UserDashboardMore = (props) => {
  const location = useLocation();
  const [allRegion, setAllRegion] = useState([]);
  const [allDistrict, setAllDistrict] = useState([]);
  const {
    allStation,
    allBalansOrg,
    stationNotWorking,
    stationTodayWorking,
    stationThreeDayWorking,
    stationOtherWorking,
  } = props;

  useEffect(() => {
    fetch(`${api}/regions/all`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    })
      .then((res) => res.json())
      .then((data) => setAllRegion(data.regions));

    fetch(`${api}/districts/all`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    })
      .then((res) => res.json())
      .then((data) => setAllDistrict(data.districts));
  }, []);

  // ! SAVE DATA
  const exportDataToExcel = (data) => {
    if (data == "today") {
      let resultStationTodayWorking = [];

      stationTodayWorking.forEach((e) => {
        resultStationTodayWorking.push({
          _id: e._id,
          name: e.name,
          topic: e.topic,
          region: allRegion.find((r) => {
            if (r.id == e.region_id) {
              return r;
            }
          })?.name,
          district: allDistrict.find((d) => {
            if (d.id == e.district_id) {
              return d;
            }
          })?.name,
          location: e.location,
          devicePhoneNumber: e.devicePhoneNum,
          status: e.status,
          isIntegration: e.isIntegration == true ? "true" : "false",
          flowRate: e?.lastData.flowRate,
          positiveFlow: e?.lastData.positiveFlow,
          totalsFlow: e?.lastData.totalsFlow,
          velocity: e?.lastData.velocity,
          isWrite: e?.lastData.isWrite == true ? "true" : "false",
          date: e?.lastData.date,
        });
      });

      const workBook = XLSX.utils.book_new();
      const workSheet = XLSX.utils.json_to_sheet(resultStationTodayWorking);

      XLSX.utils.book_append_sheet(workBook, workSheet, "MySheet1");

      XLSX.writeFile(
        workBook,
        `${
          allBalansOrg.find((e) => {
            if (e.id == allStation[0]?.balance_organization_id) {
              return e;
            }
          })?.name
        } ning bugun kelgan ma'lumotlari.xlsx`
      );
    } else if (data == "three") {
      let resultStationThreeDayWorking = [];

      stationThreeDayWorking.forEach((e) => {
        resultStationThreeDayWorking.push({
          _id: e._id,
          name: e.name,
          topic: e.topic,
          region: allRegion.find((r) => {
            if (r.id == e.region_id) {
              return r;
            }
          })?.name,
          district: allDistrict.find((d) => {
            if (d.id == e.district_id) {
              return d;
            }
          })?.name,
          location: e.location,
          devicePhoneNumber: e.devicePhoneNum,
          status: e.status,
          isIntegration: e.isIntegration == true ? "true" : "false",
          flowRate: e?.lastData.flowRate,
          positiveFlow: e?.lastData.positiveFlow,
          totalsFlow: e?.lastData.totalsFlow,
          velocity: e?.lastData.velocity,
          isWrite: e?.lastData.isWrite == true ? "true" : "false",
          date: e?.lastData.date,
        });
      });

      const workBook = XLSX.utils.book_new();
      const workSheet = XLSX.utils.json_to_sheet(resultStationThreeDayWorking);

      XLSX.utils.book_append_sheet(workBook, workSheet, "MySheet1");

      XLSX.writeFile(
        workBook,
        `${
          allBalansOrg.find((e) => {
            if (e.id == allStation[0]?.balance_organization_id) {
              return e;
            }
          })?.name
        } ning 3 kun ichida kelgan ma'lumotlari.xlsx`
      );
    } else if (data == "notworking") {
      let resultStationNotWorking = [];

      stationNotWorking.forEach((e) => {
        resultStationNotWorking.push({
          _id: e._id,
          name: e.name,
          topic: e.topic,
          region: allRegion.find((r) => {
            if (r.id == e.region_id) {
              return r;
            }
          })?.name,
          district: allDistrict.find((d) => {
            if (d.id == e.district_id) {
              return d;
            }
          })?.name,
          location: e.location,
          devicePhoneNumber: e.devicePhoneNum,
          status: e.status,
          isIntegration: e.isIntegration == true ? "true" : "false",
          flowRate:
            e?.lastData != undefined
              ? e?.lastData.flowRate
              : "Ma'lumot kelmagan",
          positiveFlow:
            e?.lastData != undefined
              ? e?.lastData.positiveFlow
              : "Ma'lumot kelmagan",
          totalsFlow:
            e?.lastData != undefined
              ? e?.lastData.totalsFlow
              : "Ma'lumot kelmagan",
          velocity:
            e?.lastData != undefined
              ? e?.lastData.velocity
              : "Ma'lumot kelmagan",
          isWrite:
            e?.lastData != undefined
              ? e?.lastData.isWrite == true
                ? "true"
                : "false"
              : "Ma'lumot kelmagan",
          date:
            e?.lastData != undefined ? e?.lastData.date : "Ma'lumot kelmagan",
        });
      });

      const workBook = XLSX.utils.book_new();
      const workSheet = XLSX.utils.json_to_sheet(resultStationNotWorking);

      XLSX.utils.book_append_sheet(workBook, workSheet, "MySheet1");

      XLSX.writeFile(
        workBook,
        `${
          allBalansOrg.find((e) => {
            if (e.id == allStation[0]?.balance_organization_id) {
              return e;
            }
          })?.name
        } ning umuman ishlamagan stansiya ma'lumotlari.xlsx`
      );
    } else if (data == "other") {
      let resultStationOneMonth = [];

      stationOtherWorking.forEach((e) => {
        resultStationOneMonth.push({
          _id: e._id,
          name: e.name,
          topic: e.topic,
          region: allRegion.find((r) => {
            if (r.id == e.region_id) {
              return r;
            }
          })?.name,
          district: allDistrict.find((d) => {
            if (d.id == e.district_id) {
              return d;
            }
          })?.name,
          location: e.location,
          devicePhoneNumber: e.devicePhoneNum,
          status: e.status,
          isIntegration: e.isIntegration == true ? "true" : "false",
          flowRate:
            e?.lastData != undefined
              ? e?.lastData.flowRate
              : "Ma'lumot kelmagan",
          positiveFlow:
            e?.lastData != undefined
              ? e?.lastData.positiveFlow
              : "Ma'lumot kelmagan",
          totalsFlow:
            e?.lastData != undefined
              ? e?.lastData.totalsFlow
              : "Ma'lumot kelmagan",
          velocity:
            e?.lastData != undefined
              ? e?.lastData.velocity
              : "Ma'lumot kelmagan",
          isWrite:
            e?.lastData != undefined
              ? e?.lastData.isWrite == true
                ? "true"
                : "false"
              : "Ma'lumot kelmagan",
          date:
            e?.lastData != undefined ? e?.lastData.date : "Ma'lumot kelmagan",
        });
      });

      const workBook = XLSX.utils.book_new();
      const workSheet = XLSX.utils.json_to_sheet(resultStationOneMonth);

      XLSX.utils.book_append_sheet(workBook, workSheet, "MySheet1");

      XLSX.writeFile(
        workBook,
        `${
          allBalansOrg.find((e) => {
            if (e.id == allStation[0]?.balance_organization_id) {
              return e;
            }
          })?.name
        } ning uzoq vaqt ishlamagan stansiya ma'lumotlari.xlsx`
      );
    }
  };

  return (
    <HelmetProvider>
      <div>
        <div className="card user-dashboard-card">
          <div className="card-body pt-3">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
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
                  <div className="table-scrol">
                    <table className="c-table mt-4">
                      <thead className="c-table__header c-table__header-today">
                        <tr>
                          <th className="c-table__col-label text-center">
                            Nomi
                          </th>
                          <th className="c-table__col-label text-center">
                            Topic
                          </th>
                          <th className="c-table__col-label text-center">
                            Viloyat
                          </th>
                          <th className="c-table__col-label text-center">
                            Tuman
                          </th>
                          <th className="c-table__col-label text-center">
                            Lokatsiya
                          </th>
                          <th className="c-table__col-label text-center">
                            Qurilma telefon raqami
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
                          <th className="c-table__col-label text-center">
                            Sana
                          </th>
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
                                {
                                  allRegion.find((r) => {
                                    if (r.id == e.region_id) {
                                      return r;
                                    }
                                  })?.name
                                }
                              </td>
                              <td className="c-table__cell text-center">
                                {
                                  allDistrict.find((d) => {
                                    if (d.id == e.district_id) {
                                      return d;
                                    }
                                  })?.name
                                }
                              </td>
                              <td className="c-table__cell text-center">
                                {e.location}
                              </td>
                              <td className="c-table__cell text-center">
                                {e.devicePhoneNum}
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
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="alert alert-primary fw-semibold mt-3 text-center fs-5">
                    Hozircha ma'lumot kelmadi...
                  </div>
                )}
              </div>
            ) : location.pathname.split("/")[2] == "three" ? (
              <div>
                {stationThreeDayWorking?.length > 0 ? (
                  <div className="table-scrol">
                    <table className="c-table mt-4">
                      <thead className="c-table__header c-table__header-three">
                        <tr>
                          <th className="c-table__col-label text-center">
                            Nomi
                          </th>
                          <th className="c-table__col-label text-center">
                            Topic
                          </th>
                          <th className="c-table__col-label text-center">
                            Viloyat
                          </th>
                          <th className="c-table__col-label text-center">
                            Tuman
                          </th>
                          <th className="c-table__col-label text-center">
                            Lokatsiya
                          </th>
                          <th className="c-table__col-label text-center">
                            Qurilma telefon raqami
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
                          <th className="c-table__col-label text-center">
                            Sana
                          </th>
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
                                {
                                  allRegion.find((r) => {
                                    if (r.id == e.region_id) {
                                      return r;
                                    }
                                  })?.name
                                }
                              </td>
                              <td className="c-table__cell text-center">
                                {
                                  allDistrict.find((d) => {
                                    if (d.id == e.district_id) {
                                      return d;
                                    }
                                  })?.name
                                }
                              </td>
                              <td className="c-table__cell text-center">
                                {e.location}
                              </td>
                              <td className="c-table__cell text-center">
                                {e.devicePhoneNum}
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
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="alert alert-primary fw-semibold mt-3 text-center fs-5">
                    Hozircha ma'lumot kelmadi...
                  </div>
                )}
              </div>
            ) : location.pathname.split("/")[2] == "notworking" ? (
              <div>
                {stationNotWorking?.length > 0 ? (
                  <div className="table-scrol">
                    <table className="c-table mt-4">
                      <thead className="c-table__header c-table__header-notworking">
                        <tr>
                          <th className="c-table__col-label text-center">
                            Nomi
                          </th>
                          <th className="c-table__col-label text-center">
                            Topic
                          </th>
                          <th className="c-table__col-label text-center">
                            Viloyat
                          </th>
                          <th className="c-table__col-label text-center">
                            Tuman
                          </th>
                          <th className="c-table__col-label text-center">
                            Lokatsiya
                          </th>
                          <th className="c-table__col-label text-center">
                            Qurilma telefon raqami
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
                          <th className="c-table__col-label text-center">
                            Sana
                          </th>
                        </tr>
                      </thead>
                      <tbody className="c-table__body">
                        {stationNotWorking.map((e, i) => {
                          return (
                            <tr className="fs-6 column-admin-station" key={i}>
                              <td className="c-table__cell text-center">
                                {e.name}
                              </td>
                              <td className="c-table__cell text-center">
                                {e.topic}
                              </td>
                              <td className="c-table__cell text-center">
                                {
                                  allRegion.find((r) => {
                                    if (r.id == e.region_id) {
                                      return r;
                                    }
                                  })?.name
                                }
                              </td>
                              <td className="c-table__cell text-center">
                                {
                                  allDistrict.find((d) => {
                                    if (d.id == e.district_id) {
                                      return d;
                                    }
                                  })?.name
                                }
                              </td>
                              <td className="c-table__cell text-center">
                                {e.location}
                              </td>
                              <td className="c-table__cell text-center">
                                {e.devicePhoneNum}
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
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="alert alert-primary fw-semibold mt-3 text-center fs-5">
                    Hozircha ma'lumot kelmadi...
                  </div>
                )}
              </div>
            ) : location.pathname.split("/")[2] == "other" ? (
              <div>
                {stationOtherWorking?.length > 0 ? (
                  <div className="table-scrol">
                    <table className="c-table mt-4">
                      <thead className="c-table__header c-table__header-others">
                        <tr>
                          <th className="c-table__col-label text-center">
                            Nomi
                          </th>
                          <th className="c-table__col-label text-center">
                            Topic
                          </th>
                          <th className="c-table__col-label text-center">
                            Viloyat
                          </th>
                          <th className="c-table__col-label text-center">
                            Tuman
                          </th>
                          <th className="c-table__col-label text-center">
                            Lokatsiya
                          </th>
                          <th className="c-table__col-label text-center">
                            Qurilma telefon raqami
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
                          <th className="c-table__col-label text-center">
                            Sana
                          </th>
                        </tr>
                      </thead>
                      <tbody className="c-table__body">
                        {stationOtherWorking.map((e, i) => {
                          return (
                            <tr className="fs-6 column-admin-station" key={i}>
                              <td className="c-table__cell text-center">
                                {e.name}
                              </td>
                              <td className="c-table__cell text-center">
                                {e.topic}
                              </td>
                              <td className="c-table__cell text-center">
                                {
                                  allRegion.find((r) => {
                                    if (r.id == e.region_id) {
                                      return r;
                                    }
                                  })?.name
                                }
                              </td>
                              <td className="c-table__cell text-center">
                                {
                                  allDistrict.find((d) => {
                                    if (d.id == e.district_id) {
                                      return d;
                                    }
                                  })?.name
                                }
                              </td>
                              <td className="c-table__cell text-center">
                                {e.location}
                              </td>
                              <td className="c-table__cell text-center">
                                {e.devicePhoneNum}
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
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="alert alert-primary fw-semibold mt-3 text-center fs-5">
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
