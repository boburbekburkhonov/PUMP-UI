import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "./UserMap.css";

export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey:
      "AIzaSyC57hT2pRJZ4Gh85ai0sUjP72i7VYJxTHc&region=UZ&language=uz",
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <UserMap />;
}

function UserMap() {
  const center = useMemo(
    () => ({ lat: 42.00000000048624, lng: 63.999999999999986 }),
    []
  );

  return (
    <HelmetProvider>
      <div>
        <div className="card">
          <GoogleMap
            zoom={6.4}
            center={center}
            mapContainerClassName="map-container"
          ></GoogleMap>
        </div>
      </div>
      <Helmet>
        <script src="../src/assets/js/table.js"></script>
      </Helmet>
    </HelmetProvider>
  );
};
