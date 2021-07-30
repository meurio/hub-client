import React, { useState, useMemo } from "react";
import ReactMapGL, { Marker, Popup, NavigationControl } from "react-map-gl";
import { Icon } from "bonde-components";
import { Individual } from "../../types";

interface User extends Individual {
  distance?: string;
  relationshipStatus?: string;
  ultimosEncaminhamentosRealizados?: number;
}

type Props = {
  volunteers: Array<User>;
  individual: Individual;
};

type Viewport = {
  longitude: number;
  latitude: number;
  zoom: number;
};

const navControlStyle = {
  right: 10,
  top: 10,
};

const Map = ({ volunteers, individual }: Props) => {
  const [viewport, setViewport] = useState<Viewport>({
    longitude: Number(individual.coordinates.longitude),
    latitude: Number(individual.coordinates.latitude),
    zoom: 7,
  });

  const [popupInfo, setPopupInfo] = useState<User | null>(null);
  const markers = useMemo(
    () =>
      volunteers.map((volunteer) => {
        const latitude = Number(volunteer.coordinates.latitude);
        const longitude = Number(volunteer.coordinates.longitude);
        if (Number.isNaN(latitude) || Number.isNaN(longitude)) return null;
        return (
          <Marker key={volunteer.id} longitude={longitude} latitude={latitude}>
            <div onClick={() => setPopupInfo(volunteer)}>
              <Icon name="MapMarker" />
            </div>
          </Marker>
        );
      }),
    [volunteers]
  );

  return (
    <div
      style={{
        overflow: "hidden",
        width: "100%",
        height: "80vh",
      }}
    >
      <ReactMapGL
        {...viewport}
        width="100%"
        height="100%"
        onViewportChange={setViewport}
        mapboxApiAccessToken="pk.eyJ1Ijoidml2aWFuZWRpYXMiLCJhIjoiY2s2bWJud3ZyMG85NzNrcWZvanFwcGsyMiJ9.-Pqx8_Ev_QNmHqoGEzwBcw"
      >
        <NavigationControl style={navControlStyle} />
        <Marker
          key={individual.id}
          longitude={Number(individual.coordinates.longitude)}
          latitude={Number(individual.coordinates.latitude)}
        >
          <div onClick={() => setPopupInfo(individual)}>
            <Icon name="MapMarker" color="red" />
          </div>
        </Marker>
        {markers}
        {popupInfo && (
          <Popup
            tipSize={5}
            anchor="top"
            longitude={Number(popupInfo.coordinates.longitude)}
            latitude={Number(popupInfo.coordinates.latitude)}
            closeOnClick={false}
            onClose={setPopupInfo}
          >
            <p>{popupInfo.firstName}</p>
            <p>{popupInfo.email}</p>
            <p>{popupInfo.distance}</p>
            <p>{popupInfo.address}</p>
            <p>{popupInfo.relationshipStatus}</p>
            <p>{popupInfo.availability}</p>
            <p>{popupInfo.createdAt}</p>
            <p>{popupInfo.ultimosEncaminhamentosRealizados}</p>
            <p>{popupInfo.encaminhamentosRealizados}</p>
            <p>{popupInfo.atendimentosEmAndamento}</p>
            <p>{popupInfo.atendimentosConcluidos}</p>
            <p>{popupInfo.phone}</p>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
};

export default Map;
