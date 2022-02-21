let userData;

function countriesData(dialcodeid) {
  // Fetch the countries from api
  fetch("https://countriesnow.space/api/v0.1/countries/codes")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      data.data.map((country) => {
        let option = document.createElement("option");
        option.innerText = country.name;
        option.setAttribute("value", country.name);
        option.setAttribute("id", country.dial_code);
        countries.appendChild(option);
      });
      document.getElementById(dialcodeid).setAttribute("selected", "");
      countries.removeAttribute("disabled");

      states.innerHTML = "";
      let deffOption = document.createElement("option");
      deffOption.setAttribute("hidden", "true");
      deffOption.setAttribute("disabled", "true");
      deffOption.setAttribute("selected", "");
      deffOption.setAttribute("id", "state-default");
      deffOption.setAttribute("value", "");
      deffOption.innerText = "Select your state";
      states.appendChild(deffOption);
      states.selectedIndex = 0;
      cities.innerHTML = "";

      let deffOption1 = document.createElement("option");
      deffOption1.setAttribute("hidden", "true");
      deffOption1.setAttribute("disabled", "true");
      deffOption1.setAttribute("selected", "");
      deffOption1.setAttribute("id", "city-default");
      deffOption1.setAttribute("value", "");
      deffOption1.innerText = "Select your city";
      cities.appendChild(deffOption1);
      cities.selectedIndex = 0;

      // Fetch states from api
      fetch("https://countriesnow.space/api/v0.1/countries/states")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          data.data.map((country) => {
            if (country.name == countries.value) {
              country.states.map((state, index) => {
                let option = document.createElement("option");
                option.setAttribute("value", index);
                option.setAttribute("id", index);
                option.innerText = state.name;
                states.appendChild(option);
              });
            }
          });
          states.removeAttribute("disabled");
        });
    });
}

states.addEventListener("change", () => {
  cities.innerHTML = "";
  let deffOption1 = document.createElement("option");
  deffOption1.setAttribute("hidden", "true");
  deffOption1.setAttribute("disabled", "true");
  deffOption1.setAttribute("selected", "");
  deffOption1.setAttribute("id", "city-default");
  deffOption1.innerText = "Select your city";
  cities.appendChild(deffOption1);
  cities.selectedIndex = 0;

  fetchCity(countries.value, states.options[states.selectedIndex].text);
});

function fetchCity(country, state) {
  let cityPayload = {
    country: country,
    state: state,
  };
  // Fetch the cities from api
  fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cityPayload),
  })
    .then((response) => response.json())
    .then((data) => {
      data.data.map((city, index) => {
        let option1 = document.createElement("option");
        option1.setAttribute("value", index);
        option1.setAttribute("id", index);
        option1.innerText = city;
        cities.appendChild(option1);
      });
    });
  cities.removeAttribute("disabled");
}

/**
 * @returns form data object
 */
function payload() {
  const userpayload = {
    uname: uname.value.trim(),
    fname: fname.value,
    lname: lname.value,
    dialCode: dialCode.value,
    phone: phone.value,
    email: email.value,
    ageGroup: age.value,
    desiredTeam: getSelectedTeam(),
    desiredPosition: getSelectedPositions(),
    address: completeAddress(),
    pincode: pincode.value,
  };
  return userpayload;
}

/**
 * This function addNew user to the server
 */
function addUser() {
  fetch("http://localhost:8080/api/v1/formdata/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload()),
  })
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });
}

/**
 * This function fetch form data from server on the basis of uname
 */
function getUserData(uname) {
  const url = "http://localhost:8080/api/v1/formdata/" + uname;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.status == 200)
      {
        userData = data;
        retrieveButton.removeAttribute("disabled");
        retrieveButton.classList.remove("btn-secondry");
        retrieveButton.classList.add("btn-success");
      } 
      else 
      {
        retrieveButton.setAttribute("disabled", "");
        retrieveButton.classList.remove("btn-success");
        retrieveButton.classList.add("btn-secondry");
        
        updateButton.setAttribute("disabled", " ");
        updateButton.setAttribute("hidden", " ");

        submitButton.removeAttribute("disabled");
        submitButton.removeAttribute("hidden");
      }
    });
}

/**
 * This function update user on the basis of user name
 * @param {*} uname 
 */
function updateUser(uname) {
  const url = "http://localhost:8080/api/v1/formdata/update/" + uname;

  fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload()),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}
