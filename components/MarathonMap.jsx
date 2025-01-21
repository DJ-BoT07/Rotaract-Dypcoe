'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Leaflet components with no SSR
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);
const Polyline = dynamic(
  () => import('react-leaflet').then((mod) => mod.Polyline),
  { ssr: false }
);
const CircleMarker = dynamic(
  () => import('react-leaflet').then((mod) => mod.CircleMarker),
  { ssr: false }
);

// Import other dependencies
import GPXParser from 'gpxparser';

// Calculate distance between two points
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return R * c;
}

function deg2rad(deg) {
  return deg * (Math.PI/180);
}

export default function MarathonMap({ gpxFile = '/10 KM.gpx' }) {
  const [route, setRoute] = useState(null);
  const [center, setCenter] = useState([18.646789, 73.759049]);
  const [totalDistance, setTotalDistance] = useState(0);
  const [kmMarkers, setKmMarkers] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const [L, setL] = useState(null);
  const [icons, setIcons] = useState(null);

  useEffect(() => {
    setIsClient(true);
    // Import Leaflet and set up icons only on client side
    import('leaflet').then((L) => {
      // Fix for default markers
      delete L.Icon.Default.prototype._getIconUrl;
      
      const startIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      const finishIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      setL(L);
      setIcons({ startIcon, finishIcon });
    });
  }, []);

  useEffect(() => {
    if (!isClient || !L) return;

    const fetchGPX = async () => {
      try {
        const response = await fetch(gpxFile);
        const gpxText = await response.text();
        
        const gpx = new GPXParser();
        gpx.parse(gpxText);
        
        if (gpx.tracks.length > 0) {
          const points = gpx.tracks[0].points.map(p => [p.lat, p.lon]);
          setRoute(points);
          
          // Calculate total distance and kilometer markers
          let distance = 0;
          const markers = [];
          
          for (let i = 1; i < points.length; i++) {
            const prevPoint = points[i-1];
            const currentPoint = points[i];
            const segmentDistance = calculateDistance(
              prevPoint[0], prevPoint[1],
              currentPoint[0], currentPoint[1]
            );
            
            distance += segmentDistance;
            
            // Add marker for each kilometer
            if (Math.floor(distance) > Math.floor(distance - segmentDistance)) {
              markers.push({
                position: currentPoint,
                km: Math.floor(distance)
              });
            }
          }
          
          setTotalDistance(distance);
          setKmMarkers(markers);
          
          // Set center to the middle point
          if (points.length > 0) {
            const midPoint = points[Math.floor(points.length / 2)];
            setCenter(midPoint);
          }
        }
      } catch (error) {
        console.error('Error loading GPX file:', error);
      }
    };

    fetchGPX();
  }, [isClient, L, gpxFile]);

  if (!isClient || !L || !icons) {
    return (
      <div className="h-full w-full bg-gray-100 rounded-lg animate-pulse flex items-center justify-center">
        <p className="text-gray-500">Loading map...</p>
      </div>
    );
  }

  return (
    <MapContainer
      center={center}
      zoom={15}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {route && (
        <>
          <Polyline
            positions={route}
            pathOptions={{ 
              color: '#d97706', 
              weight: 5,
              opacity: 0.8,
              lineCap: 'round',
              lineJoin: 'round'
            }}
          />
          <Marker position={route[0]} icon={icons.startIcon}>
            <Popup>
              <strong>Start Point</strong><br/>
              Get ready for an amazing run!
            </Popup>
          </Marker>
          <Marker position={route[route.length - 1]} icon={icons.finishIcon}>
            <Popup>
              <strong>Finish Line</strong><br/>
              Total Distance: {totalDistance.toFixed(2)} km
            </Popup>
          </Marker>
          {kmMarkers.map((marker, index) => (
            <CircleMarker
              key={index}
              center={marker.position}
              radius={6}
              pathOptions={{
                color: '#d97706',
                fillColor: '#fff',
                fillOpacity: 1,
                weight: 2
              }}
            >
              <Popup>
                {marker.km} km
              </Popup>
            </CircleMarker>
          ))}
        </>
      )}
    </MapContainer>
  );
} 