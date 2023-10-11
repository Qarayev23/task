import { useEffect, useState, useRef } from "react";
import { fromLonLat } from "ol/proj";
import { FullScreen, ZoomSlider, defaults as defaultControls } from "ol/control";
import { OSM } from "ol/source";
import { Group as LayerGroup, Tile as TileLayer } from "ol/layer";
import OlMap from "ol/Map";
import OlView from "ol/View";
import "ol/ol.css";
import { Tag } from "antd";
import { MapProps } from "../../types";

const MapComponent = ({ returnRef = null, inputError }: MapProps) => {
  const [map, setMap] = useState<OlMap | null>(null);
  const mapElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!map) {
      const mapTemp = new OlMap({
        target: mapElement.current as HTMLElement,
        controls: defaultControls().extend([new FullScreen(), new ZoomSlider()]),
        view: new OlView({
          center: fromLonLat([49.8671, 40.4093]),
          zoom: 10,
          minZoom: 2,
          maxZoom: 18,
        }),
        layers: [
          new LayerGroup({
            visible: true,
            layers: [
              new TileLayer({
                visible: true,
                source: new OSM(),
              }),
            ],
          }),
        ],
      });

      setTimeout(() => {
        mapTemp.updateSize();
      }, 0);

      setMap(mapTemp);
      if (typeof returnRef === "function") returnRef(mapTemp);
    }
  }, [map, returnRef]);

  return (
    <>
      <div ref={mapElement} className="map"></div>
      {inputError && <Tag color="error" className='w-full text-base text-center mt-1'>{inputError}</Tag>}
    </>
  );
};

export default MapComponent;
