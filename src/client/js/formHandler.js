function handleSubmit(event) {
    event.preventDefault()

    if (!validateForm()) {
        return
    }

    // Getting date and travel destination from the form fields
    let locationInput = document.getElementById('destination-input').value;
    let date = document.getElementById('date-input').value;
    fetch(`http://localhost:8081/locationInfo?location=${locationInput}&date=${date}`)
        .then(res => res.json())
        .then(function (res) {
            if (res.success === false) { // This gives back an error message if the date is not in 16 days
                document.getElementById('message').innerHTML = res.message;
            } else { // Clears any messages and calls generateHTML()
                document.getElementById('message').innerHTML = null;
                document.getElementById('results').innerHTML = generateHTML(res);
            }
        })
}
// Function to generate HTML from the collected data
function generateHTML(data) {
    return `<div id="location-photo"><img src="${data.imageURL}"></div>
            <div id="result-data">
                <div id="my-trip">My trip to ${data.location}, ${data.country}.</div>
                <div id="departing">Departing at ${data.departure}.</div>
                <input class="buttons" id="save-button" type="button" value="Save trip" name="" onclick="return Client.storeItem(event)">
                <input class="buttons" id="delete-button" type="button" value="Delete trip" name="" onclick="return Client.deleteItem(event)">
                <div id="day-counter">This journey is ${data.days} days away.</div>
                <div id="typical-weather-title">The typical weather for then is:</div>
                <div id="typical-weather">High: ${data.weather.high}. Low: ${data.weather.low}.</div>
                <div id="weather-desc">${data.weather.general}.</div>
            </div>`
}

function validateForm() {
    const destination = document.forms["input-form"]["destination-input"].value;
    const date = document.forms["input-form"]["date-input"].value;
    if (destination === "" || date === "") {
      alert("Please fill out both fields.");
      return false
    }
  }

export { handleSubmit, generateHTML }
