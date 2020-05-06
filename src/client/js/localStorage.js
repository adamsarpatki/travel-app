function getItem() {
    return localStorage.getItem('travelApp.htmlContent');
}

function storeItem(event) {
    event.preventDefault();
    const generatedContent = document.getElementById('results').innerHTML;
    localStorage.setItem('travelApp.htmlContent', generatedContent);
    document.getElementById('message').textContent = 'Trip successfully saved.';
}

function deleteItem(event) {
    event.preventDefault();
    localStorage.removeItem('travelApp.htmlContent');
    document.getElementById('results').innerHTML = null;
    document.getElementById('message').textContent = 'Trip successfully deleted.';
}

export { getItem, storeItem, deleteItem }