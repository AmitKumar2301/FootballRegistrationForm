const form = document.getElementById('form');

const uname = document.getElementById('uname');

const retrieveButton = document.getElementById("retrieve-button");

const countries = document.getElementById("country");

const states = document.getElementById("state");

const cities = document.getElementById("city");

const fname = document.getElementById('fname');

const lname = document.getElementById('lname');

const dialCode = document.getElementById('dial-code')

const phone = document.getElementById('phone');

const email = document.getElementById('email');

const rollCheck = document.getElementById('roll-check');

const age = document.getElementById('age');

const address = document.getElementById('address');

const pincode = document.getElementById('pincode');

const desiredPositionDiv = document.getElementById('desired-position-div');

const desiredTeam = Array.from(document.getElementsByName('dteam'));

const desiredPosition = Array.from(document.getElementsByName('dPosition'));

const submitButton = document.getElementById('submit-button');

const desiredTeamDiv = document.getElementById('desired-team-div');

const updateButton = document.getElementById("update-button");

/**
 * 
 * @returns String value of checked desired team.
 */
function getSelectedTeam() {
    const team = desiredTeam.find((team) => team.checked);
    return team ? team.value : null;
}

/**
 * 
 * @returns String value of all positions which are selected
 */
function getSelectedPositions() {
    const positions = desiredPosition
        .filter(position => position.checked)
        .map(position => position.value)
        .join("-");
    return positions.length ? positions : null;
}

/**
 * 
 * @returns complete created address.
 */
function completeAddress() {
    const createdAddress = address.value + "^" + states.value + "^" + cities.value;
    return createdAddress.trim();
}