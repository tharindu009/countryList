import "./styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import { countryService} from "./service/api";

const UI = {
    country: {
      $container: document.querySelector("[data-content=countries]"),
    },
  };


async function init() {
    console.log("init function");
    populateCountry();
    //addEventListeners();
}

  

  async function populateCountry() {
    //debugger;
    // if(!region){
    //     console.error("Region is required.");
    // return;
    // }
    try {
        const countries = await countryService.getCountryByRegion("asia");
        
        console.log(countries);
        // Here you can update the UI with the countries data.
        displayCountries(countries);
      } 
      catch (error) 
      {
        console.error("Error fetching countries:", error);
      }
    
  }


  function displayCountries(countries) {
    if(!UI.country.$container){
        console.error("country container not found");
        return;
    }
    UI.country.$container.innerHTML = "";//clear previous results.

    countries.forEach(country => {
        const countryElement = document.createElement("div");
        countryElement.textContent = country.name.common;
        UI.country.$container.appendChild(countryElement);
    });
}

  init();