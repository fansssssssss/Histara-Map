import { MapContainer, Marker, TileLayer, Tooltip, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import { Icon } from "leaflet";
import { useEffect } from "react";

function Map({
  geojson,
  center,
  markers,
  current,
}: {
  geojson: any;
  center: [number, number];
  markers: any;
  current: [number, number];
}) {
  const RefreshMapCenter = ({ newCenter }: {newCenter: [number, number]}) => {
    const map = useMap();
    
    useEffect(() => {
      if (newCenter) {
        map.setView(newCenter, map.getZoom());
      }
    }, [newCenter, map]);
  
    return null;
  };
  return (
    <section className="w-full h-screen">
      <MapContainer
        center={center ?? [-7.801363, 110.364787]}
        zoom={17}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <RefreshMapCenter newCenter={center} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={current} />
        {/* {geojson && (
          <GeoJSON
            data={geojson}
            onEachFeature={(feature, layer) => {
              const name = feature.properties.name;
              const index = feature.properties.index;
              layer.bindTooltip(`<span class="font-semibold font-poppins">${name}</span><br/>
            <span>Stop: ${index}</span>`);
            }}
          />
        )} */}
        {markers &&
          markers.map((marker: any) => {
            return (
              <Marker
                position={marker.position}
                icon={
                  new Icon({
                    iconUrl: marker.iconUrl,
                    iconSize: marker.iconSize,
                    iconAnchor: marker.iconAnchor,
                  })
                }
                key={marker.key}
              >
                <Tooltip className="!p-0 !bg-transparent !outline-none !border-0" interactive offset={marker.popupAnchor}>{marker.children}</Tooltip>
              </Marker>
            );
          })}
      </MapContainer>
    </section>
  );
}

export default dynamic(() => Promise.resolve(Map), {
  ssr: false,
});
