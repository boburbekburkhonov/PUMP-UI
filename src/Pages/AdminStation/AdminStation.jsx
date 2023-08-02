import React, { useEffect, useState } from "react";
import { apiGlobal } from "../API/Api.global";
import "./AdminStation.css";
import circle from "../../assets/images/circle.png";
import "react-toastify/dist/ReactToastify.css";
import close from "../../assets/images/close.png";
import { Helmet, HelmetProvider } from "react-helmet-async";
import excelImage from "../../assets/images/excel.png";
import excelFileImage from "../../assets/images/excel-file.png";

const AdminStation = () => {
  const [allStation, setAllStation] = useState([]);
  const [allRegions, setAllRegions] = useState([]);
  const [allDistrict, setAllDistrict] = useState([]);
  const [allBalansOrg, setAllBalansOrg] = useState([]);
  const [allBalansOrgByRegionId, setallBalansOrgByRegionIdByRegionId] =
    useState([]);
  const [allStationByBalansOrg, setAllStationByBalansOrg] = useState([]);
  const [stationOne, setStationOne] = useState({});
  const [stationRegionName, setStationRegionName] = useState();
  const [stationDistrictName, setStationDistrictName] = useState([]);
  const [stationBalansOrgName, setStationBalansOrgName] = useState([]);
  const [selectedfile, SetSelectedFile] = useState("");

  useEffect(() => {
    fetch(`${apiGlobal}/stations/find-all`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAllStation(data.data);
      });

    fetch(`${apiGlobal}/districts/all`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAllDistrict(data.districts);
      });

    fetch(`${apiGlobal}/balance-organizations/all-find`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    })
      .then((res) => res.json())
      .then((data) => setAllBalansOrg(data.balanceOrganizations));
  }, []);

  useEffect(() => {
    const fetchDataRegion = async () => {
      const requestRegionAll = await fetch(`${apiGlobal}/regions/all`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        },
      });
      const responseRegionAll = await requestRegionAll.json();
      setAllRegions(responseRegionAll.regions);

      const request = await fetch(
        `${apiGlobal}/balance-organizations/getByRegionNumber?regionNumber=${responseRegionAll.regions[0].id}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization:
              "Bearer " + window.localStorage.getItem("accessToken"),
          },
        }
      );

      const response = await request.json();
      setallBalansOrgByRegionIdByRegionId(response.balanceOrganization);

      fetch(
        `${apiGlobal}/stations/find-by-balanceOrganizationId?balanceOrganizationId=${response.balanceOrganization[0].id}`,
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
        .then((data) => {
          setAllStationByBalansOrg(data.data);
        });
    };

    fetchDataRegion();
  }, []);

  const getStationWithId = async (id) => {
    const requestStationOne = await fetch(
      `${apiGlobal}/stations/find-one?id=${id}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        },
      }
    );

    const responseStationOne = await requestStationOne.json();
    setStationOne(responseStationOne?.data);

    // REGION NAME
    const requestRegionName = await fetch(
      `${apiGlobal}/regions/getById?id=${responseStationOne?.data?.region_id}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        },
      }
    );
    const responseRegionName = await requestRegionName.json();
    setStationRegionName(responseRegionName?.region?.name);

    const responseDistrictName = allDistrict?.find(
      (e) => e.id == responseStationOne?.data?.district_id
    );
    setStationDistrictName(responseDistrictName?.name);

    const responseBalansOrgName = allBalansOrg.find(
      (e) => e.id == responseStationOne?.data?.balance_organization_id
    );

    setStationBalansOrgName(responseBalansOrgName?.name);
  };

  const createStation = (e) => {
    e.preventDefault();

    const {
      topic,
      name,
      regionId,
      districtId,
      balansOrgId,
      devicePhone,
      location,
      integration,
    } = e.target;

    fetch(`${apiGlobal}/stations/create`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        name: name.value,
        topic: topic.value,
        region_id: Number(regionId.value),
        district_id: Number(districtId.value),
        balance_organization_id: Number(balansOrgId.value),
        devicePhoneNum: devicePhone.value,
        location: location.value,
        isIntegration: integration.value == "true" ? true : false,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode == 200) {
          window.location.reload();
          toast.success("Stansiya muvaffaqqiyatli yaratildi!");
        }
      });

    topic.value = "";
    name.value = "";
    regionId.value = "";
    districtId.value = "";
    balansOrgId.value = "";
    devicePhone.value = "";
    location.value = "";
    integration.value = "";
  };

  const createStationByExcel = (e) => {
    e.preventDefault();

    const { excelFile } = e.target;

    const formData = new FormData();

    formData.append("file", excelFile.files[0]);

    fetch(`${apiGlobal}/stations/create/upload`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode == 200) {
          window.location.reload();
          SetSelectedFile("");
        } else {
          toast.error(data.message);
        }
      });
  };

  const updateStation = (e) => {
    e.preventDefault();
    console.log(stationOne);
    const {
      name,
      topic,
      regionId,
      districtId,
      balansOrgId,
      devicePhone,
      location,
      integration,
    } = e.target;

    fetch(`${apiGlobal}/stations/update`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        id: stationOne._id,
        name: name.value,
        topic: topic.value,
        region_id: Number(regionId.value),
        district_id: Number(districtId.value),
        balance_organization_id: Number(balansOrgId.value),
        devicePhoneNum: devicePhone.value,
        location: location.value,
        isIntegration: integration.value == "true" ? true : false,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode == 200) {
          window.location.reload();
        }
      });
  };

  const deleteStation = () => {
    fetch(`${apiGlobal}/stations/delete`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        id: stationOne._id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode == 200) {
          window.location.reload();
        }
      });
  };

  const searchNameOrImei = (e) => {
    e.preventDefault();

    const { nameOrImeiInput, nameOrImeiSelect } = e.target;

    if (nameOrImeiSelect.value == "name") {
      fetch(
        `${apiGlobal}/stations/searchByName?name=${nameOrImeiInput.value}`,
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
        .then((data) => {
          setTotalPages(0);
          setAllStation(data.data);
        });
    } else if (nameOrImeiSelect.value == "imei") {
      fetch(`${apiGlobal}/stations/searchImel?imel=${nameOrImeiInput.value}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setTotalPages(0);
          setAllStation(data.data);
        });
    } else if (nameOrImeiSelect.value == "all") {
      fetch(`${apiGlobal}/stations/all?page=1&perPage=10`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setTotalPages(data.metadata.lastPage);
          setAllStation(data.data);
        });
    }
  };

  const searchByRegionAndBalansOrg = async (id) => {
    setallBalansOrgByRegionIdByRegionId([]);

    const request = await fetch(
      `${apiGlobal}/balance-organizations/getByRegionNumber?regionNumber=${id}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        },
      }
    );

    const response = await request.json();
    setallBalansOrgByRegionIdByRegionId(response.balanceOrganization);

    fetch(
      `${apiGlobal}/stations/find-by-balanceOrganizationId?balanceOrganizationId=${response.balanceOrganization[0]?.id}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setAllStationByBalansOrg(data.data);
      });
  };

  const searchStationByBalansOrg = (id) => {
    fetch(
      `${apiGlobal}/stations/find-by-balanceOrganizationId?balanceOrganizationId=${id}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setAllStationByBalansOrg(data.data);
      });
  };

  const filesizes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const InputChange = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      SetSelectedFile({
        filename: e.target.files[0].name,
        filetype: e.target.files[0].type,
        fileimage: reader.result,
        datetime: e.target.files[0].lastModifiedDate.toLocaleString("en-IN"),
        filesize: filesizes(e.target.files[0].size),
      });
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <HelmetProvider>
      <div>
        {/*! Modal LIST ONE  */}
        <div
          className="modal fade"
          id="exampleModal"
          data-bs-backdrop="static"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog table-location-width modal-dialog-centered">
            <div className="modal-content table-location-scrol">
              <div className="modal-header lastdata-close pb-3 pb-0">
                <h3 className="m-0 text-success fs-3">{stationOne?.name}</h3>

                <button
                  type="button"
                  className="btn-close btn-close-location"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body pt-0 pt-2 pb-4">
                <div className="modal-body-item m-auto d-flex align-items-center justify-content-between flex-wrap">
                  <div className="modal-item-wrapper d-flex align-items-center  mt-3">
                    <img src={circle} alt="name" width={20} height={20} />
                    <p className="m-0 ms-4">Nomi:</p>
                    <p className="m-0 ms-2 fw-semibold">{stationOne?.name}</p>
                  </div>

                  <div className="modal-item-wrapper d-flex align-items-center ">
                    <img src={circle} alt="name" width={20} height={20} />
                    <p className="m-0 ms-4">Topic:</p>
                    <p className="m-0 ms-2 fw-semibold">{stationOne?.topic}</p>
                  </div>

                  <div className="modal-item-wrapper d-flex align-items-center ">
                    <img src={circle} alt="name" width={20} height={20} />
                    <p className="m-0 ms-4">Viloyat:</p>
                    <p className="m-0 ms-2 fw-semibold">{stationRegionName}</p>
                  </div>

                  <div className="modal-item-wrapper d-flex align-items-center ">
                    <img src={circle} alt="name" width={20} height={20} />
                    <p className="m-0 ms-4">Tuman:</p>
                    <p className="m-0 ms-2 fw-semibold">
                      {stationDistrictName}
                    </p>
                  </div>

                  <div className="modal-item-wrapper d-flex align-items-center ">
                    <img src={circle} alt="name" width={20} height={20} />
                    <p className="m-0 ms-4">Balans tashkiloti:</p>
                    <p className="m-0 ms-2 fw-semibold">
                      {stationBalansOrgName}
                    </p>
                  </div>

                  <div className="modal-item-wrapper d-flex align-items-center ">
                    <img src={circle} alt="name" width={20} height={20} />
                    <p className="m-0 ms-4">Qurilma telefon raqami:</p>
                    <p className="m-0 ms-2 fw-semibold">
                      {stationOne?.devicePhoneNum}
                    </p>
                  </div>

                  <div className="modal-item-wrapper d-flex align-items-center ">
                    <img src={circle} alt="name" width={20} height={20} />
                    <p className="m-0 ms-4">Lokatsiya:</p>
                    <p className="m-0 ms-2 fw-semibold">
                      {stationOne?.location}
                    </p>
                  </div>

                  <div className="modal-item-wrapper d-flex align-items-center ">
                    <img src={circle} alt="name" width={20} height={20} />
                    <p className="m-0 ms-4">Status:</p>
                    <p className="m-0 ms-2 fw-semibold">{stationOne?.status}</p>
                  </div>

                  <div className="modal-item-wrapper modal-item-wrapper-integration d-flex align-items-center ">
                    <img src={circle} alt="name" width={20} height={20} />
                    <p className="m-0 ms-4">Integratsiya:</p>
                    <p className="m-0 ms-2 fw-semibold">
                      {stationOne?.isIntegration ? "true" : "false"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MODAL UPDATE */}
        <div
          className="modal fade"
          id="exampleModalLong"
          tabIndex="-1"
          data-bs-backdrop="static"
          role="dialog"
          aria-labelledby="exampleModalLongTitle"
          aria-hidden="true"
        >
          <div
            className="modal-dialog table-update-width modal-dialog-centered"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5
                  className="modal-title text-primary"
                  id="exampleModalLongTitle"
                >
                  Stansiyani o'zgartirish
                </h5>
                <button
                  className="btn-close btn-close-location"
                  type="button"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form
                  className="pt-4 ps-4 form-user-create-wrapper d-flex flex-wrap align-items-center justify-content-center"
                  onSubmit={updateStation}
                >
                  <div className="row mb-3 d-flex flex-column input-label-station-wrapper">
                    <label
                      htmlFor="name"
                      className="col-md-4 col-lg-3 col-form-label profile-heading fw-bold w-100"
                    >
                      Nomi
                    </label>
                    <div className="col-md-8 input-wrapper col-lg-9">
                      <input
                        name="name"
                        type="text"
                        className="form-control input-station"
                        id="name"
                        required
                        defaultValue={stationOne?.name}
                      />
                    </div>
                  </div>

                  <div className="row mb-3 d-flex flex-column input-label-station-wrapper">
                    <label
                      htmlFor="topic"
                      className="col-md-4 col-lg-3 col-form-label profile-heading fw-bold w-100"
                    >
                      Topic
                    </label>
                    <div className="col-md-8 input-wrapper col-lg-9">
                      <input
                        name="topic"
                        type="text"
                        className="form-control input-station"
                        id="topic"
                        required
                        defaultValue={stationOne?.topic}
                      />
                    </div>
                  </div>

                  <div className="row mb-3 d-flex flex-column input-label-station-wrapper">
                    <label
                      htmlFor="regionId"
                      className="col-md-4 col-lg-3 col-form-label profile-heading fw-bold w-100"
                    >
                      Viloyat id
                    </label>
                    <div className="col-md-8 input-wrapper col-lg-9">
                      <input
                        name="regionId"
                        type="text"
                        className="form-control input-station"
                        id="regionId"
                        required
                        defaultValue={stationOne?.region_id}
                      />
                    </div>
                  </div>

                  <div className="row mb-3 d-flex flex-column input-label-station-wrapper">
                    <label
                      htmlFor="districtId"
                      className="col-md-4 col-lg-3 col-form-label profile-heading fw-bold w-100"
                    >
                      Tuman id
                    </label>
                    <div className="col-md-8 input-wrapper col-lg-9">
                      <input
                        name="districtId"
                        type="text"
                        className="form-control input-station"
                        id="districtId"
                        required
                        defaultValue={stationOne?.district_id}
                      />
                    </div>
                  </div>

                  <div className="row mb-3 d-flex flex-column input-label-station-wrapper">
                    <label
                      htmlFor="balansOrg"
                      className="col-md-4 col-lg-3 col-form-label profile-heading fw-bold w-100"
                    >
                      Balans tashkiloti id
                    </label>
                    <div className="col-md-8 input-wrapper col-lg-9">
                      <input
                        name="balansOrgId"
                        type="text"
                        className="form-control input-station"
                        id="balansOrg"
                        required
                        defaultValue={stationOne?.balance_organization_id}
                      />
                    </div>
                  </div>

                  <div className="row mb-3 d-flex flex-column input-label-station-wrapper">
                    <label
                      htmlFor="devicePhone"
                      className="col-md-4 col-lg-3 col-form-label profile-heading fw-bold w-100"
                    >
                      Qurilma telefon raqami
                    </label>
                    <div className="col-md-8 input-wrapper col-lg-9">
                      <input
                        name="devicePhone"
                        type="text"
                        className="form-control input-station"
                        id="devicePhone"
                        required
                        defaultValue={stationOne?.devicePhoneNum}
                      />
                    </div>
                  </div>

                  <div className="row mb-3 d-flex flex-column input-label-station-wrapper">
                    <label
                      htmlFor="location"
                      className="col-md-4 col-lg-3 col-form-label profile-heading fw-bold w-100"
                    >
                      Lokatsiya
                    </label>
                    <div className="col-md-8 input-wrapper col-lg-9">
                      <input
                        name="location"
                        type="text"
                        className="form-control input-station"
                        id="location"
                        required
                        defaultValue={stationOne?.location}
                      />
                    </div>
                  </div>

                  <div className="row mb-3 d-flex flex-column input-label-station-wrapper">
                    <label
                      htmlFor="integration"
                      className="col-md-4 col-lg-3 col-form-label profile-heading fw-bold w-100"
                    >
                      Integratsiya
                    </label>
                    <div className="col-md-8 input-wrapper col-lg-9">
                      <input
                        name="integration"
                        type="text"
                        className="form-control input-station"
                        id="integration"
                        required
                        defaultValue={stationOne?.isIntegration}
                      />
                    </div>
                  </div>
                  <div className="w-100 text-center mt-3">
                    <button className="btn btn-primary btn-create-user w-25">
                      Saqlash
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* MODAL PERMISSION   */}
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
                O'ylab ko'ring!
                <span className="text-success"> stansiya </span>
                ni oʻchirish doimiy boʻladi.
              </div>
              <div className="modal-footer border-top-0">
                <button
                  type="button"
                  className="btn btn-light"
                  data-bs-dismiss="modal"
                  onClick={deleteStation}
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

        {/* MODAL UPLOAD   */}
        <div
          className="modal fade"
          id="staticBackdrops"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog table-upload-width modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <div className="d-flex align-items-center">
                  <h1
                    className="modal-title fs-4 fw-semibold text-success"
                    id="staticBackdropLabel"
                  >
                    Excel
                  </h1>
                  <img
                    className="ms-2"
                    src={excelImage}
                    alt="excelImage"
                    width={25}
                    height={25}
                  />
                </div>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="fileupload-view">
                  <div className="row justify-content-center m-0">
                    <div className="upload-column">
                      <div className="card-upload mt-5">
                        <div className="card-body">
                          <div className="kb-data-box">
                            <div className="kb-modal-data-title">
                              <div className="kb-data-title d-flex align-items-center ">
                                <h6>
                                  <span className="text-success fs-5 fw-semibold">
                                    Excel file
                                  </span>{" "}
                                  kiriting
                                </h6>
                                <img
                                  className="ms-2"
                                  src={excelImage}
                                  alt="excelImage"
                                  width={20}
                                  height={20}
                                />
                              </div>
                            </div>
                            <form onSubmit={createStationByExcel}>
                              <div className="kb-file-upload">
                                <div className="file-upload-box">
                                  <input
                                    type="file"
                                    id="fileupload"
                                    className="file-upload-input"
                                    onChange={InputChange}
                                    name="excelFile"
                                    required
                                  />
                                  <span>
                                    <span className="file-link">
                                      File lingizni tanlang
                                    </span>
                                  </span>
                                </div>
                              </div>

                              <div className="kb-attach-box mb-3">
                                {selectedfile !== "" ? (
                                  <div className="file-atc-box">
                                    {selectedfile.filename.match(
                                      /.(jpg|jpeg|png|gif|svg)$/i
                                    ) ? (
                                      <div className="file-image">
                                        {" "}
                                        <img src={excelFileImage} alt="" />
                                      </div>
                                    ) : (
                                      <div className="file-image">
                                        <img src={excelFileImage} alt="" />
                                      </div>
                                    )}
                                    <div className="file-detail">
                                      <h6>{selectedfile.filename}</h6>
                                      <p>
                                        <span>
                                          Size : {selectedfile.filesize}
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>

                              <div className="kb-buttons-box">
                                <button
                                  type="submit"
                                  className="btn btn-success form-submit"
                                >
                                  Yuklash
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body pt-3">
            <ul className="nav nav-tabs nav-tabs-bordered">
              <li className="nav-item">
                <button
                  className="nav-link active"
                  data-bs-toggle="tab"
                  data-bs-target="#profile-users"
                >
                  Stansiyalar ro'yhati
                </button>
              </li>

              <li className="nav-item">
                <button
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#profile-overview"
                >
                  Stansiya yaratish
                </button>
              </li>

              <li className="nav-item">
                <button
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#profile-search"
                >
                  Viloyat bo'yicha qidirish
                </button>
              </li>
            </ul>
            <div className="tab-content pt-4">
              <div
                className="tab-pane fade show active profile-users table-scroll"
                id="profile-users"
              >
                <h3 className="stations-search-heading">Qidirish</h3>
                <form
                  onSubmit={searchNameOrImei}
                  className="search-name-wrapper d-flex align-items-center justify-content-between"
                >
                  <input
                    name="nameOrImeiInput"
                    type="text"
                    className="form-control w-50"
                    placeholder="Qidiruv..."
                    required
                  />

                  <select
                    className="form-select w-25"
                    name="nameOrImeiSelect"
                    required
                  >
                    <option value="name">Nomi</option>
                    <option value="imei">Imei</option>
                    <option value="all">All</option>
                  </select>

                  <button className="btn btn-success">Qidirish</button>
                </form>

                {allStation?.length == 0 ? (
                  <h3 className="alert alert-dark text-center mt-5">
                    Hozircha bunday stansiya yo'q...
                  </h3>
                ) : (
                  <table className="c-table mt-4">
                    <thead className="c-table__header">
                      <tr>
                        <th className="c-table__col-label text-center">Nomi</th>
                        <th className="c-table__col-label text-center">
                          Topic
                        </th>
                        <th className="c-table__col-label text-center">
                          Status
                        </th>
                        <th className="c-table__col-label text-center">
                          Lokatsiya
                        </th>
                        <th className="c-table__col-label text-center">
                          Qurilma telefon raqami
                        </th>
                        <th className="c-table__col-label text-center">
                          O'zgartirish
                        </th>
                        <th className="c-table__col-label text-center">
                          O'chirish
                        </th>
                      </tr>
                    </thead>
                    <tbody className="c-table__body">
                      {allStation?.map((e, i) => {
                        return (
                          <tr
                            className="fs-6 column-admin-station"
                            key={i}
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            onClick={() => {
                              getStationWithId(e._id);
                            }}
                          >
                            <td className="c-table__cell text-center">
                              {e.name}
                            </td>
                            <td className="c-table__cell text-center">
                              {e.topic}
                            </td>
                            <td className="c-table__cell text-center">
                              {e.status}
                            </td>
                            <td className="c-table__cell text-center">
                              {e.location}
                            </td>
                            <td className="c-table__cell text-center">
                              {e.devicePhoneNum}
                            </td>
                            <td className="c-table__cell text-center">
                              <button
                                className="btn-devices-edit"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModalLong"
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
                )}
              </div>

              <div
                className="tab-pane fade profile-overview"
                id="profile-overview"
              >
                <div className="text-end">
                  <button
                    className="btn btn-success"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrops"
                  >
                    Excel bilan qo'shish
                  </button>
                </div>
                <form
                  className="pt-4 ps-4 form-user-create-wrapper d-flex flex-wrap align-items-center"
                  onSubmit={createStation}
                >
                  <div className="row mb-3 d-flex flex-column input-label-station-wrapper">
                    <label
                      htmlFor="name"
                      className="col-md-4 col-lg-3 col-form-label profile-heading fw-bold w-100"
                    >
                      Nomi
                    </label>
                    <div className="col-md-8 input-wrapper col-lg-9">
                      <input
                        name="name"
                        type="text"
                        className="form-control input-station"
                        id="name"
                        required
                      />
                    </div>
                  </div>

                  <div className="row mb-3 d-flex flex-column input-label-station-wrapper">
                    <label
                      htmlFor="topic"
                      className="col-md-4 col-lg-3 col-form-label profile-heading fw-bold w-100"
                    >
                      Topic
                    </label>
                    <div className="col-md-8 input-wrapper col-lg-9">
                      <input
                        name="topic"
                        type="text"
                        className="form-control input-station"
                        id="topic"
                        required
                      />
                    </div>
                  </div>

                  <div className="row mb-3 d-flex flex-column input-label-station-wrapper">
                    <label
                      htmlFor="regionId"
                      className="col-md-4 col-lg-3 col-form-label profile-heading fw-bold w-100"
                    >
                      Viloyat id
                    </label>
                    <div className="col-md-8 input-wrapper col-lg-9">
                      <input
                        name="regionId"
                        type="text"
                        className="form-control input-station"
                        id="regionId"
                        required
                      />
                    </div>
                  </div>

                  <div className="row mb-3 d-flex flex-column input-label-station-wrapper">
                    <label
                      htmlFor="districtId"
                      className="col-md-4 col-lg-3 col-form-label profile-heading fw-bold w-100"
                    >
                      Tuman id
                    </label>
                    <div className="col-md-8 input-wrapper col-lg-9">
                      <input
                        name="districtId"
                        type="text"
                        className="form-control input-station"
                        id="districtId"
                        required
                      />
                    </div>
                  </div>

                  <div className="row mb-3 d-flex flex-column input-label-station-wrapper">
                    <label
                      htmlFor="balansOrg"
                      className="col-md-4 col-lg-3 col-form-label profile-heading fw-bold w-100"
                    >
                      Balans tashkiloti id
                    </label>
                    <div className="col-md-8 input-wrapper col-lg-9">
                      <input
                        name="balansOrgId"
                        type="text"
                        className="form-control input-station"
                        id="balansOrg"
                        required
                      />
                    </div>
                  </div>

                  <div className="row mb-3 d-flex flex-column input-label-station-wrapper">
                    <label
                      htmlFor="devicePhone"
                      className="col-md-4 col-lg-3 col-form-label profile-heading fw-bold w-100"
                    >
                      Qurilma telefon raqami
                    </label>
                    <div className="col-md-8 input-wrapper col-lg-9">
                      <input
                        name="devicePhone"
                        type="text"
                        className="form-control input-station"
                        id="devicePhone"
                        required
                      />
                    </div>
                  </div>

                  <div className="row mb-3 d-flex flex-column input-label-station-wrapper">
                    <label
                      htmlFor="location"
                      className="col-md-4 col-lg-3 col-form-label profile-heading fw-bold w-100"
                    >
                      Lokatsiya
                    </label>
                    <div className="col-md-8 input-wrapper col-lg-9">
                      <input
                        name="location"
                        type="text"
                        className="form-control input-station"
                        id="location"
                        required
                      />
                    </div>
                  </div>

                  <div className="row mb-3 d-flex flex-column input-label-station-wrapper">
                    <label
                      htmlFor="integration"
                      className="col-md-4 col-lg-3 col-form-label profile-heading fw-bold w-100"
                    >
                      Integratsiya
                    </label>
                    <div className="col-md-8 input-wrapper col-lg-9">
                      <input
                        name="integration"
                        type="text"
                        className="form-control input-station"
                        id="integration"
                        required
                      />
                    </div>
                  </div>
                  <div className="w-100 text-center mt-3">
                    <button className="btn btn-primary btn-create-user w-25">
                      Yaratish
                    </button>
                  </div>
                </form>
              </div>

              <div
                className="tab-pane fade profile-search profile-search-station"
                id="profile-search"
              >
                <form className="search-region-wrapper d-flex align-items-end justify-content-between">
                  <div className="search-region">
                    <label
                      htmlFor="region-select"
                      className="search-label-region mb-2"
                    >
                      Viloyat
                    </label>
                    <select
                      className="form-select"
                      name="nameOrImeiSelect"
                      required
                      onChange={(e) =>
                        searchByRegionAndBalansOrg(e.target.value)
                      }
                    >
                      {allRegions?.map((e, i) => {
                        return (
                          <option value={e.id} key={i}>
                            {e.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="search-region">
                    <label
                      htmlFor="region-select"
                      className="search-label-region mb-2"
                    >
                      Balans tashkiloti
                    </label>
                    <select
                      className="form-select"
                      name="nameOrImeiSelect"
                      required
                      onChange={(e) => {
                        searchStationByBalansOrg(e.target.value);
                      }}
                    >
                      {allBalansOrgByRegionId?.length &&
                        allBalansOrgByRegionId?.map((e, i) => {
                          return (
                            <option value={e.id} key={i}>
                              {e.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </form>

                {allStationByBalansOrg?.length == 0 ? (
                  <h3 className="alert alert-dark text-center mt-5">
                    Hozircha bunday stansiya yo'q...
                  </h3>
                ) : (
                  <table className="c-table mt-4">
                    <thead className="c-table__header">
                      <tr>
                        <th className="c-table__col-label text-center">Nomi</th>
                        <th className="c-table__col-label text-center">
                          Topic
                        </th>
                        <th className="c-table__col-label text-center">
                          Status
                        </th>
                        <th className="c-table__col-label text-center">
                          Lokatsiya
                        </th>
                        <th className="c-table__col-label text-center">
                          Qurilma telefon raqami
                        </th>
                        <th className="c-table__col-label text-center">
                          O'zgartirish
                        </th>
                        <th className="c-table__col-label text-center">
                          O'chirish
                        </th>
                      </tr>
                    </thead>
                    <tbody className="c-table__body">
                      {allStationByBalansOrg?.map((e, i) => {
                        return (
                          <tr
                            className="fs-6 column-admin-station"
                            key={i}
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            onClick={() => {
                              getStationWithId(e._id);
                            }}
                          >
                            <td className="c-table__cell text-center">
                              {e.name}
                            </td>
                            <td className="c-table__cell text-center">
                              {e.topic}
                            </td>
                            <td className="c-table__cell text-center">
                              {e.status}
                            </td>
                            <td className="c-table__cell text-center">
                              {e.location}
                            </td>
                            <td className="c-table__cell text-center">
                              {e.devicePhoneNum}
                            </td>
                            <td className="c-table__cell text-center">
                              <button
                                className="btn-devices-edit"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModalLong"
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
                )}
              </div>
            </div>
          </div>
        </div>

        <Helmet>
          <script src="../src/assets/js/table.js"></script>
        </Helmet>
      </div>
    </HelmetProvider>
  );
};

export default AdminStation;
