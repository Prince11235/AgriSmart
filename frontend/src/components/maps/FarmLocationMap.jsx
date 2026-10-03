import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, ExternalLink } from 'lucide-react';

// Fix Leaflet marker icons issue in Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Component to handle dynamic map re-centering when farmer location props update
function MapRecenter({ lat, lng }) {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map.setView([lat, lng], 13);
    }
  }, [lat, lng, map]);
  return null;
}

export const FarmLocationMap = ({
  lat = 30.9010,
  lng = 75.8573,
  farmName = 'My Registered Farm',
  village = 'Samrala',
  district = 'Ludhiana',
  state = 'Punjab',
  farmAreaAcres = 5,
  googleApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
}) => {
  const locationString = `${village ? village + ', ' : ''}${district}, ${state}`;

  // If user provided a Google Maps API Key, render native Google Maps Embed API
  if (googleApiKey) {
    const googleEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=${googleApiKey}&q=${lat},${lng}&zoom=14&maptype=satellite`;
    return (
      <div className="w-full h-[380px] rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 relative">
        <iframe
          title="Google Maps Dynamic Location"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src={googleEmbedUrl}
        ></iframe>
        <div className="absolute bottom-3 left-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md p-2.5 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 text-xs">
          <strong className="text-emerald-700 dark:text-emerald-400 font-bold block">{farmName} ({farmAreaAcres} Acres)</strong>
          <span className="text-gray-600 dark:text-gray-300">{locationString}</span>
        </div>
      </div>
    );
  }

  // OpenStreetMap / Leaflet dynamic map centered on exact farmer profile location
  return (
    <div className="w-full h-[380px] rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 relative">
      <MapContainer center={[lat, lng]} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        <MapRecenter lat={lat} lng={lng} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]}>
          <Popup>
            <div className="p-1 text-xs">
              <strong className="text-emerald-700 font-bold text-sm block">{farmName}</strong>
              <p className="mt-1 text-gray-700 font-semibold">{locationString}</p>
              <p className="text-[10px] text-gray-500 font-mono">GPS: {lat}, {lng}</p>
              <span className="mt-2 inline-block px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-semibold text-[10px]">
                Area: {farmAreaAcres} Acres
              </span>
            </div>
          </Popup>
        </Marker>
        <Circle center={[lat, lng]} radius={farmAreaAcres * 300} pathOptions={{ color: '#16a34a', fillColor: '#22c55e', fillOpacity: 0.2 }} />
      </MapContainer>

      {/* Floating Info Overlay with Google Maps direct link */}
      <div className="absolute top-3 right-3 z-[1000]">
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
          target="_blank"
          rel="noreferrer"
          className="px-3 py-1.5 rounded-xl bg-white/90 dark:bg-gray-900/90 text-gray-800 dark:text-gray-200 text-[11px] font-bold shadow-md hover:bg-emerald-600 hover:text-white transition-colors flex items-center space-x-1 border border-gray-200 dark:border-gray-700"
        >
          <MapPin className="w-3.5 h-3.5 text-red-500" />
          <span>Google Maps View</span>
          <ExternalLink className="w-3 h-3 ml-1" />
        </a>
      </div>
    </div>
  );
};
