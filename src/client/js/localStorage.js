function getItem() {
    return localStorage.getItem('travelApp.htmlContent');
}

function storeItem(event) {
    event.preventDefault();
    const generatedContent = document.getElementById('results').innerHTML;
    localStorage.setItem('travelApp.htmlContent', generatedContent);
}

function deleteItem(event) {
    event.preventDefault();
    localStorage.removeItem('travelApp.htmlContent');
    document.getElementById('results').innerHTML = null;
}

export { getItem, storeItem, deleteItem }