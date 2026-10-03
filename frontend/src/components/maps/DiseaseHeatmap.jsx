import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';

export const DiseaseHeatmap = () => {
  const outbreaks = [
    { id: 1, lat: 30.9, lng: 75.85, crop: 'Tomato', disease: 'Late Blight', count: 14, severity: 'High', color: '#ef4444' },
    { id: 2, lat: 31.1, lng: 75.50, crop: 'Wheat', disease: 'Yellow Rust', count: 8, severity: 'Moderate', color: '#f59e0b' },
    { id: 3, lat: 30.7, lng: 76.78, crop: 'Rice', disease: 'Paddy Blast', count: 21, severity: 'High', color: '#dc2626' },
    { id: 4, lat: 29.9, lng: 75.30, crop: 'Cotton', disease: 'Leaf Curl Virus', count: 5, severity: 'Low', color: '#10b981' }
  ];

  return (
    <div className="w-full h-[380px] rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 relative">
      <MapContainer center={[30.8, 75.9]} zoom={9} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {outbreaks.map((ob) => (
          <CircleMarker
            key={ob.id}
            center={[ob.lat, ob.lng]}
            radius={ob.count * 1.5}
            pathOptions={{ color: ob.color, fillColor: ob.color, fillOpacity: 0.5 }}
          >
            <Popup>
              <div className="p-1 text-xs">
                <span className="font-bold text-red-600 uppercase tracking-wider text-[10px]">⚠️ Disease Outbreak</span>
                <h4 className="font-bold text-gray-900 text-sm mt-0.5">{ob.disease}</h4>
                <p className="text-gray-600 mt-1">Affected Crop: <strong>{ob.crop}</strong></p>
                <p className="text-gray-600">Active Reports: <strong>{ob.count} farms</strong></p>
                <span className="mt-2 inline-block px-2 py-0.5 rounded text-[10px] font-bold text-white" style={{ backgroundColor: ob.color }}>
                  Severity: {ob.severity}
                </span>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};
