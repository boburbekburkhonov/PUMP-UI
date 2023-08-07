import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoWindow,
  InfoWindowF,
} from "@react-google-maps/api";
import "./UserMap.css";
import { api } from "../API/Api.global";
import circleBlue from "../../assets/images/record.png";

export default function Home() {
  const [lastData, setLastData] = useState([]);
  const [activeMarker, setActiveMarker] = useState();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey:
      "AIzaSyC57hT2pRJZ4Gh85ai0sUjP72i7VYJxTHc&region=UZ&language=uz",
  });
  const center = useMemo(
    () => ({ lat: 42.00000000048624, lng: 63.999999999999986 }),
    []
  );

  useEffect(() => {
    fetch(`${api}/last-data/get-all`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        let lastData = [];
        data.data.forEach((e) => {
          if (e.lastData != undefined) {
            lastData.push(e);
          }
        });
        setLastData(lastData);
      });
  }, []);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <div className="card">
        <GoogleMap
          zoom={6.4}
          center={center}
          mapContainerClassName="map-container"
        >
          {lastData.map((e, i) => {
            return (
              <MarkerF
                key={i}
                position={{
                  lat: Number(e.location.split("-")[0]),
                  lng: Number(e.location.split("-")[1]),
                }}
                title={e.name}
                onClick={() => handleActiveMarker(e._id)}
              >
                {activeMarker == e._id ? (
                  <InfoWindowF
                    className="w-100"
                    onCloseClick={() => {
                      setActiveMarker(null);
                    }}
                    options={{ maxWidth: "240" }}
                  >
                    <div>
                      <div className="d-flex align-items-center mb-1">
                        <img
                          src={circleBlue}
                          alt="circleBlue"
                          width={12}
                          height={12}
                        />
                        <p className="infowindow-desc m-0 ms-1 me-1">
                          Musbat oqim:
                        </p>{" "}
                        <span className="infowindow-span">
                          {e.lastData.positiveFlow}
                        </span>
                      </div>

                      <div className="d-flex align-items-center mb-1">
                        <img
                          src={circleBlue}
                          alt="circleBlue"
                          width={12}
                          height={12}
                        />
                        <p className="m-0 infowindow-desc ms-1 me-1 ">
                          Jami oqim:
                        </p>{" "}
                        <span className="infowindow-span">
                          {e.lastData.totalsFlow}
                        </span>
                      </div>

                      <div className="d-flex align-items-center mb-1">
                        <img
                          src={circleBlue}
                          alt="circleBlue"
                          width={12}
                          height={12}
                        />
                        <p className="m-0 infowindow-desc ms-1 me-1 ">
                          Oqim tezligi:
                        </p>{" "}
                        <span className="infowindow-span">
                          {e.lastData.flowRate}
                        </span>
                      </div>

                      <div className="d-flex align-items-center">
                        <img
                          src={circleBlue}
                          alt="circleBlue"
                          width={12}
                          height={12}
                        />
                        <p className="m-0 infowindow-desc ms-1 me-1">Tezlik:</p>{" "}
                        <span className="infowindow-span">
                          {e.lastData.velocity}
                        </span>
                      </div>
                    </div>
                  </InfoWindowF>
                ) : null}
              </MarkerF>
            );
          })}
        </GoogleMap>
      </div>
    </div>
  );
}
