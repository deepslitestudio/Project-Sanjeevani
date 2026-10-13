import { useState, useEffect, useCallback } from 'react';

export interface UserLocation {
  latitude: number | null;
  longitude: number | null;
  placeName: string;
  city: string;
  state: string;
  country: string;
  isLoading: boolean;
  error: string | null;
  lastUpdated: string | null;
}

export function useUserLocation() {
  const [location, setLocation] = useState<UserLocation>({
    latitude: null,
    longitude: null,
    placeName: 'Detecting live GPS location...',
    city: '',
    state: '',
    country: '',
    isLoading: true,
    error: null,
    lastUpdated: null,
  });

  const fetchLocation = useCallback(() => {
    setLocation((prev) => ({ ...prev, isLoading: true, error: null }));

    if (!navigator.geolocation) {
      setLocation((prev) => ({
        ...prev,
        isLoading: false,
        error: 'Geolocation is not supported by your browser.',
        placeName: 'Location Unavailable',
      }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const updatedTime = new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });

        // Try reverse geocoding to get human readable address
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=14&addressdetails=1`,
            {
              headers: {
                'Accept-Language': 'en',
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            const addr = data.address || {};
            const cityOrVillage =
              addr.suburb ||
              addr.village ||
              addr.town ||
              addr.city ||
              addr.county ||
              addr.district ||
              'Your Location';
            const state = addr.state || '';
            const country = addr.country || '';
            
            const formattedPlace = state
              ? `${cityOrVillage}, ${state}`
              : `${cityOrVillage}, ${country}`;

            setLocation({
              latitude: lat,
              longitude: lng,
              placeName: formattedPlace || data.display_name || `${lat.toFixed(4)}°, ${lng.toFixed(4)}°`,
              city: cityOrVillage,
              state,
              country,
              isLoading: false,
              error: null,
              lastUpdated: updatedTime,
            });
            return;
          }
        } catch (err) {
          console.warn('Reverse geocoding request failed, using Lat/Lng:', err);
        }

        // Fallback if reverse geocode fails or is offline
        setLocation({
          latitude: lat,
          longitude: lng,
          placeName: `GPS: ${lat.toFixed(4)}°, ${lng.toFixed(4)}°`,
          city: 'GPS Coordinates',
          state: '',
          country: '',
          isLoading: false,
          error: null,
          lastUpdated: updatedTime,
        });
      },
      (error) => {
        console.warn('GPS position error:', error.message);
        let errorMsg = 'Could not acquire GPS position.';
        if (error.code === error.PERMISSION_DENIED) {
          errorMsg = 'Location permission denied. Please allow GPS access.';
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          errorMsg = 'GPS position unavailable.';
        } else if (error.code === error.TIMEOUT) {
          errorMsg = 'GPS request timed out.';
        }

        setLocation({
          latitude: 20.5937,
          longitude: 78.9629,
          placeName: 'India (Default GPS)',
          city: 'Default',
          state: 'Location',
          country: 'India',
          isLoading: false,
          error: errorMsg,
          lastUpdated: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 30000,
      }
    );
  }, []);

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  return { location, refreshLocation: fetchLocation };
}
