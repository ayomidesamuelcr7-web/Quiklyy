import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { geocodeAddress } from '../../lib/geocode';

// A custom div icon that looks like a Quiklyy pin
const customIcon = new L.DivIcon({
  className: 'custom-pin',
  html: `
    <div class="relative flex items-center justify-center w-8 h-8 bg-[#004067] rounded-full border-2 border-white shadow-md text-white">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
    </div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

// Component to adjust map bounds to fit all markers
function MapBounds({ markers }) {
  const map = useMap();
  useEffect(() => {
    if (markers.length > 0) {
      const group = new L.featureGroup(markers.map(m => L.marker([m.lat, m.lng])));
      map.fitBounds(group.getBounds(), { padding: [50, 50] });
    }
  }, [markers, map]);
  return null;
}

export default function MapView({ items, onSelect }) {
  const [markers, setMarkers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Default to somewhere central if no items. We'll use Lagos, Nigeria as an example.
  const defaultCenter = [6.5244, 3.3792];

  useEffect(() => {
    let isMounted = true;

    async function loadCoordinates() {
      setLoading(true);
      const newMarkers = [];
      
      for (const item of items) {
        if (!item.distance || item.distance === 'Unknown Location') continue;
        
        const coords = await geocodeAddress(item.distance);
        if (coords && isMounted) {
          // Add a tiny random offset so markers at the exact same address don't perfectly overlap
          const latOffset = (Math.random() - 0.5) * 0.0005;
          const lngOffset = (Math.random() - 0.5) * 0.0005;
          
          newMarkers.push({
            ...item,
            lat: coords.lat + latOffset,
            lng: coords.lng + lngOffset
          });
        }
      }
      
      if (isMounted) {
        setMarkers(newMarkers);
        setLoading(false);
      }
    }

    if (items.length > 0) {
      loadCoordinates();
    } else {
      setLoading(false);
    }

    return () => { isMounted = false; };
  }, [items]);

  if (loading) {
    return (
      <div className="w-full h-[400px] bg-gray-100 rounded-2xl flex items-center justify-center border border-gray-200">
        <p className="text-gray-500 font-medium">Finding deals near you...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[60vh] min-h-[400px] rounded-2xl overflow-hidden border border-gray-200 shadow-sm relative z-0">
      <MapContainer 
        center={markers.length > 0 ? [markers[0].lat, markers[0].lng] : defaultCenter} 
        zoom={13} 
        scrollWheelZoom={true} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {markers.map((marker) => (
          <Marker 
            key={marker.id} 
            position={[marker.lat, marker.lng]}
            icon={customIcon}
          >
            <Popup className="custom-popup">
              <div className="flex flex-col gap-2 p-1 min-w-[150px]">
                <img 
                  src={marker.image} 
                  alt={marker.name} 
                  className="w-full h-24 object-cover rounded-lg mb-1" 
                />
                <div>
                  <h3 className="font-bold text-gray-900 leading-tight m-0">{marker.name}</h3>
                  <p className="text-xs text-gray-500 m-0 mt-0.5">{marker.storeName}</p>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="font-bold text-brand-blue">₦{marker.price}</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(marker);
                    }}
                    className="bg-brand-blue text-white text-xs px-3 py-1.5 rounded-full hover:bg-blue-900 transition-colors"
                  >
                    View
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
        
        <MapBounds markers={markers} />
      </MapContainer>
    </div>
  );
}
