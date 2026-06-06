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
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50 px-4 md:px-8 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-brand-blue flex items-center justify-center">
          <span className="text-white font-bold text-xl leading-none">Q</span>
        </div>
        <span className="text-brand-blue font-bold text-xl tracking-tight">Quiklyy</span>
      </div>

      <div className="hidden md:flex items-center text-gray-500 text-sm bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
        <MapPin size={16} className="mr-1 text-brand-accent" />
        <span>{locationName}</span>
      </div>

      <div className="flex items-center gap-3 md:gap-5">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium bg-gray-100 text-brand-blue">
          <User size={16} />
          <span className="hidden sm:inline">Consumer</span>
        </div>
        
        <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>
        
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
