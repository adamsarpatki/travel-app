document.getElementById('button').addEventListener('click', handleSubmit);

function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let locationInput = document.getElementById('destination-input').value;
    let date = document.getElementById('date-input').value;
    console.log(date);
    fetch(`http://localhost:8081/locationInfo?location=${locationInput}&date=${date}`)
        .then(res => res.json())
        .then(function (res) {
            document.getElementById('results').innerHTML = generateHTML(res);
        })
}

function generateHTML(data) {
    return `<div id="location-photo"><img src="${data.imageURL}"></div>
            <div id="result-data">
                <div id="my-trip">My trip to ${data.location}.</div>
                <div id="departing">Departing at ${data.departure}.</div>
                <input class="buttons" id="save-button" type="button" value="Save trip" name="" onclick="return Client.storeItem(event)">
                <input class="buttons" id="delete-button" type="button" value="Delete trip" name="" onclick="return Client.deleteItem(event)">
                <div id="day-counter">This journey is ${data.days} days away.</div>
                <div id="typical-weather-title">The typical weather for then is:</div>
                <div id="typical-weather">High: ${data.weather.high}. Low: ${data.weather.low}.</div>
                <div id="weather-desc">${data.weather.general}.</div>
            </div>`
}


export { handleSubmit, generateHTML }
