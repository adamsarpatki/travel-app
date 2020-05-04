function deleteResults(event) {
    event.preventDefault();
    localStorage.clear();
    console.log(localStorage);
}

export { deleteResults }