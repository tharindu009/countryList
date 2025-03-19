import "./styles/globals.css";
import "./styles/styles.css";
import "bootstrap/dist/css/bootstrap.css";
import { countryService } from "./service/api";

const UI = {
  countries: {
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

    // const createCountryHTML = ({tld, countryNames, capital, flag, flags, languages, region }) => {
    //   return `
    //   <li data-id=${tld}>
    //     <article>
    //       <h2>${countryNames}</h2>
    //       <p>${capital}</p>
    //       <p>${flag}</p>
    //       <p>${flags}</p>
    //       <p>${languages.nno}</p>
    //       <p>${region}</p>
    //       <footer>
    //       </footer>
    //     </article>
    //   </li>`;


    if (countries.length > 0) {
      const countryContainer = document.getElementById("countryContainer");
      if (countryContainer) {
        countryContainer.innerHTML = ""; // clear 
        countries.slice(0, limit).forEach((country) => {     
          const countryBox = document.createElement("div");
          countryBox.classList.add(
            "col-md-2",
            "mb-3",
            "p-3",
            "border",
            "rounded",
            "text-center"
          );

          const flagImg = document.createElement("img");
          flagImg.src = country.flags.png;
          flagImg.alt = `${country.name.common} flag`;
          flagImg.classList.add("img-fluid", "mb-2");
          flagImg.style.maxHeight = "100px";

          const countryName = document.createElement("h6");
          countryName.textContent = country.name.common;
          countryName.classList.add("mb-1");

          const capital = document.createElement("p");
          capital.textContent = `Capital: ${country.capital ? country.capital[0] : "N/A"}`;
          capital.classList.add("mb-1");

          const population = document.createElement("p");
          population.textContent = `Population: ${country.population.toLocaleString()}`;

          countryBox.appendChild(flagImg);
          countryBox.appendChild(countryName);
          countryBox.appendChild(capital);
          countryBox.appendChild(population);

          countryContainer.appendChild(countryBox);
        });
      }
    }
    else {
      console.log("Failed to fetch country names.");
    }
  }
  catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
}



function displayName(limit) {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const displayNameDiv = document.getElementById("userName");
  displayNameDiv.textContent = `${firstName} ${lastName} Wants to show ${limit} Cards!`;
  //console.log(firstName);
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