document.getElementById('button').addEventListener('click', handleSubmit);
// `http://api.geonames.org/search?q=${locationInput}&username=${db.username}`
function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let locationInput = document.getElementById('destination-input').value;
    let date = document.getElementById('date-input').value;
    console.log(date);
    fetch(`http://localhost:8081/locationInfo?location=${locationInput}&date=${date}`)
        .then(res => res.json())
        .then(function (res) {
            // Update HTML
            document.getElementById('results').innerHTML =
                `<div id="location-photo"><img src="${res.imageURL}"></div>
                <div id="result-data">
                    <div id="my-trip">My trip to ${res.location}.</div>
                    <div id="departing">Departing at ${res.departure}.</div>
                    <input class="buttons" id="save-button" type="button" value="Save trip" name="" onclick="return Client.storeResults(event)">
                    <input class="buttons" id="delete-button" type="button" value="Delete trip" name="" onclick="return Client.deleteResults(event)">
                    <div id="day-counter">This journey is ${res.days} days away.</div>
                    <div id="typical-weather-title">The typical weather for then is:</div>
                    <div id="typical-weather">High: ${res.weather.high}. Low: ${res.weather.low}.</div>
                    <div id="weather-desc">${res.weather.general}.</div>
                </div>`
        })
}

export { handleSubmit }