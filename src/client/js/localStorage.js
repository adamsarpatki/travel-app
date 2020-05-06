function getItem() {
    return localStorage.getItem('travelApp.htmlContent');
}

function storeItem(event) {
    event.preventDefault();
    const generatedContent = document.getElementById('results').innerHTML;
    localStorage.setItem('travelApp.htmlContent', generatedContent);
    const response = document.createElement('div');
    response.textContent = 'Trip saved successfully.';
    document.getElementById('results').appendChild(response);
}

function deleteItem(event) {
    event.preventDefault();
    localStorage.removeItem('travelApp.htmlContent');
    document.getElementById('results').innerHTML = null;
}

export { getItem, storeItem, deleteItem }