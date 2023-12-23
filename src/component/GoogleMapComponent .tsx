// GoogleMapComponent.tsx
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
  const [open, setOpen] = useState<boolean>(false)
  const defaultCenter = { lat: 13.7563, lng: 100.5018 }; // ตำแหน่งเริ่มต้นของแผนที่

  return (
    <APIProvider apiKey="AIzaSyA4-V5TKNQXW5PTQ81cTwmei1OshwEa47o">
      <div style={{ height: `100vh`, width: `100%` }}>
        <Map zoom={9} center={defaultCenter} mapId="8269b6e08c07de4d">
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
