import { countryClient } from "./client.js";

export const countryService = {
  getCountryByRegion(region) {
    return countryClient.get(`/region/${region}`);
  },
};