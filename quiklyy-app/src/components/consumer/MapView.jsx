import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { LocateFixed } from 'lucide-react';
import useLocationStore from '../../store/useLocationStore';

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

// Icon for the user's current location
const userIcon = new L.DivIcon({
  className: 'user-pin',
  html: `<div class="w-5 h-5 bg-blue-500 rounded-full border-[3px] border-white shadow-lg shadow-blue-500/50"></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

// Component to handle user location
function LocationButton() {
  const map = useMap();
  const setLocation = useLocationStore((state) => state.setLocation);
  const [locating, setLocating] = React.useState(false);

  const handleLocate = () => {
    setLocating(true);
    map.locate({ setView: true, maxZoom: 14 });
    
    map.once('locationfound', (e) => {
      setLocation(e.latlng.lat, e.latlng.lng);
      setLocating(false);
    });
    
    map.once('locationerror', (e) => {
      console.error(e);
      setLocating(false);
      alert('Could not find your location. Please check browser permissions.');
    });
  };

  return (
    <button 
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleLocate();
      }}
      className={`absolute bottom-6 right-6 z-[400] bg-white p-3 rounded-full shadow-lg border border-gray-200 transition-transform active:scale-95 flex items-center justify-center ${locating ? 'animate-pulse text-blue-500' : 'text-gray-700 hover:text-brand-blue'}`}
      title="Find My Location"
    >
      <LocateFixed size={24} />
    </button>
  );
}

// Component to adjust map bounds to fit all markers
function MapBounds({ markers, userLocation }) {
  const map = useMap();
  useEffect(() => {
    // Only auto-fit bounds if we haven't locked onto the user's location
    if (markers.length > 0 && !userLocation) {
      const group = new L.featureGroup(markers.map(m => L.marker([m.lat, m.lng])));
      map.fitBounds(group.getBounds(), { padding: [50, 50] });
    }
  }, [markers, map, userLocation]);
  return null;
}

export default function MapView({ items, onSelect }) {
  const userLocation = useLocationStore((state) => state.userLocation);
  
  // Filter items that have successfully been geocoded
  const markers = items.filter(item => item.lat && item.lng);
  
  // Default to somewhere central if no items.
  const defaultCenter = [6.5244, 3.3792];

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
        
        <LocationButton />

        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
            <Popup>You are here</Popup>
          </Marker>
        )}
        
        <MarkerClusterGroup chunkedLoading maxClusterRadius={50}>
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
                    {marker.calculatedDistance && (
                      <p className="text-xs text-brand-blue font-medium mt-1">{marker.calculatedDistance} miles away</p>
                    )}
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
        </MarkerClusterGroup>
        
        <MapBounds markers={markers} userLocation={userLocation} />
      </MapContainer>
    </div>
  );
}
