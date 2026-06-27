const cache = {};
let lastRequestTime = 0;

export async function geocodeAddress(address) {
  if (!address) return null;
  if (cache[address]) {
    return cache[address];
  }
  
  try {
    // Respect Nominatim rate limits (1 req/sec roughly)
    const now = Date.now();
    const timeSinceLast = now - lastRequestTime;
    if (timeSinceLast < 1000) {
      await new Promise(resolve => setTimeout(resolve, 1000 - timeSinceLast));
    }
    lastRequestTime = Date.now();

    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;
    const res = await fetch(url);
    const data = await res.json();
    if (data && data.length > 0) {
      const coords = { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
      cache[address] = coords;
      return coords;
    }
    
    // If not found, cache null so we don't keep trying
    cache[address] = null;
    return null;
  } catch (err) {
    console.error("Geocoding failed for", address, err);
    return null;
  }
}
