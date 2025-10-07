import { MapContainer, ImageOverlay, useMapEvents } from 'react-leaflet';
import { LatLngBounds, LeafletMouseEvent, Map as LeafletMap } from 'leaflet';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState, useRef } from 'react';
import { useMemo } from 'react';

// Fix for default markers in react-leaflet
import L from 'leaflet';

// Fix default marker icons
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Satisfactory game coordinate system constants (simplified for direct mapping)
const MAPPING_BOUND_WEST = -324698.832031;
const MAPPING_BOUND_EAST = 425301.832031;
const MAPPING_BOUND_NORTH = -375000;
const MAPPING_BOUND_SOUTH = 375000;

// Use a simpler approach - map directly to image dimensions
const MAP_WIDTH = 1024; // Adjust based on your actual map image size
const MAP_HEIGHT = 1024; // Adjust based on your actual map image size

// Add padding around the map to allow scrolling past edges
const MAP_PADDING = 512; // Amount of padding around the image

// Simplified coordinate conversion functions
function convertToGameCoordinates(mapPixelCoords: [number, number]): [number, number] {
  // Convert map pixel coordinates to Satisfactory game coordinates
  const [pixelX, pixelY] = mapPixelCoords;

  // Calculate the game coordinate ranges
  const gameWidth = MAPPING_BOUND_EAST - MAPPING_BOUND_WEST; // ~750,000
  const gameHeight = MAPPING_BOUND_SOUTH - MAPPING_BOUND_NORTH; // ~750,000

  // Convert pixel coordinates to game coordinates
  const gameX = MAPPING_BOUND_WEST + (pixelX / MAP_WIDTH) * gameWidth;
  const gameY = MAPPING_BOUND_NORTH + (pixelY / MAP_HEIGHT) * gameHeight;

  return [gameX, gameY];
}

interface CoordinateDisplayProps {
  coordinates: { x: number; z: number } | null;
}

function CoordinateDisplay({ coordinates }: CoordinateDisplayProps) {
  const theme = useTheme();

  return (
    <div
      style={{
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(1, 2),
        fontSize: '0.875rem',
        color: coordinates ? theme.palette.text.primary : theme.palette.text.secondary,
        fontFamily: 'monospace',
        minHeight: '32px',
        display: 'flex',
        alignItems: 'center',
        marginTop: theme.spacing(1),
      }}
    >
      {coordinates
        ? `X: ${Math.round(coordinates.x).toLocaleString()} | Z: ${Math.round(coordinates.z).toLocaleString()}`
        : 'Hover over the map to see coordinates'}
    </div>
  );
}

interface MapEventsProps {
  onCoordinateChange: (coordinates: { x: number; z: number } | null) => void;
}

function MapEvents({ onCoordinateChange }: MapEventsProps) {
  useMapEvents({
    mousemove: (e: LeafletMouseEvent) => {
      // Convert the leaflet lat/lng to map pixel coordinates
      // For L.CRS.Simple, lat corresponds to Y and lng corresponds to X
      const pixelX = e.latlng.lng;
      const pixelY = e.latlng.lat;

      // Convert to game coordinates
      const gameCoords = convertToGameCoordinates([pixelX, pixelY]);

      onCoordinateChange({
        x: gameCoords[0],
        z: gameCoords[1], // Using Z instead of Y for display (ignoring Y coordinate as requested)
      });
    },
    mouseout: () => {
      onCoordinateChange(null);
    },
  });

  return null;
}

export default function InteractiveMap() {
  const theme = useTheme();
  const [coordinates, setCoordinates] = useState<{ x: number; z: number } | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);

  const mapBounds = useMemo(
    () =>
      new LatLngBounds(
        [-MAP_PADDING, -MAP_PADDING],
        [MAP_HEIGHT + MAP_PADDING, MAP_WIDTH + MAP_PADDING]
      ),
    []
  );

  const imageBounds = useMemo(
    () => new LatLngBounds([0, 0], [MAP_HEIGHT, MAP_WIDTH]),
    []
  );

  // Update CSS custom property when theme changes
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--map-bg-color',
      theme.palette.background.default
    );
  }, [theme.palette.background.default]);

  // Calculate center of the map
  const mapCenter = [MAP_HEIGHT / 2, MAP_WIDTH / 2]; // [lat, lng] = [Y, X]

  return (
    <div>
      <div
        className="interactive-map-container"
        style={
          {
            height: '500px',
            width: '100%',
            backgroundColor: theme.palette.background.default,
            '--map-bg-color': theme.palette.background.default,
          } as React.CSSProperties & { '--map-bg-color': string }
        }
      >
        <MapContainer
          center={mapCenter as [number, number]}
          zoom={1} // Start with a lower zoom level to see the whole map
          minZoom={0}
          maxZoom={6} // Reasonable zoom levels
          crs={L.CRS.Simple}
          style={{ height: '100%', width: '100%' }}
          maxBounds={mapBounds}
          maxBoundsViscosity={0.0}
          zoomControl={true}
          attributionControl={false}
          ref={mapRef}
          zoomSnap={0.25}
          zoomAnimation={false}
        >
          <ImageOverlay url="/map.jpg" bounds={imageBounds} />
          <MapEvents onCoordinateChange={setCoordinates} />
        </MapContainer>
      </div>
      <CoordinateDisplay coordinates={coordinates} />
    </div>
  );
}
