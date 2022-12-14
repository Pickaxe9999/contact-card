import '../css/index.css';
import {Tooltip, Toast, Popover} from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { initdb,postDb,deleteDb,editDb } from "./database";
import {fetchCards} from "./card";
import { toggleForm, clearForm } from "./form";


import Logo from '../images/logo.png';
import Bear from '../images/bear.png';
import Dog from '../images/dog.png';

const installBtn = document.getElementById('installBtn');

window.addEventListener('load', function() {
    initdb();
    fetchCards();
    document.getElementById('logo').src = Logo;
    document.getElementById('bearThumbnail').src = Bear;
    document.getElementById('dogThumbnail').src = Dog;
})

// Form functionality
const form = document.getElementById("formToggle");
const newContactButton = document.getElementById("new-contact");
let submitBtnToUpdate = false;
let profileId;

newContactButton.addEventListener('click', event => {
toggleForm()
})

form.addEventListener('submit', event => {
    // Handle data
    event.preventDefault();
    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    let profile = document.querySelector('input[type="radio"]:checked').value;

    // Post form data to IndexedDB OR Edit an existing card in IndexedDB
    if (submitBtnToUpdate == false) {
        postDb(name, email, phone, profile);
    } else {

        // Obtains values passed into the form element
    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    let profile = document.querySelector('input[type="radio"]:checked').value;

    editDb(profileId, name, email, phone, profile)

        fetchCards();
            // Toggles the submit button back to POST functionality
        submitBtnToUpdate = false;
    }

    // Clear form
    clearForm();
    // Toggle form
    toggleForm();
    // Reload the DOM
    fetchCards();
});

window.deleteCard = (e) => {
    // Grabs the id from the button element attached to the contact card.
    let id = parseInt(e.id);
    // Delete the card
    deleteDb(id);

    fetchCards();
};

window.editCard = (e) => {
    profileId = parseInt(e.dataset.id);

    let editName = e.dataset.name;
    let editEmail = e.dataset.email;
    let editPhone = e.dataset.phone;

    document.getElementById('name').value = editName;
    document.getElementById('email').value = editEmail;
    document.getElementById('phone').value = editPhone;

    form.style.display = "block";

    submitBtnToUpdate = true;
}

//register service worker
if('serviceWorker' in Navigator){
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
    })
}

window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    installBtn.style.visibility = 'visible';
});

installBtn.addEventListener('click', () => {
    installBtn.setAttribute('disabled', true);
    installBtn.textContent = 'Installed!';
});

window.addEventListener('appinstalled', (event) => {
    console.log('????', 'appinstalled', event);
});