import "./styles/globals.css";
import "./styles/styles.css";
import "bootstrap/dist/css/bootstrap.css";
import { countryService } from "./service/api";

const UI = {
  countryContainer: {
    $container: document.querySelector("[data-content=countries]"),
  },
};

let recordLimit = 5; //Default limit

async function init() {
  console.log("init function");
  populateCountry(recordLimit);
  showRecords();
}



async function populateCountry(limit) {

  try {
    const countries = await countryService.getCountryByRegion("europe");
    

    //console.log(limit);
    const countryNames = countries.map((country) => country.name.common);

    //console.log(countryNames);
    if(countries.length >0)
    {
      //const countryContainer = document.getElementById("countryContainer");
      const countryHTMLArray = countries.slice(0, limit).map((country) => {
        return createCountryHTML(country);
      });
      render(UI.countryContainer.$container, countryHTMLArray);
    }
  }
  catch (error) 
  {
    console.error("Error fetching countries:", error);
    return [];
  }
}


function createCountryHTML(country) {
  return `
    <div class="col-md-3 mb-3 p-3 border rounded text-center position-relative">
      <img src="${country.flags.png}" alt="${country.name.common} flag" class="img-fluid mb-2" style="max-height: 100px;">
      <h6 class="mb-1">${country.name.common}</h6>
      <p class="mb-1">Capital: ${country.capital ? country.capital[0] : "N/A"}</p>
      <p>Population: ${country.population.toLocaleString()}</p>
      <button class="btn btn-danger btn-sm position-absolute top-0 start-0 m-2 delete-button">X</button>
    </div>
  `;
}




function displayName(limit) {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const displayNameDiv = document.getElementById("userName");
  displayNameDiv.textContent = `${firstName} ${lastName} Wants to show ${limit} Cards!`;
  //console.log(firstName);
}


function render($container, htmlArray) {
  $container.innerHTML = htmlArray.join("");
  
}


function showRecords() {
  const showRecordsButton = document.getElementById("showRecordsButton");
  showRecordsButton.addEventListener("click", (event) => {
    event.preventDefault();
    const selectedRadioButton = document.querySelector(
      'input[name="recordCount"]:checked'
    );
    if (selectedRadioButton) 
      {
      recordLimit = parseInt(selectedRadioButton.value);
      //console.log(recordLimit);
      populateCountry(recordLimit);
      
    }
    displayName(recordLimit);
    scrollTo(0,0);
  });
}

init();