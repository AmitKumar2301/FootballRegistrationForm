// let data;

window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('form');
  const countries = document.querySelector("#country");
  const states = document.querySelector("#state");
  const cities = document.querySelector("#city");
  const uname = document.getElementById('uname')
  const fname = document.getElementById('fname');
  const lname = document.getElementById('lname');
  const phone = document.getElementById('phone');
  const email = document.getElementById('email');
  const rollCheck = document.getElementById('roll-check');
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

  const uNameValidation = () => {

  }

  fname.addEventListener('click', fname.addEventListener('focusout', () => {
    fname.value.match(/^[A-Za-z]+$/g)
      ? setValid(fname)
      : setInValid(fname)
  }))

  lname.addEventListener('click', lname.addEventListener('focusout',
  () =>{
    lname.value.match(/^[A-Za-z ]+$/g)
      ? setValid(lname)
      : setInValid(lname)
  }))

  phone.addEventListener('click', phone.addEventListener('focusout',
  () =>{
    phone.value.match(/^[1-9][0-9]{9}$/g)
      ? setValid(phone)
      : setInValid(phone)
  }))

  rollCheck.addEventListener('change', () =>{
    if(!rollCheck.checked){
      email.setAttribute('disabled', ' ')
    }else{
      email.removeAttribute('disabled')
      email.addEventListener('click', email.addEventListener('focusout',
      () =>{
        email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/g)
          ? setValid(email)
          : setInValid(email)
      }))
      }
  })

  submitButton.addEventListener('click', () =>{
      desiredTeam.forEach((button) => {
        if(button.checked){setValid(submitButton); return}
        else{
          setInValid(submitButton);
        }
      })
  })

  function setValid(tag) {
    // tag.classList.remove('is-invalid');
    tag.classList.add('is-valid');
  }
  
  function setInValid(tag) {
    // tag.classList.remove('is-valid');
    tag.classList.add('is-invalid');
    tag.focus();
  }
});
