import { useEffect } from "react";
import { LatLngBounds, LatLngExpression } from "leaflet";
import {
  MapContainer,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const TILE_SIZE = 256;
const MIN_ZOOM = 3;
const MAX_ZOOM = 8;
const TILE_URL_TEMPLATE = "http://localhost:8080/imgMap/gameLayer/Stable/{z}/{x}/{y}";
const EMPTY_TILE_DATA_URL =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

const MAX_TILE_INDEX_BY_ZOOM = {
  3: 4,
  4: 9,
  5: 19,
  6: 39,
  7: 79,
  8: 159,
} as const satisfies Record<number, number>;

type SupportedZoomLevel = keyof typeof MAX_TILE_INDEX_BY_ZOOM;

const BASE_TILE_COUNT = MAX_TILE_INDEX_BY_ZOOM[MIN_ZOOM as SupportedZoomLevel] + 1;

const maxIndexForZoom = (zoom: SupportedZoomLevel) => MAX_TILE_INDEX_BY_ZOOM[zoom];

const tileCountForZoom = (zoom: number) =>
  BASE_TILE_COUNT * Math.pow(2, zoom - MIN_ZOOM);

const mapBounds = new LatLngBounds([-1, 0], [0, 1]);
const mapCenter: LatLngExpression = [-0.5, 0.5];

const satisfactoryCRS: L.CRS = {
  ...L.CRS.Simple,
  scale(zoom: number) {
    return TILE_SIZE * tileCountForZoom(zoom);
  },
  zoom(scale: number) {
    return MIN_ZOOM + Math.log2(scale / (TILE_SIZE * BASE_TILE_COUNT));
  },
};
satisfactoryCRS.infinite = false;

class SatisfactoryTileLayer extends L.TileLayer {
  private readonly tileUrl: string;

  constructor() {
    super(TILE_URL_TEMPLATE, {
      tileSize: TILE_SIZE,
      minZoom: MIN_ZOOM,
      maxZoom: MAX_ZOOM,
      maxNativeZoom: MAX_ZOOM,
      minNativeZoom: MIN_ZOOM,
      noWrap: true,
      bounds: mapBounds,
    });
    this.tileUrl = TILE_URL_TEMPLATE;
  }

  override getTileUrl(coords: L.Coords): string {
    const zoom = coords.z as SupportedZoomLevel;
    const maxIndex = maxIndexForZoom(zoom);

    if (maxIndex === undefined) {
      throw new Error(`Zoom level ${coords.z} is not supported.`);
    }

    const normalizeIndex = (value: number) => {
      const integerValue = Math.floor(value);
      if (!Number.isFinite(integerValue)) {
        return null;
      }

      if (integerValue < 0 || integerValue > maxIndex) {
        return null;
      }

      return integerValue;
    };

    const x = normalizeIndex(coords.x);
    const y = normalizeIndex(coords.y);

    if (x === null || y === null) {
      return EMPTY_TILE_DATA_URL;
    }

    return L.Util.template(this.tileUrl, {
      x,
      y,
      z: zoom,
    });
  }
}

function SatisfactoryTiles() {
  const map = useMap();

  useEffect(() => {
    const layer = new SatisfactoryTileLayer();
    map.addLayer(layer);
    return () => {
      map.removeLayer(layer);
    };
  }, [map]);

  return null;
}

const V2InteractiveMap: React.FC = () => {
  return (
    <div style={{
      width: "100%",
      flex: 1,
      display: "flex",
      flexDirection: "column",
      minHeight: 0,
      background: "#111",
    }}>
      <MapContainer
        center={mapCenter}
        zoom={MIN_ZOOM}
        minZoom={MIN_ZOOM}
        maxZoom={MAX_ZOOM}
        crs={satisfactoryCRS}
        style={{ width: "100%", flex: 1, height: "100%" }}
        maxBounds={mapBounds}
        maxBoundsViscosity={1.0}
        zoomSnap={1}
        zoomDelta={1}
        scrollWheelZoom
        attributionControl={false}
        zoomControl
      >
        <SatisfactoryTiles />
      </MapContainer>
    </div>
  );
};

export default V2InteractiveMap;
