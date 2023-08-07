import React, { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AdminUser.css";
import { api } from "../API/Api.global";
import close from "../../assets/images/close.png";
import attach from "../../assets/images/attach.png";

const AdminUser = () => {
  const [role, setRole] = useState([]);
  const [users, setUsers] = useState([]);
  const [allStations, setAllStations] = useState([]);
  let [stationIndexForAttach, setStationIndexForAttach] = useState([]);
  const [count, setCount] = useState(0);
  const [userOneWithId, setUserOneWithId] = useState({});
  const [roleOneWithId, setRoleOneWithId] = useState({});
  const [changeUserId, setChangeUserId] = useState();
  const [changeRoleId, setChangeRoleId] = useState();
  const [changeRoleName, setChangeRoleName] = useState();

  useEffect(() => {
    fetch(`${api}/roles/find-all`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    })
      .then((res) => res.json())
      .then((data) => setRole(data.data));
  }, [count]);

  useEffect(() => {
    fetch(`${api}/users/get-all`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode == 200) {
          setUsers(data.data);
        }
      });

    fetch(`${api}/stations/find-all`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode == 200) {
          setAllStations(data.data);
        }
      });
  }, [count]);

  // !USER CREATE
  const createUser = (e) => {
    e.preventDefault();

    const { name, lastName, phoneNumber, username, password, role } = e.target;

    fetch(`${api}/users/create`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        firstName: name.value,
        lastName: lastName.value,
        username: username.value,
        password: password.value,
        phoneNumber: phoneNumber.value,
        role: role.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode == 200) {
          setCount(count + 1);
          toast.success("User muvaffaqqiyatli yaratildi!");
        }
      });

    name.value = "";
    lastName.value = "";
    phoneNumber.value = "";
    username.value = "";
    password.value = "";
    role.value = "";
  };

  // !USER UPDATE
  const updateUser = (e) => {
    e.preventDefault();

    const { nameDevice, lastname, username, phoneNumberUpdate, roleUpdate } =
      e.target;

    fetch(`${api}/users/update`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        id: changeUserId,
        firstName: nameDevice.value,
        lastName: lastname.value,
        username: username.value,
        phoneNumber: phoneNumberUpdate.value,
        roleId: roleUpdate.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode == 200) {
          setCount(count + 1);
          toast.success("User muvaffaqqiyatli yaratildi!");
        }
      });
  };

  // !USER DELETE
  const deleteUser = () => {
    fetch(`${api}/users/delete`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        id: changeUserId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode == 200) {
          setCount(count + 1);
          toast.error("User muvaffaqqiyatli o'chirildi!");
        }
      });
  };

  //! USER WITH ID
  const getUserWithId = (userId) => {
    const foundUser = users.find((e) => e._id == userId);
    setUserOneWithId(foundUser);
  };

  // !ROLE CREATE
  const createRole = (e) => {
    e.preventDefault();

    const { roleCreate } = e.target;

    fetch(`${api}/roles/create`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        name: roleCreate.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode == 200) {
          setCount(count + 1);
          toast.success("Role muvaffaqqiyatli yaratildi");
        }
      });

    roleCreate.value = "";
  };

  // !ROLE UPDATE
  const updateRole = (e) => {
    e.preventDefault();

    const { roleName } = e.target;

    fetch(`${api}/roles/update`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        id: changeRoleId,
        name: roleName.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode == 200) {
          setCount(count + 1);
          toast.success("Role muvaffaqqiyatli o'zgartirildi!");
        }
      });
  };

  // !USER DELETE
  const deleteRole = () => {
    fetch(`${api}/roles/delete`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        id: changeRoleId,
        name: changeRoleName,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode == 200) {
          setCount(count + 1);
          toast.error("Role muvaffaqqiyatli o'chirildi!");
        }
      });
  };

  //! ROLE WITH ID
  const getRoleWithId = (roleId) => {
    const foundRole = role.find((e) => e._id == roleId);
    setRoleOneWithId(foundRole);
  };

  const attachStation = (e) => {
    e.preventDefault();

    const { attachStationValue } = e.target;
    let stationIdList = [];
    stationIndexForAttach.forEach((e) => {
      stationIdList.push(attachStationValue[e].value);
    });
    console.log(changeUserId, stationIdList);

    fetch(`${api}/user-join-stations/create`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        userId: changeUserId,
        stationsIdList: stationIdList,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode == 200) {
          window.location.reload();
        }
      });
  };
  return (
    <HelmetProvider>
      <div>
        {/* Modal USER EDIT */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          data-bs-backdrop="static"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1
                  className="modal-title text-primary fs-5"
                  id="exampleModalLabel"
                >
                  Userni o'zgartirish
                </h1>
                <button
                  type="button"
                  className="btn-close btn-close-location"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={updateUser}>
                  <div className="row mb-3">
                    <label
                      htmlFor="name"
                      className="col-md-4 col-lg-3 col-form-label modal-label"
                    >
                      Ism
                    </label>
                    <div className="col-md-8 col-lg-9">
                      <input
                        name="nameDevice"
                        type="text"
                        className="form-control"
                        id="nameUpdate"
                        defaultValue={userOneWithId.firstName}
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="lastname"
                      className="col-md-4 col-lg-3 col-form-label modal-label"
                    >
                      Familiya
                    </label>
                    <div className="col-md-8 col-lg-9">
                      <input
                        name="lastname"
                        type="text"
                        className="form-control"
                        id="lastname"
                        defaultValue={userOneWithId.lastName}
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="username"
                      className="col-md-4 col-lg-3 col-form-label modal-label"
                    >
                      Username
                    </label>
                    <div className="col-md-8 col-lg-9">
                      <input
                        name="usernameUpdate"
                        type="text"
                        className="form-control"
                        id="username"
                        defaultValue={userOneWithId.username}
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="district"
                      className="col-md-4 col-lg-3 col-form-label modal-label"
                    >
                      Telefon raqam
                    </label>
                    <div className="col-md-8 col-lg-9">
                      <input
                        name="phoneNumberUpdate"
                        type="text"
                        className="form-control"
                        id="district"
                        defaultValue={userOneWithId.phoneNumber}
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="imei"
                      className="col-md-4 col-lg-3 col-form-label modal-label"
                    >
                      Role
                    </label>
                    <div className="col-md-8 col-lg-9">
                      <select
                        className="form-select select-user-create"
                        required
                        id="role"
                        name="roleUpdate"
                      >
                        {role?.map((e, i) => {
                          return (
                            <option key={i} value={e._id}>
                              {e.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>

                  <div className="text-end">
                    <button className="btn btn-primary devices-btn">
                      Saqlash
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* MODAL USER PERMISSION   */}
        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header modal-header-permission border-bottom-0 bg-danger pt-4 pb-4 d-flex align-items-center">
                <div className="d-flex align-items-center justify-content-center w-100">
                  <p className="m-0 text-light fs-6 fw-bolder">
                    Haqiqatan ham o'chirmoqchimisiz?
                  </p>
                </div>
                <button
                  type="button"
                  className="btn-close-location btn-close-delete-devices p-0"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <img src={close} alt="cancel" width="18" height="18" />
                </button>
              </div>
              <div className="modal-body fw-semibold fs-5 text-dark text-center modal-delete-device">
                O'ylab ko'ring! <span className="text-success"> user </span> ni
                oʻchirish doimiy boʻladi.
              </div>
              <div className="modal-footer border-top-0">
                <button
                  type="button"
                  className="btn btn-light"
                  data-bs-dismiss="modal"
                  onClick={deleteUser}
                >
                  Ha
                </button>
                <button
                  type="button"
                  className="btn btn-light"
                  data-bs-dismiss="modal"
                >
                  Yo'q
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal ROLE EDIT */}
        <div
          className="modal fade"
          id="exampleModalLabelRole"
          tabIndex="-1"
          data-bs-backdrop="static"
          aria-labelledby="exampleModalLabelRole"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1
                  className="modal-title text-primary fs-5"
                  id="exampleModalLabel"
                >
                  Roleni o'zgartirish
                </h1>
                <button
                  type="button"
                  className="btn-close btn-close-location"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={updateRole}>
                  <div className="row mb-3">
                    <label
                      htmlFor="roleName"
                      className="col-md-4 col-lg-3 col-form-label modal-label"
                    >
                      Nomi
                    </label>
                    <div className="col-md-8 col-lg-9">
                      <input
                        name="roleName"
                        type="text"
                        className="form-control"
                        id="roleName"
                        defaultValue={roleOneWithId.name}
                      />
                    </div>
                  </div>

                  <div className="text-end">
                    <button className="btn btn-primary devices-btn">
                      Saqlash
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* MODAL ROLE PERMISSION   */}
        <div
          className="modal fade"
          id="staticBackdropRole"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header modal-header-permission border-bottom-0 bg-danger pt-4 pb-4 d-flex align-items-center">
                <div className="d-flex align-items-center justify-content-center w-100">
                  <p className="m-0 text-light fs-6 fw-bolder">
                    Haqiqatan ham o'chirmoqchimisiz?
                  </p>
                </div>
                <button
                  type="button"
                  className="btn-close-location btn-close-delete-devices p-0"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <img src={close} alt="cancel" width="18" height="18" />
                </button>
              </div>
              <div className="modal-body fw-semibold fs-5 text-dark text-center modal-delete-device">
                O'ylab ko'ring! <span className="text-success"> role </span> ni
                oʻchirish doimiy boʻladi.
              </div>
              <div className="modal-footer border-top-0">
                <button
                  type="button"
                  className="btn btn-light"
                  data-bs-dismiss="modal"
                  onClick={deleteRole}
                >
                  Ha
                </button>
                <button
                  type="button"
                  className="btn btn-light"
                  data-bs-dismiss="modal"
                >
                  Yo'q
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal USER ATTACH STATION */}
        <div
          className="modal fade"
          id="exampleModalAttach"
          tabIndex="-1"
          data-bs-backdrop="static"
          aria-labelledby="exampleModalAttach"
          aria-hidden="true"
        >
          <div className="modal-dialog table-attach-width modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1
                  className="modal-title text-primary fs-5"
                  id="exampleModalLabel"
                >
                  Userga stansiya biriktirish
                </h1>
                <button
                  type="button"
                  className="btn-close btn-close-location"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body ">
                <div className="d-flex justify-content-between">
                  <div>
                    <h4>Stansiyalar</h4>
                    <form onSubmit={attachStation}>
                      {allStations?.map((e, i) => {
                        return (
                          <div
                            key={i}
                            className="df-flex align-items-center mb-3"
                          >
                            <input
                              className="attach-input"
                              type="checkbox"
                              id={e._id}
                              name="attachStationValue"
                              value={e._id}
                              onChange={() => {
                                if (!stationIndexForAttach.includes(i)) {
                                  stationIndexForAttach.push(i);
                                } else if (stationIndexForAttach.includes(i)) {
                                  stationIndexForAttach =
                                    stationIndexForAttach?.filter(
                                      (e) => e != i
                                    );
                                }
                                setStationIndexForAttach(stationIndexForAttach);
                              }}
                            />
                            <label className="attach-label" htmlFor={e._id}>
                              {e.name}
                            </label>
                          </div>
                        );
                      })}

                      <button className="btn btn-success">Biriktirish</button>
                    </form>
                  </div>

                  <span className="user-station-frame"></span>

                  <div>
                    <h4>Foydalanuvchiga tegishli stansiyalar</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ToastContainer */}
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="card">
          <div className="card-body pt-3">
            <ul className="nav nav-tabs nav-tabs-bordered">
              <li className="nav-item">
                <button
                  className="nav-link active"
                  data-bs-toggle="tab"
                  data-bs-target="#profile-users"
                >
                  Userlar ro'yhati
                </button>
              </li>

              <li className="nav-item">
                <button
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#profile-overview"
                >
                  User yaratish
                </button>
              </li>

              <li className="nav-item">
                <button
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#profile-edit"
                >
                  Role yaratish
                </button>
              </li>

              <li className="nav-item">
                <button
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#station-add"
                >
                  Stansiya biriktirish
                </button>
              </li>
            </ul>
            <div className="tab-content pt-2">
              <div
                className="tab-pane fade show active profile-users"
                id="profile-users"
              >
                <table className="c-table mt-4">
                  <thead className="c-table__header">
                    <tr>
                      <th className="c-table__col-label text-center">Ism</th>
                      <th className="c-table__col-label text-center">
                        Familiya
                      </th>
                      <th className="c-table__col-label text-center">
                        Username
                      </th>
                      <th className="c-table__col-label text-center">
                        Telefon raqam
                      </th>
                      <th className="c-table__col-label text-center">Role</th>
                      <th className="c-table__col-label text-center">
                        O'zgartirish
                      </th>
                      <th className="c-table__col-label text-center">
                        O'chirish
                      </th>
                    </tr>
                  </thead>
                  <tbody className="c-table__body">
                    {users?.map((e, i) => {
                      return (
                        <tr className="fs-6" key={i}>
                          <td className="c-table__cell text-center">
                            {e.firstName}
                          </td>
                          <td className="c-table__cell text-center">
                            {e.lastName}
                          </td>
                          <td className="c-table__cell text-center">
                            {e.username}
                          </td>
                          <td className="c-table__cell text-center">
                            {e.phoneNumber}
                          </td>
                          <td className="c-table__cell text-center">
                            {e.role}
                          </td>
                          <td className="c-table__cell text-center">
                            <button
                              className="btn-devices-edit"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                              onClick={() => {
                                setChangeUserId(e._id);
                                getUserWithId(e._id);
                              }}
                            >
                              <img
                                src="https://cdn-icons-png.flaticon.com/128/9458/9458280.png"
                                alt="update"
                                width="16"
                                height="16"
                              />
                            </button>
                          </td>
                          <td className="c-table__cell text-center">
                            <button
                              className="btn-devices-edit"
                              data-bs-toggle="modal"
                              data-bs-target="#staticBackdrop"
                              onClick={() => setChangeUserId(e._id)}
                            >
                              <img
                                src="https://cdn-icons-png.flaticon.com/128/9713/9713380.png"
                                alt="update"
                                width="16"
                                height="16"
                              />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div
                className="tab-pane fade profile-overview"
                id="profile-overview"
              >
                <form
                  className="pt-4 ps-4 form-user-create-wrapper d-flex flex-wrap align-items-center"
                  onSubmit={createUser}
                >
                  <div className="row mb-3 d-flex flex-column input-label-wrapper">
                    <label
                      htmlFor="name"
                      className="col-md-4 col-lg-3 col-form-label profile-heading fw-bold w-100"
                    >
                      Ism
                    </label>
                    <div className="col-md-8 input-wrapper col-lg-9">
                      <input
                        name="name"
                        type="text"
                        className="form-control input-user"
                        id="name"
                        required
                      />
                    </div>
                  </div>

                  <div className="row mb-3 d-flex flex-column input-label-wrapper">
                    <label
                      htmlFor="lastname"
                      className="col-md-4 col-lg-3 col-form-label profile-heading fw-bold w-100"
                    >
                      Familiya
                    </label>
                    <div className="col-md-8 input-wrapper col-lg-9">
                      <input
                        name="lastName"
                        type="text"
                        className="form-control input-user"
                        id="lastname"
                        required
                      />
                    </div>
                  </div>

                  <div className="row mb-3 d-flex flex-column input-label-wrapper">
                    <label
                      htmlFor="username"
                      className="col-md-4 col-lg-3 col-form-label profile-heading fw-bold w-100"
                    >
                      Username
                    </label>
                    <div className="col-md-8 input-wrapper col-lg-9">
                      <input
                        name="username"
                        type="text"
                        className="form-control input-user"
                        id="username"
                        required
                      />
                    </div>
                  </div>

                  <div className="row mb-3 d-flex flex-column input-label-wrapper">
                    <label
                      htmlFor="password"
                      className="col-md-4 col-lg-3 col-form-label profile-heading fw-bold w-100"
                    >
                      Parol
                    </label>
                    <div className="col-md-8 input-wrapper col-lg-9">
                      <input
                        name="password"
                        type="text"
                        className="form-control input-user"
                        id="password"
                        required
                      />
                    </div>
                  </div>

                  <div className="row mb-3 d-flex flex-column input-label-wrapper">
                    <label
                      htmlFor="phoneNumber"
                      className="col-md-4 col-lg-3 col-form-label profile-heading fw-bold w-100"
                    >
                      Telefon raqam
                    </label>
                    <div className="col-md-8 input-wrapper col-lg-9">
                      <input
                        name="phoneNumber"
                        type="text"
                        className="form-control input-user"
                        id="phoneNumber"
                        required
                      />
                    </div>
                  </div>

                  <div className="row mb-3 d-flex flex-column input-label-wrapper">
                    <label
                      htmlFor="role"
                      className="col-md-4 col-lg-3 col-form-label profile-heading fw-bold w-100"
                    >
                      Role
                    </label>
                    <div className="col-md-8 input-wrapper col-lg-9">
                      <select
                        className="form-select select-user-create"
                        required
                        id="role"
                        name="role"
                      >
                        {role?.map((e, i) => {
                          return (
                            <option key={i} value={e._id}>
                              {e.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="w-50">
                    <button className="btn btn-primary btn-create-user w-25">
                      Saqlash
                    </button>
                  </div>
                </form>
              </div>

              <div
                className="tab-pane fade profile-edit pt-3"
                id="profile-edit"
              >
                <div className="d-flex align-items-start justify-content-between flex-wrap role-create-list-wrapper">
                  <form
                    className=" form-role-create-wrapper d-flex align-items-end"
                    onSubmit={createRole}
                  >
                    <div className="row d-flex flex-column input-label-wrapper">
                      <label
                        htmlFor="rol"
                        className="col-md-4 col-lg-3 col-form-label profile-heading fw-bold w-100"
                      >
                        Role yaratish
                      </label>
                      <div className="col-md-8 input-role-wrapper col-lg-9">
                        <input
                          name="roleCreate"
                          type="text"
                          className="form-control input-user"
                          id="rol"
                          required
                        />
                      </div>
                    </div>
                    <div className="w-50">
                      <button className="btn btn-primary btn-create-role">
                        Saqlash
                      </button>
                    </div>
                  </form>

                  <table className="c-table mt-4 table-role-width">
                    <thead className="c-table__header">
                      <tr>
                        <th className="c-table__col-label text-center">Nomi</th>
                        <th className="c-table__col-label text-center">
                          O'zgartirish
                        </th>
                        <th className="c-table__col-label text-center">
                          O'chirish
                        </th>
                      </tr>
                    </thead>
                    <tbody className="c-table__body">
                      {role?.map((e, i) => {
                        return (
                          <tr className="fs-6" key={i}>
                            <td className="c-table__cell text-center">
                              {e.name}
                            </td>
                            <td className="c-table__cell text-center">
                              <button
                                className="btn-devices-edit"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModalLabelRole"
                                onClick={() => {
                                  setChangeRoleId(e._id);
                                  getRoleWithId(e._id);
                                }}
                              >
                                <img
                                  src="https://cdn-icons-png.flaticon.com/128/9458/9458280.png"
                                  alt="update"
                                  width="16"
                                  height="16"
                                />
                              </button>
                            </td>
                            <td className="c-table__cell text-center">
                              <button
                                className="btn-devices-edit"
                                data-bs-toggle="modal"
                                data-bs-target="#staticBackdropRole"
                                onClick={() => {
                                  setChangeRoleName(e.name);
                                  setChangeRoleId(e._id);
                                }}
                              >
                                <img
                                  src="https://cdn-icons-png.flaticon.com/128/9713/9713380.png"
                                  alt="update"
                                  width="16"
                                  height="16"
                                />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="tab-pane fade station-add pt-3" id="station-add">
                <div className="d-flex align-items-start justify-content-between flex-wrap role-create-list-wrapper">
                  <table className="c-table mt-4">
                    <thead className="c-table__header">
                      <tr>
                        <th className="c-table__col-label text-center">Ism</th>
                        <th className="c-table__col-label text-center">
                          Familiya
                        </th>
                        <th className="c-table__col-label text-center">
                          Username
                        </th>
                        <th className="c-table__col-label text-center">
                          Telefon raqam
                        </th>
                        <th className="c-table__col-label text-center">Role</th>
                        <th className="c-table__col-label text-center">
                          Biriktirish
                        </th>
                      </tr>
                    </thead>
                    <tbody className="c-table__body">
                      {users?.map((e, i) => {
                        return (
                          <tr className="fs-6" key={i}>
                            <td className="c-table__cell text-center">
                              {e.firstName}
                            </td>
                            <td className="c-table__cell text-center">
                              {e.lastName}
                            </td>
                            <td className="c-table__cell text-center">
                              {e.username}
                            </td>
                            <td className="c-table__cell text-center">
                              {e.phoneNumber}
                            </td>
                            <td className="c-table__cell text-center">
                              {e.role}
                            </td>
                            <td className="c-table__cell text-center">
                              <button
                                className="btn-devices-edit"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModalAttach"
                                onClick={() => {
                                  setChangeUserId(e._id);
                                }}
                              >
                                <img
                                  src={attach}
                                  alt="update"
                                  width="20"
                                  height="20"
                                />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
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

export default AdminUser;
