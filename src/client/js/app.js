document.getElementById('button').addEventListener('click', handleSubmit);
// `http://api.geonames.org/search?q=${locationInput}&username=${db.username}`
function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let locationInput = document.getElementById('destination-input').value
    
    fetch(`http://localhost:8081/locationInfo?location=${locationInput}`)
    .then(res => res.json())
    .then(function(res) {
        // document.getElementById('results').innerHTML = generateMessage(res);
        console.log(res)
    })
}

export { handleSubmit }