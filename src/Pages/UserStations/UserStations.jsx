import React, { useEffect, useState } from "react";
import { api } from "../API/Api.global";
import { Helmet, HelmetProvider } from "react-helmet-async";

const UserStations = () => {
  const [userStation, setUserStation] = useState([]);
  const [allRegion, setAllRegion] = useState([]);
  const [allDistrict, setAllDistrict] = useState([]);
  const [allBalansOrg, setAllBalansOrg] = useState([]);

  useEffect(() => {
    const getUserStation = async () => {
      const request = await fetch(`${api}/last-data/get-all`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        },
      });

      const response = await request.json();
      setUserStation(response.data);
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
    };

    getUserStation();

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

    fetch(`${api}/balance-organizations/all-find`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    })
      .then((res) => res.json())
      .then((data) => setAllBalansOrg(data.balanceOrganizations));
  }, []);

  return (
    <HelmetProvider>
      <div>
        <div className="card">
          <div className="card-body pt-3">
            <h3>Stansiyalar</h3>
            {userStation?.length > 0 ? (
              <div className="table-scrol">
                <table className="c-table mt-4">
                  <thead className="c-table__header">
                    <tr>
                      <th className="c-table__col-label text-center">Nomi</th>
                      <th className="c-table__col-label text-center">Topic</th>
                      <th className="c-table__col-label text-center">
                        Viloyat
                      </th>
                      <th className="c-table__col-label text-center">Tuman</th>
                      <th className="c-table__col-label text-center">
                        Balans tashkiloti
                      </th>
                      <th className="c-table__col-label text-center">
                        Lokatsiya
                      </th>
                      <th className="c-table__col-label text-center">
                        Qurilma telefon raqami
                      </th>
                      <th className="c-table__col-label text-center">Status</th>
                      <th className="c-table__col-label text-center">
                        Integratsiya
                      </th>
                    </tr>
                  </thead>
                  <tbody className="c-table__body">
                    {userStation?.map((e, i) => {
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
                            {
                              allBalansOrg.find((b) => {
                                if (b.id == e.balance_organization_id) {
                                  return b;
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
                            {e.status}
                          </td>
                          <td className="c-table__cell text-center">
                            {e.isIntegration == true ? "true" : "false"}
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
        </div>
      </div>
      <Helmet>
        <script src="../src/assets/js/table.js"></script>
      </Helmet>
    </HelmetProvider>
  );
};

export default UserStations;
