import { useEffect, useState } from "react";
import { LatLng, LatLngBounds, LatLngExpression, Map as LeafletMap, Point } from "leaflet";
import {
  MapContainer,
  useMap,
  useMapEvents,
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

const MAPPING_BOUND_WEST = -324698.832031;
const MAPPING_BOUND_EAST = 425301.832031;
const MAPPING_BOUND_NORTH = -375000;
const MAPPING_BOUND_SOUTH = 375000;

const BASE_BACKGROUND_SIZE = 32768;
const EXTRA_BACKGROUND_SIZE = 4096;
const EFFECTIVE_BACKGROUND_SIZE = BASE_BACKGROUND_SIZE + EXTRA_BACKGROUND_SIZE * 2;
const ORIGINAL_WIDTH = Math.abs(MAPPING_BOUND_WEST) + Math.abs(MAPPING_BOUND_EAST);
const ORIGINAL_HEIGHT = Math.abs(MAPPING_BOUND_NORTH) + Math.abs(MAPPING_BOUND_SOUTH);
const WEST_OFFSET = (ORIGINAL_WIDTH / BASE_BACKGROUND_SIZE) * EXTRA_BACKGROUND_SIZE;
const NORTH_OFFSET = (ORIGINAL_HEIGHT / BASE_BACKGROUND_SIZE) * EXTRA_BACKGROUND_SIZE;
const EXTENDED_BOUND_WEST = MAPPING_BOUND_WEST - WEST_OFFSET;
const EXTENDED_BOUND_EAST = MAPPING_BOUND_EAST + WEST_OFFSET;
const EXTENDED_BOUND_NORTH = MAPPING_BOUND_NORTH - NORTH_OFFSET;
const EXTENDED_BOUND_SOUTH = MAPPING_BOUND_SOUTH + NORTH_OFFSET;
const EXTENDED_WIDTH = Math.abs(EXTENDED_BOUND_WEST) + Math.abs(EXTENDED_BOUND_EAST);
const EXTENDED_HEIGHT = Math.abs(EXTENDED_BOUND_NORTH) + Math.abs(EXTENDED_BOUND_SOUTH);
const PIXEL_TO_GAME_X = EXTENDED_WIDTH / EFFECTIVE_BACKGROUND_SIZE;
const PIXEL_TO_GAME_Z = EXTENDED_HEIGHT / EFFECTIVE_BACKGROUND_SIZE;
const X_OFFSET = EXTENDED_WIDTH - EXTENDED_BOUND_EAST;
const Y_OFFSET = EXTENDED_HEIGHT - EXTENDED_BOUND_NORTH;
const ZOOM_RATIO = Math.ceil(Math.log(EFFECTIVE_BACKGROUND_SIZE / TILE_SIZE) / Math.log(2));

const convertPointToGameCoordinates = (point: Point) => ({
  x: (point.x * PIXEL_TO_GAME_X) - X_OFFSET,
  z: (point.y * PIXEL_TO_GAME_Z) - Y_OFFSET + EXTENDED_HEIGHT,
});

const convertLatLngToGameCoordinates = (latLng: LatLng, map: LeafletMap) => {
  const projected = map.project(latLng, ZOOM_RATIO);
  return convertPointToGameCoordinates(projected);
};

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

type MouseCoordinateTrackerProps = {
  onPositionChange: (coordinates: { x: number; z: number } | null) => void;
};

function MouseCoordinateTracker({ onPositionChange }: MouseCoordinateTrackerProps) {
  const map = useMapEvents({
    mousemove(event) {
      const gameCoordinates = convertLatLngToGameCoordinates(event.latlng, map);
      onPositionChange(gameCoordinates);
    },
    mouseout() {
      onPositionChange(null);
    },
  });

  return null;
}

const V2InteractiveMap: React.FC = () => {
  const [hoverGameCoordinates, setHoverGameCoordinates] = useState<{ x: number; z: number } | null>(null);

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
        <MouseCoordinateTracker onPositionChange={setHoverGameCoordinates} />
      </MapContainer>
      <div
        style={{
          padding: "8px 12px",
          background: "#1c1c1c",
          color: "#f1f1f1",
          fontFamily: "monospace",
          fontSize: "0.875rem",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        {hoverGameCoordinates
          ? `X: ${Math.round(hoverGameCoordinates.x).toLocaleString()}  Z: ${Math.round(hoverGameCoordinates.z).toLocaleString()}`
          : "Hover over the map to see coordinates"}
      </div>
    </div>
  );
};

export default V2InteractiveMap;
