function storeResults(event) {
    event.preventDefault();
    const generatedContent = document.getElementById('results').innerHTML;
    localStorage.setItem('htmlContent', generatedContent);
    console.log(localStorage);
}

export { storeResults }