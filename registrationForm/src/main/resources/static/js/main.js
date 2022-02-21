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
  //Fetch coutries code from api
  fetch("https://countriesnow.space/api/v0.1/countries/codes")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      data.data.map((code) => {
        let option = document.createElement("option");
        option.innerText = code.dial_code + " - " + code.name;
        option.setAttribute("value", code.dial_code);
        option.setAttribute("id", code.dial_code + "1");
        dialCode.appendChild(option);
        if (code.dial_code == "+91") {
          document.getElementById("+911").setAttribute("selected", "");
        }
      });
      countriesData(dialCode.value);
    });

  // Fetch the countries from api

  dialCode.addEventListener("change", () => {
    countries.innerHTML="";
    countriesData(dialCode.value);
  });

  // const uNameValidation = () => {

  // }

  // **First name validations with RegX

  fname.addEventListener(
    "click",
    fname.addEventListener("focusout", () => {
      if (fname.value.match(/^[A-Za-z]+$/g)) {
        setValid(fname);
        isfnametrue = 1;
      } else {
        setInValid(fname);
      }
    })
  );

  // Last name validations
  lname.addEventListener(
    "click",
    lname.addEventListener("focusout", () => {
      if (lname.value == "") {
      } else if (lname.value.match(/^[A-Za-z ]+$/g)) {
        setValid(lname);
      } else {
        setInValid(lname);
        islnametrue = 0;
      }
    })
  );

  phone.addEventListener(
    "click",
    phone.addEventListener("focusout", () => {
      if (phone.value.match(/^[1-9][0-9]{9}$/g)) {
        setValid(phone);
        isphonetrue = 1;
      } else {
        setInValid(phone);
      }
    })
  );

  // Checks roll check box
  rollCheck.addEventListener("change", () => {
    if (!rollCheck.checked) {
      email.setAttribute("disabled", " ");
      rollCheck.removeAttribute("style", "background-color: #28a747;");
    } else {
      email.removeAttribute("disabled");
      rollCheck.setAttribute("style", "background-color: #28a747;");

      // check email validations
      email.addEventListener(
        "click",
        email.addEventListener("focusout", () => {
          if (email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/g)) {
            setValid(email);
            isemailtrue = 1;
          } else setInValid(email);
        })
      );
    }
  });

  // Some events fire when submit button click
  submitButton.addEventListener("click", () => {
    if (fname.value == "") setInValid(fname);
    if (phone.value == "") setInValid(phone);
    if (email.value == "") setInValid(email);
    if (age.value == "") setInValid(age);

    // **desired team radio button velidation
    let check = 0;
    for (let i = 0; i < desiredTeam.length; i++) {
      if (desiredTeam[i].checked) {
        check = 0;
        isdteamtrue = 1;
        break;
      } else {
        check = 1;
      }
    }
    if (check == 1) setInValid(desiredTeamDiv);
    else setValid(desiredTeamDiv);

    //** desired position validation
    check = 0;
    for (let i = 0; i < desiredPosition.length; i++) {
      if (desiredPosition[i].checked) {
        check = 0;
        isdpositiontrue = 1;
        break;
      } else {
        check = 1;
      }
    }

    if (check == 1) setInValid(desiredPositionDiv);
    else setValid(desiredPositionDiv);

    if (countries.value != "") {
      iscountrytrue = 1;
      setValid(countries);
    } else setInValid(countries);

    if (states.value != "") {
      isstatetrue = 1;
      setValid(states);
    } else setInValid(states);

    if (cities.value != "") {
      iscitytrue = 1;
      setValid(cities);
    } else setInValid(cities);

    // getUserData(uname.value);
    // If all the fields send true status then it works
    if (
      isfnametrue &&
      islnametrue &&
      isphonetrue &&
      isemailtrue &&
      isagetrue &&
      isdteamtrue &&
      isdpositiontrue &&
      isaddresstrue &&
      ispincodetrue
    ) {
      submitButton.classList.remove("button-disable");
      submitButton.classList.add("button");
      addUser();
    }
  });

  //address field validation
  address.addEventListener(
    "click",
    address.addEventListener("focusout", () => {
      address.innerHTML = htmlEncode(address.value);
    })
  );

  //Pincode validations
  pincode.addEventListener(
    "click",
    pincode.addEventListener("focusout", () => {
      if (pincode.value == "") {
        pincode.classList.remove("is-invalid");
      } else if (pincode.value.match(/^[1-9][0-9]{5}$/g)) {
        setValid(pincode);
      } else {
        setInValid(pincode);
        ispincodetrue = 0;
      }
    })
  );

  // Used for set the bootsrap validation class to the element if its valid
  function setValid(tag) {
    tag.classList.remove("is-invalid");
    tag.classList.add("is-valid");
  }

  // Used for set the bootsrap validation class to the element if its not valid
  function setInValid(tag) {
    tag.classList.remove("is-valid");
    tag.classList.add("is-invalid");
    // tag.focus();
  }

  function htmlEncode(str) {
    return String(str).replace(/[^\w. ]/gi, function (c) {
      return "&#" + c.charCodeAt(0) + ";";
    });
  }

  uname.addEventListener("click", () => {
    uname.addEventListener("focusout", () => {
      getUserData(uname.value);
    });
  });

  retrieveButton.addEventListener("click", () => {
    fname.value = userData.data.fname;

    lname.value = userData.data.lname;

    dialCode.value = userData.data.dialCode;

    if (userData.data.dialCode != "")
    {
      fetch("https://countriesnow.space/api/v0.1/countries/codes")
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            countries.innerHTML="";
            data.data.map((country) => {
                let option = document.createElement("option");
                option.innerText = country.name;
                option.setAttribute("value", country.name);
                option.setAttribute("id", country.dial_code)
                countries.appendChild(option);
            });
            document.getElementById(userData.data.dialCode).setAttribute("selected", "");
            countries.removeAttribute("disabled");
          });
    }

    phone.value = userData.data.phone;

    rollCheck.setAttribute("checked", " ");

    email.removeAttribute("dissabled");

    email.value = userData.data.email;

    age.value = userData.data.ageGroup;

    desiredTeam.find(
      (team) => team.value === userData.data.desiredTeam
    ).checked = true;

    desiredPosition.forEach((position) => (position.checked = false));
    let uvalue = userData.data.desiredPosition.split("-");
    for (let i = 0; i < uvalue.length; i++) {
      desiredPosition.find((pos) => pos.value === uvalue[i]).checked = true;
    }

    let addressSplit = userData.data.address.split("^");
    address.value = addressSplit[0];

    fetch("https://countriesnow.space/api/v0.1/countries/states")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        data.data.map((country) => {
          if (country.name == countries.value) {
            // console.log(country.name);
            states.innerHTML = "";
            country.states.map((state, index) => {
              // console.log(state.name);
              let option = document.createElement("option");
              option.setAttribute("value", index);
              option.setAttribute("id", index);
              option.innerText = state.name;
              states.appendChild(option);
            });
          }
          // states.removeAttribute("disabled");
          states.value = addressSplit[1];
        });

        let cityPayload = {
          country: countries.value,
          state: states.options[states.selectedIndex].text
        }
        // Fetch the cities from api
        fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cityPayload)
        })
          .then((response) => response.json())
          .then((data) => {
            cities.innerHTML = "";
            data.data.map((city, index) => {
              console.log(city);
              let option1 = document.createElement("option");
              option1.setAttribute("value", index);
              option1.setAttribute("id", index);
              option1.innerText = city;
              cities.appendChild(option1);
            });
          });
        cities.removeAttribute('disabled');
        cities.value = addressSplit[2];
      });

    pincode.value = userData.data.pincode;

    submitButton.setAttribute("disabled", " ");
    submitButton.setAttribute("hidden", " ");
    
    updateButton.removeAttribute("disabled");
    updateButton.removeAttribute("hidden");
  });

  updateButton.addEventListener("click", () =>
  {
    updateUser(uname.value);
  })

});
