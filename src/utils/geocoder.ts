import GeoCoder, { OpenStreetMapOptions } from "node-geocoder";

const options: OpenStreetMapOptions = {
  provider: "openstreetmap",
};

const geocoder = GeoCoder(options);

// geocoder
//   .reverse({ lat: 45.767, lon: 4.833 })
//   .then((result) => console.log(result))
//   .catch(console.log);

export const getGeoAddress = async (lat: number, lon: number) => {
  const result = await geocoder.reverse({ lat, lon });
  return result[0];
};
