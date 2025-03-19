import axios from "axios";
import {API_CONFIG_COUNTRY} from "./config.js";

//Responce
const handleResponse = (response) =>{

    //console.log(response);

    return response.data;
}


//Get Country by region
export const countryClient = {
    async get(endpoint, customConfig = {}) {
      const config = {
        method: "get",
        url: `${API_CONFIG_COUNTRY.BASE_URL}${endpoint}`,
        headers: {
          ...API_CONFIG_COUNTRY.HEADERS,
          ...customConfig.headers,
        },
      };
  
      try 
      {
        const response = await axios(config);
        const data = handleResponse(response);
        return data;
      } 
      catch (error) 
      {
        throw new Error(`Unable to fetch:  ${error}`);
      }
    },
  };