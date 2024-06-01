import { useState, useEffect } from "react";

const useCurrentLocation = () => {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    const handleSuccess = (position: any) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    };

    const intervalId = setInterval(() => {
      navigator.geolocation.getCurrentPosition(handleSuccess, (error) => setError(error.message));
      // console.log("effect")
    }, 1000);

    // Cleanup function to clear the interval
    return () => clearInterval(intervalId);
  }, []);

  return { location, error };
};

export default useCurrentLocation;
