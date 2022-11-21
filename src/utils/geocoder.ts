import GeoCoder, { GenericOptions } from "node-geocoder";

const options: GenericOptions = {
  // @ts-ignore
  provider: "virtualearth",
  apiKey: process.env.BING_API_KEY,
};

const geocoder = GeoCoder(options);

export const getGeoAddress = async (lat: number, lon: number) => {
  const result = await geocoder.reverse({ lat, lon });
  return result[0];
};
