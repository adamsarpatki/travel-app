import { handleSubmit, generateHTML } from './js/formHandler.js'
import { storeItem, deleteItem, getItem } from './js/localStorage.js'

import './styles/resets.scss'
import './styles/base.scss'
import './styles/buttons.scss'
import './styles/contents.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'

export { handleSubmit, storeItem, deleteItem, generateHTML, getItem }

document.getElementById('submit-button').addEventListener('click', handleSubmit);

document.addEventListener('DOMContentLoaded', function () {
    const trips = getItem()
    if (trips) {
        document.getElementById('results').innerHTML = trips;
    }
})