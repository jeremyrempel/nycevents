export function getLatLong(coords) {
  const eventCoordSet = coords.split(";");
  const eventCoord = eventCoordSet[0].split(",");

  const latitude = Number(eventCoord[0]);
  const longitude = Number(eventCoord[1]);

  return { latitude, longitude };
}
