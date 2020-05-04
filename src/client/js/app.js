document.getElementById('button').addEventListener('click', handleSubmit);
// `http://api.geonames.org/search?q=${locationInput}&username=${db.username}`
function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let locationInput = document.getElementById('destination-input').value;
    let date = document.getElementById('date-input').value;
    console.log(date);
    fetch(`http://localhost:8081/travelInfo?location=${locationInput}&date=${date}`)
        .then(res => res.json())
        .then(function (res) {
            // Update HTML
            document.getElementById('location-photo').innerHTML = `<img src="${res.imageURL}">`
            document.getElementById('my-trip').innerHTML = `My trip to ${res.location}.`
            document.getElementById('departing').innerHTML = `Departing at ${res.departure}.`
            document.getElementById('day-counter').innerHTML = `This journey is ${res.days} days away.`
            document.getElementById('typical-weather').innerHTML = `High: ${res.weather.high}. Low: ${res.weather.low}.`
            document.getElementById('weather-desc').innerHTML = `${res.weather.general}.`
        })
}

export { handleSubmit }