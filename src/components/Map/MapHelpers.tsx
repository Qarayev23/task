import OlFeature from "ol/Feature";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import WKT from "ol/format/WKT";
import { Style, Fill, Stroke, Circle } from "ol/style";
import Map from "ol/Map";
import "ol/ol.css";
import "ol-layerswitcher/src/ol-layerswitcher.css";

export const drawWktFeature = (map: Map, wktFeature: string) => {
  const wktFormat = new WKT();
  const geometry = wktFormat.readGeometry(wktFeature, {
    dataProjection: "EPSG:4326",
    featureProjection: "EPSG:3857",
  });

  if (map) {
    const poly = new OlFeature({
      geometry: geometry,
    });

    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: [poly],
      }),
      style: poly?.getGeometry()?.getType().includes("Point")
        ? new Style({
          image: new Circle({
            radius: 7,
            fill: new Fill({ color: "red" }),
            stroke: new Stroke({
              color: "red",
              width: 2,
            }),
          }),
        })
        : new Style({
          fill: new Fill({
            color: "red",
          }),
          stroke: new Stroke({
            color: "red",
            width: 2,
          }),
        }),
    });

    vectorLayer.set("name", "wktLayer");

    map.addLayer(vectorLayer);
    const features = vectorLayer?.getSource()?.getFeatures();
    const polygonExtent = features && features.length > 0 ? features[0]?.getGeometry()?.getExtent() : null;
    if (polygonExtent) {
      map.getView().fit(polygonExtent, {
        size: map.getSize(),
      });
    }
  }
};

export const validateGeometry = (geometry: string) => {
  const wktFormat = new WKT();
  try {
    const geom = wktFormat.readGeometry(geometry, {
      dataProjection: "EPSG:4326",
      featureProjection: "EPSG:3857",
    });
    const poly = new OlFeature({
      geometry: geom,
    });

    return poly?.getGeometry()?.getType();
  } catch (error) {
    return null;
  }
};
