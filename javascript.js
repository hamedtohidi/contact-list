const contactsUl = document.querySelector('.contact ul')
const inputSubmit = document.querySelector('.submit')

const nameInput = document.querySelector('#fname')
const emailInput = document.querySelector('#email')
const phoneInput = document.querySelector('#phone')
let currentContactIndex = null;
let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

function renderContact(value, index) {
    const spanName = document.createElement('span')
    spanName.innerText = value.name
    spanName.classList.add('name')

    const spanPhone = document.createElement('span')
    spanPhone.innerText = value.phone
    spanPhone.classList.add('phone')

    const spanEmail = document.createElement('span')
    spanEmail.innerText = value.email
    spanEmail.classList.add('email')

    const spanUpdate = document.createElement('button')
    spanUpdate.textContent = 'update';
    spanUpdate.classList.add('update')
    spanUpdate.addEventListener('click', function (e) {
        e.preventDefault();
        currentContactIndex = index;
        nameInput.value = value.name;
        emailInput.value = value.email;
        phoneInput.value = value.phone;
    });
    const spanDelete = document.createElement('button')
    spanDelete.textContent = 'delete';
    spanDelete.classList.add('delete')
    spanDelete.addEventListener('click', function (e) {
        e.preventDefault()
        const index = contacts.findIndex(function (contact) {
            return contact.name == value.name
        })
        contacts.splice(index, 1)
        renderContacts()
    })

    const li = document.createElement('li')
    li.appendChild(spanName)
    li.appendChild(spanEmail)
    li.appendChild(spanPhone)
    li.appendChild(spanUpdate)
    li.appendChild(spanDelete)

    return li
}

/*

contacts = [
    0 => {
        name: 'mahshed',
        phone: '090925345',
        email: 'hamed',
    },
    1 => {
        name: 'kjl',
        phone: '090925347',
        email: 'hame',
    },
]

*/

function renderContacts() {
    contactsUl.innerHTML = '';
    // for ( initialization ; condition ; step )
    // for (let i = 0; i < contacts.length; i++) {
    // for (let contact of contacts) {
    for (let i in contacts) {
        const li = renderContact(contacts[i], i);
        contactsUl.appendChild(li);
    }
}

renderContacts()

inputSubmit.addEventListener('click', function (e) {
    e.preventDefault();
    if (nameInput.value && phoneInput.value && emailInput.value) {
        const Contact = {
            name: nameInput.value,
            phone: phoneInput.value,
            email: emailInput.value,
        };

        if (currentContactIndex !== null) {
            contacts[currentContactIndex] = Contact;
            currentContactIndex = null;
        } else {
            contacts.push(Contact);
        }
        localStorage.setItem('contacts', JSON.stringify(contacts));

        renderContacts();
    }

    nameInput.value = '';
    emailInput.value = '';
    phoneInput.value = '';
});
