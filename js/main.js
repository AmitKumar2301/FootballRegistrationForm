// let data;

window.addEventListener("DOMContentLoaded", () => {
  const countries = document.querySelector("#country");
  const states = document.querySelector("#state");
  const cities = document.querySelector("#city");
  const uname = document.getElementById('uname')
  const fname = document.getElementById('fname');
  const lname = document.getElementById('lname'); 
  const phone = document.getElementById('phone');
  const email = document.getElementById('email');
  const age = document.getElementById('age');
  const desiredTeam = document.querySelectorAll('input[name="dteam"]');
  const desiredPosition = document.querySelectorAll('input[name="dPosition"]');
  const submitButton = document.getElementById('submit-button');

  fetch("https://countriesnow.space/api/v0.1/countries/codes")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      data.data.map((country) => {
        let option = document.createElement("option");
        option.innerText = country.name;
        option.setAttribute("value", country.name);
        countries.appendChild(option);
      });
      countries.removeAttribute("disabled");
    });

  countries.addEventListener("change", () => {
    states.innerHTML = "";
    let deffOption = document.createElement("option");
    deffOption.setAttribute("hidden", "true");
    deffOption.setAttribute("disabled", "true");
    deffOption.setAttribute("selected", "selected");
    deffOption.innerText = "Select your state";
    states.appendChild(deffOption);
    states.selectedIndex = 0;
    cities.innerHTML = "";

    let deffOption1 = document.createElement("option");
    deffOption1.setAttribute("hidden", "true");
    deffOption1.setAttribute("disabled", "true");
    deffOption1.setAttribute("selected", "selected");
    deffOption1.innerText = "Select your city";
    cities.appendChild(deffOption1);
    cities.selectedIndex = 0;

    fetch("https://countriesnow.space/api/v0.1/countries/states")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        data.data.map((country) => {
          if (country.name == countries.value) {
            console.log(country.name);
            country.states.map((state) => {
              console.log(state.name);
              let option = document.createElement("option");
              option.setAttribute("value", state.name);
              option.innerText = state.name;
              states.appendChild(option);
            });
          }
        });
        states.removeAttribute("disabled");
      });
  });

  states.addEventListener("change", () => {
    cities.innerHTML = "";
    let deffOption1 = document.createElement("option");
    deffOption1.setAttribute("hidden", "true");
    deffOption1.setAttribute("disabled", "true");
    deffOption1.setAttribute("selected", "selected");
    deffOption1.innerText = "Select your city";
    cities.appendChild(deffOption1);
    cities.selectedIndex = 0;

    let payload = {
      country: countries.value,
      state: states.value,
    };

    fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
      method: "POST",
      headers: {
        // 'Accept': 'application/json',
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        data.data.map((city) => {
          console.log(city);
          let option1 = document.createElement("option");
          option1.innerText = city;
          cities.appendChild(option1);
        });
      });
      cities.removeAttribute('disabled');
  });



  submitButton.addEventListener('click', () =>{
      fNameValidation();
  })

  const uNameValidation = () =>{

  }

  const fNameValidation = ()=>
     fname.value.match(/^[A-Za-z]+$/g)
        ?setValid(fname)
        :setInValid(fname)

  function setValid(tag){
      tag.setAttribute('class','is-valid form-control');
  }
  
  function setInValid(tag){
    tag.setAttribute('class','is-invalid form-control');
}
});
