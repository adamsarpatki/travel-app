import { handleSubmit, generateHTML } from './js/formHandler.js'
import { storeItem, deleteItem, getItem } from './js/localStorage.js'

import './styles/resets.scss'
import './styles/base.scss'
import './styles/buttons.scss'
import './styles/contents.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'
import './media-queries/base-media.scss'
import './media-queries/contents-media.scss'
import './media-queries/form-media.scss'
import './media-queries/footer-media.scss'
import './media-queries/header-media.scss'

export { handleSubmit, storeItem, deleteItem, generateHTML, getItem }

document.getElementById('submit-button').addEventListener('click', handleSubmit);

document.addEventListener('DOMContentLoaded', function () {
    const trips = getItem()
    if (trips) {
        document.getElementById('results').innerHTML = trips;
    }
})