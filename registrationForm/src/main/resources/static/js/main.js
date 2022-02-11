// These varriables used for checking the status of elements
let isfnametrue = 0;
let islnametrue = 1;
let isphonetrue = 0;
let isemailtrue = 0;
let isagetrue = 1;
let isdteamtrue = 0;
let isdpositiontrue = 0;
let isaddresstrue = 1;
let ispincodetrue = 1;
let iscountrytrue = 0;
let isstatetrue = 0;
let iscitytrue = 0;

// starts when document is load successfully
window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('form');
  const countries = document.querySelector("#country");
  // console.log(countries);
  const states = document.querySelector("#state");
  const cities = document.querySelector("#city");
  const uname = document.getElementById('uname')
  const fname = document.getElementById('fname');
  const lname = document.getElementById('lname');
  const phone = document.getElementById('phone');
  const email = document.getElementById('email');
  const rollCheck = document.getElementById('roll-check');
  const age = document.getElementById('age');
  const address = document.getElementById('address');
  const pincode = document.getElementById('pincode');
  const desiredPositionDiv = document.getElementById('desired-position-div');
  const desiredTeam = document.querySelectorAll('input[name="dteam"]');
  const desiredPosition = document.querySelectorAll('input[name="dPosition"]');
  const submitButton = document.getElementById('submit-button');
  const desiredTeamDiv = document.getElementById('desired-team-div');

  // Fetch the countries from api
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

    // Fetch states from api
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

    // Fetch the cities from api
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

  // const uNameValidation = () => {

  // }

  // **First name validations with RegX

  fname.addEventListener('click', fname.addEventListener('focusout', () => {
    if (fname.value.match(/^[A-Za-z]+$/g)) {
      setValid(fname)
      isfnametrue = 1;
    }
    else {
      setInValid(fname)
      // isfnametrue = 0;
    }
  }))

  // Last name validations
  lname.addEventListener('click', lname.addEventListener('focusout',
    () => {
      if (lname.value == "") { }
      else
        if (lname.value.match(/^[A-Za-z ]+$/g)) {
          setValid(lname)
        }
        else {
          setInValid(lname)
          islnametrue = 0;
        }
    }))

  phone.addEventListener('click', phone.addEventListener('focusout',
    () => {
      if (phone.value.match(/^[1-9][0-9]{9}$/g)) {
        setValid(phone);
        isphonetrue = 1;
      }
      else {
        setInValid(phone)
        // alltrue = 0;
      }
    }))

  // Checks roll check box
  rollCheck.addEventListener('change', () => {
    if (!rollCheck.checked) {
      email.setAttribute('disabled', ' ')
      rollCheck.removeAttribute('style','background-color: #28a747;');
    } else {
      email.removeAttribute('disabled')
      rollCheck.setAttribute('style','background-color: #28a747;');
      // check email validations
      email.addEventListener('click', email.addEventListener('focusout',
        () => {
          if (email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/g)) {
            setValid(email)
            isemailtrue = 1;
          }
          else
            setInValid(email);
        }))
    }
  })

  // Some events fire when submit button click
  submitButton.addEventListener('click', () => {
    if (fname.value == "") setInValid(fname);
    if (phone.value == "") setInValid(phone)
    if (email.value == "") setInValid(email);
    if (age.value == "") setInValid(age);

    // **desired team radio button velidation
    let check = 0;
    for (let i = 0; i < desiredTeam.length; i++) {
      if (desiredTeam[i].checked) {
        // setValid(desiredTeamDiv);
        check = 0;
        isdteamtrue = 1;
        break;
      }
      else {
        check = 1;
        // alltrue = 0;
      }
    }
    if (check == 1) setInValid(desiredTeamDiv)
    else setValid(desiredTeamDiv);

    //** desired position validation
    check = 0;
    for (let i = 0; i < desiredPosition.length; i++) {
      // console.log(desiredPosition[i].checked)
      if (desiredPosition[i].checked) {
        // setValid(desiredTeamDiv);
        check = 0;
        isdpositiontrue = 1;
        break;
      }
      else {
        check = 1;
        // alltrue = 0;
      }
    }
    if (check == 1) setInValid(desiredPositionDiv)
    else setValid(desiredPositionDiv);

    for (let i = 0; i < countries.length; i++) {
      if (!countries[0]) {
        iscountrytrue = 1;
        setValid(countries);
        break;
      }
      else
        setInValid(countries);
    }
    for (let i = 0; i < states.length; i++) {
      if (!states[0]) {
        isstatetrue = 1;
        setValid(states);
        break;
      }
      else
        setInValid(states);
    }
    for (let i = 0; i < cities.length; i++) {
      if (!cities[0]) {
        iscitytrue = 1;
        setValid(cities);
        break;
      }
      else
        setInValid(cities);
    }
    console.log(countries);
    // If all the fields send true status then it works
    sendData();
    if (isfnametrue && islnametrue && isphonetrue && isemailtrue && isagetrue && isdteamtrue && isdpositiontrue && isaddresstrue && ispincodetrue) {
      submitButton.classList.remove('button-disable');
      submitButton.classList.add('button');
      // submitButton.setAttribute("type", "submit");
    }
  })

  address.addEventListener('click', address.addEventListener('focusout',
    () => {
      address.innerHTML = htmlEncode(address.value);
    }))

  pincode.addEventListener('click', pincode.addEventListener('focusout',
    () => {
      if (pincode.value == "") { }
      else
        if (pincode.value.match(/^[1-9][0-9]{5}$/g)) {
          setValid(pincode)
        }
        else {
          setInValid(pincode)
          ispincodetrue = 0;
        }
    }))


  // Used for set the bootsrap validation class to the element if its valid
  function setValid(tag) {
    tag.classList.remove('is-invalid');
    tag.classList.add('is-valid');
  }

  // Used for set the bootsrap validation class to the element if its not valid
  function setInValid(tag) {
    tag.classList.remove('is-valid');
    tag.classList.add('is-invalid');
    // tag.focus();
  }

  function htmlEncode(str) {
    return String(str).replace(/[^\w. ]/gi, function (c) {
      return '&#' + c.charCodeAt(0) + ';';
    });
  }
// let muname = "amit1"
//   submitButton.addEventListener("click", sendData);
//   function sendData(){
//     let payload = {
//       uname:muname,
//     fname:Amit,
//     lname:Kumar,
//     phone:9658460879,
//     email:ramitramit.com,
//     ageGroup:1420,
//     desiredTeam:Chelsia,
//     desiredPosition:offensive,
//     address:ynr,
//     pincode:185400
//     };
//     fetch("http://localhost:8080/api/v1/formdata", {
//       method: "POST",
//       headers: {
//         // 'Accept': 'application/json',
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(payload)
//     }).then((response) => response.json()).then((data) => {
//       console.log(data);})
//   }

});
