import { MapPin, LogOut, User } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ConsumerHeader({ onLogout }) {
  const [locationName, setLocationName] = useState('Finding location...');

  useEffect(() => {
    // 1. Check if the browser supports geolocation
    if ("geolocation" in navigator) {
      
      // 2. Start tracking the user
      const watchId = navigator.geolocation.watchPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const accuracy = position.coords.accuracy; // in meters

          console.log(`User is at: ${latitude}, ${longitude}`);
          
          try {
            // Reverse geocode to get city name
            const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
            const data = await response.json();
            if (data.city) {
              setLocationName(`${data.city}, ${data.principalSubdivisionCode?.split('-')[1] || data.principalSubdivision}`);
            } else {
              setLocationName('Current Location');
            }
          } catch (error) {
            console.error("Error reverse geocoding:", error);
            setLocationName('Location found');
          }
        },
        (error) => {
          console.error("Error tracking location: ", error.message);
          setLocationName('Location unavailable');
        },
        {
          enableHighAccuracy: true, // Uses GPS if available on mobile
          timeout: 5000,            // How long to wait for a response
          maximumAge: 0             // Force it to fetch a fresh location, not cached
        }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      console.log("Geolocation is not supported by this browser.");
      setLocationName('Location unsupported');
    }
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 h-14 md:h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 z-40 px-4 md:px-8 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-brand-blue flex items-center justify-center shadow-sm">
          <span className="text-white font-bold text-lg md:text-xl leading-none">Q</span>
        </div>
        <span className="text-brand-blue font-bold text-lg md:text-xl tracking-tight">Quiklyy</span>
      </div>

      <div className="flex items-center text-gray-500 text-xs md:text-sm bg-gray-50/80 px-3 py-1.5 rounded-full border border-gray-100 max-w-[150px] md:max-w-xs truncate">
        <MapPin size={14} className="mr-1 text-brand-accent flex-shrink-0" />
        <span className="truncate">{locationName}</span>
      </div>

      <div className="hidden md:flex items-center gap-5">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium bg-gray-100 text-brand-blue">
          <User size={16} />
          <span>Consumer</span>
        </div>
        
        <div className="h-6 w-px bg-gray-200"></div>
        
        <button 
          onClick={onLogout}
          className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
          title="Sign out"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
}
