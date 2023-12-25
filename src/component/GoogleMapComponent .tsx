import React, { useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

type GoogleMapComponentProps = {};

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = () => {
  const GOOGLEMAP = import.meta.env.VITE_GOOGLE_MAP;
  const MAPID = import.meta.env.VITE_MAP_ID
  const [open, setOpen] = useState<boolean>(false)
  const defaultCenter = { lat: 13.7563, lng: 100.5018 };
  return (
    <APIProvider apiKey={GOOGLEMAP}>
      <div style={{ height: `100vh`, width: `100%` }}>
        <Map zoom={9} center={defaultCenter} mapId={MAPID}>
          <AdvancedMarker position={defaultCenter} onClick={() => setOpen(true)}>
            <Pin />
          </AdvancedMarker>
          {open && <InfoWindow position={defaultCenter} onCloseClick={() => setOpen(false)}>ตำแหน่งปัจจุบัน</InfoWindow>}
        </Map>
      </div>
    </APIProvider>
  );
};

export default GoogleMapComponent;
