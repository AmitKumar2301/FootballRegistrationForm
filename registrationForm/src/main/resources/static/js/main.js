// These varriables used for checking the status of elements
let isunametrue = 0;
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
    countries.innerHTML = "";
    countriesData(dialCode.value);
  });

  // **First name validations with RegX
  fname.addEventListener(
    "click",
    fname.addEventListener("focusout", () => {
      if (fname.value.match(/^[A-Za-z]+$/g)) {
        setValid(fname);
        isfnametrue = 1;
        allFieldsValid();
      } else {
        isfnametrue = 0;
        setInValid(fname);
        allFieldsValid();
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

  /**
   * Phone number validations
   */
  phone.addEventListener(
    "click",
    phone.addEventListener("focusout", () => {
      if (phone.value.match(/^[1-9][0-9]{9}$/g)) {
        setValid(phone);
        isphonetrue = 1;
        allFieldsValid();
      } else {
        isphonetrue = 1;
        setInValid(phone);
        allFieldsValid();
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
            allFieldsValid();
          } else {
            isemailtrue = 0;
            setInValid(email);
          }
        })
      );
    }
  });

  // **desired team radio button velidation
  desiredTeam.forEach((dteam) => {
    dteam.addEventListener("change", () => {
      const team = desiredTeam.find((team) => team.checked);
      if (team) {
        isdteamtrue = 1;
        allFieldsValid();
        setValid(desiredTeamDiv);
      } else {
        isdteamtrue = 0;
        setInValid(desiredTeamDiv);
      }
    });
  });

  //** desired position validation
  desiredPosition.forEach((dpos) => {
    dpos.addEventListener("change", () => {
      const team = desiredPosition.find((position) => position.checked);
      if (team) {
        isdpositiontrue = 1;
        allFieldsValid();
        setValid(desiredPositionDiv);
      } else {
        isdpositiontrue = 0;
        setInValid(desiredPositionDiv);
      }
    });
  });

  /**
   * On change of cities check either country, states and cities field is not empty.
   */
  cities.addEventListener("change", () => {
    if (countries.value != "") {
      iscountrytrue = 1;
      setValid(countries);
      allFieldsValid();
    } else {
      iscountrytrue = 0;
      setInValid(countries);
    }

    if (states.value != "") {
      isstatetrue = 1;
      setValid(states);
      allFieldsValid();
    } else {
      isstatetrue = 0;
      setInValid(states);
    }

    if (cities.value != "") {
      iscitytrue = 1;
      setValid(cities);
      allFieldsValid();
    } else {
      iscitytrue = 0;
      setInValid(cities);
    }
  });

  submitButton.addEventListener("click", () => {
    addUser();
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
        ispincodetrue = 1;
        allFieldsValid();
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
  }

  function htmlEncode(str) {
    return String(str).replace(/[^\w. ]/gi, function (c) {
      return "&#" + c.charCodeAt(0) + ";";
    });
  }

  /**
   * Get data from server on the basis of user name
   */
  let timer;
  uname.addEventListener("input", () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (uname.value.match(/^[A-Za-z1-9]+$/g)) {
        setValid(uname);
        isunametrue = 1;
        allFieldsValid();
        getUserData(uname.value);
      } else {
        isunametrue = 0;
        setInValid(uname);
        allFieldsValid();
      }
    }, 800);
  });

  function allFieldsValid() {
    if (
      isunametrue &&
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
      submitButton.removeAttribute("disabled");
    }
  }

  /*
  **Onclick of retrive button all form data fill into the respective form fields
  **Like firstname lastname and other details.
  */
  retrieveButton.addEventListener("click", () => {
    fname.value = userData.data.fname;

    lname.value = userData.data.lname;

    dialCode.value = userData.data.dialCode;

    /*
     *again fetch all countries 
     */
    if (userData.data.dialCode != "") {
      fetch("https://countriesnow.space/api/v0.1/countries/codes")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          countries.innerHTML = "";
          data.data.map((country) => {
            let option = document.createElement("option");
            option.innerText = country.name;
            option.setAttribute("value", country.name);
            option.setAttribute("id", country.dial_code);
            countries.appendChild(option);
          });
          document
            .getElementById(userData.data.dialCode)
            .setAttribute("selected", "");
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

    /*
     *again fetch all states
     */
    fetch("https://countriesnow.space/api/v0.1/countries/states")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        data.data.map((country) => {
          if (country.name == countries.value) {
            states.innerHTML = "";
            country.states.map((state, index) => {
              let option = document.createElement("option");
              option.setAttribute("value", index);
              option.setAttribute("id", index);
              option.innerText = state.name;
              states.appendChild(option);
            });
          }
          states.value = addressSplit[1];
        });

        let cityPayload = {
          country: countries.value,
          state: states.options[states.selectedIndex].text,
        };

        /* 
        * Fetch the cities from api
        */
        fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cityPayload),
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
        cities.removeAttribute("disabled");
        cities.value = addressSplit[2];
      });

    pincode.value = userData.data.pincode;

    submitButton.setAttribute("disabled", " ");
    submitButton.setAttribute("hidden", " ");

    updateButton.removeAttribute("disabled");
    updateButton.removeAttribute("hidden");
  });

  updateButton.addEventListener("click", () => {
    updateUser(uname.value);
  });
});
