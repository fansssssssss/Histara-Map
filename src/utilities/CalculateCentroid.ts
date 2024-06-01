const calculateMiddlePoint = (geoJsonData) => {
  // Extract coordinates
  const coordinates = geoJsonData.features.map(feature => feature.geometry.coordinates);

  // Calculate the average of the latitudes and longitudes (swapping their positions)
  const middlePoint = coordinates.reduce((acc, coord) => {
    acc[0] += coord[1]; // latitude
    acc[1] += coord[0]; // longitude
    return acc;
  }, [0, 0]).map(coord => coord / coordinates.length);

  return middlePoint;
};

export default calculateMiddlePoint;
