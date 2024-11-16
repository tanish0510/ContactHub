// // let contacts = []; // This will hold the contacts data

// // // Function to show the Add/Edit form (for both Add and Edit actions)
// // function showTab(tab) {
// //     document.getElementById('add-contact-form').style.display = (tab === 'add' || tab === 'edit') ? 'block' : 'none';
// //     document.getElementById('view-contacts-table').style.display = (tab === 'view') ? 'block' : 'none';
// // }

// // // Fetch all contacts to populate the table
// // function fetchContacts() {
// //     fetch('http://localhost:3000/contacts')
// //         .then(response => response.json())
// //         .then(data => {
// //             contacts = data; // Store the contacts data
// //             displayContacts(contacts); // Render all contacts initially
// //         })
// //         .catch(error => {
// //             console.error('Error fetching contacts:', error);
// //             alert('There was an error fetching contacts.');
// //         });
// // }

// // // Function to display contacts in the table
// // function displayContacts(filteredContacts) {
// //     const contactsList = document.getElementById("contacts-list");
// //     contactsList.innerHTML = ""; // Clear existing contacts

// //     filteredContacts.forEach(contact => {
// //         const row = document.createElement("tr");
// //         row.innerHTML = `
// //             <td>${contact.firstName}</td>
// //             <td>${contact.lastName}</td>
// //             <td>${contact.email}</td>
// //             <td>${contact.phone}</td>
// //             <td>${contact.company}</td>
// //             <td>${contact.jobTitle}</td>
// //             <td>
// //                 <button class="edit" onclick="editContact('${contact._id}')">✏️</button>
// //                 <button class="delete" onclick="deleteContact('${contact._id}')">🗑️</button>
// //             </td>
// //         `;
// //         contactsList.appendChild(row);
// //     });
// // }

// // // Function to search contacts
// // function searchContacts() {
// //     const searchInput = document.getElementById("searchInput").value.toLowerCase();
// //     const filteredContacts = contacts.filter(contact => {
// //         return (
// //             contact.firstName.toLowerCase().includes(searchInput) ||
// //             contact.lastName.toLowerCase().includes(searchInput) ||
// //             contact.email.toLowerCase().includes(searchInput) ||
// //             contact.company.toLowerCase().includes(searchInput)
// //         );
// //     });
// //     displayContacts(filteredContacts); // Re-render the filtered contacts
// // }

// // // Form submission handler for adding and editing contacts
// // document.getElementById('contact-form').addEventListener('submit', function(event) {
// //     event.preventDefault();

// //     const contactData = {
// //         firstName: document.getElementById('first-name').value,
// //         lastName: document.getElementById('last-name').value,
// //         email: document.getElementById('email').value,
// //         phone: document.getElementById('phone').value,
// //         company: document.getElementById('company').value,
// //         jobTitle: document.getElementById('job-title').value
// //     };

// //     // Check if the form has a contact ID (edit mode)
// //     const contactId = document.getElementById('contact-id').value;
// //     if (contactId) {
// //         // Edit mode - Skip checking for duplicates
// //         updateContact(contactId, contactData);
// //     } else {
// //         // Add mode - Check for duplicates
// //         checkForDuplicate(contactData.email, contactData.phone).then(isDuplicate => {
// //             if (isDuplicate) {
// //                 alert('Email or phone number already exists in the database.');
// //             } else {
// //                 // Create new contact
// //                 createNewContact(contactData);
// //             }
// //         }).catch(error => {
// //             console.error('Error checking for duplicates:', error);
// //             alert('There was an error checking for duplicates.');
// //         });
// //     }
// // });

// // // Function to check if email or phone already exists in the database
// // function checkForDuplicate(email, phone) {
// //     return new Promise((resolve, reject) => {
// //         // Fetch all contacts and check for duplicates
// //         fetch('http://localhost:3000/contacts')
// //             .then(response => response.json())
// //             .then(contacts => {
// //                 const duplicate = contacts.some(contact => contact.email === email || contact.phone === phone);
// //                 resolve(duplicate);
// //             })
// //             .catch(error => {
// //                 reject(error);
// //             });
// //     });
// // }

// // // Function to create a new contact
// // function createNewContact(contactData) {
// //     fetch('http://localhost:3000/contacts', {
// //             method: 'POST',
// //             headers: {
// //                 'Content-Type': 'application/json',
// //             },
// //             body: JSON.stringify(contactData),
// //         }).then(response => response.json())
// //         .then(data => {
// //             alert('Contact saved successfully!');
// //             showTab('view');
// //             fetchContacts(); // Refresh the contact list
// //         }).catch(error => {
// //             console.error('Error:', error);
// //             alert('There was an error saving the contact.');
// //         });
// // }

// // // Function to update an existing contact
// // function updateContact(contactId, contactData) {
// //     fetch(`http://localhost:3000/contacts/${contactId}`, {
// //             method: 'PUT',
// //             headers: {
// //                 'Content-Type': 'application/json',
// //             },
// //             body: JSON.stringify(contactData),
// //         }).then(response => response.json())
// //         .then(data => {
// //             alert('Contact updated successfully!');
// //             showTab('view');
// //             fetchContacts(); // Refresh the contact list
// //         }).catch(error => {
// //             console.error('Error:', error);
// //             alert('There was an error updating the contact.');
// //         });
// // }

// // // Edit contact function (opens the form with existing contact data)
// // function editContact(contactId) {
// //     fetch(`http://localhost:3000/contacts/${contactId}`)
// //         .then(response => response.json())
// //         .then(contact => {
// //             document.getElementById('form-title').innerText = 'Edit Contact';
// //             document.getElementById('contact-id').value = contact._id;
// //             document.getElementById('first-name').value = contact.firstName;
// //             document.getElementById('last-name').value = contact.lastName;
// //             document.getElementById('email').value = contact.email;
// //             document.getElementById('phone').value = contact.phone;
// //             document.getElementById('company').value = contact.company;
// //             document.getElementById('job-title').value = contact.jobTitle;
// //             showTab('edit'); // Show the form with pre-filled data
// //         })
// //         .catch(error => {
// //             console.error('Error:', error);
// //             alert('There was an error fetching the contact details.');
// //         });
// // }

// // // Delete contact
// // function deleteContact(contactId) {
// //     fetch(`http://localhost:3000/contacts/${contactId}`, {
// //             method: 'DELETE',
// //         }).then(response => response.json())
// //         .then(data => {
// //             alert('Contact deleted!');
// //             fetchContacts(); // Refresh the contact list
// //         }).catch(error => {
// //             console.error('Error:', error);
// //             alert('There was an error deleting the contact.');
// //         });
// // }

// // // Call the fetch function when the page loads
// // window.onload = fetchContacts;


let contacts = []; // This will hold the contacts data

// Function to show the Add/Edit form (for both Add and Edit actions)
function showTab(tab) {
    document.getElementById('add-contact-form').style.display = (tab === 'add' || tab === 'edit') ? 'block' : 'none';
    document.getElementById('view-contacts-table').style.display = (tab === 'view') ? 'block' : 'none';
    if (tab === 'add') resetForm(); // Reset form when in add mode
}

const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and tab contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Add active class to the clicked button and corresponding tab content
        button.classList.add('active');
        document.querySelector(`.tab-content.${button.dataset.tab}`).classList.add('active');
    });
});


// Function to reset the form fields
function resetForm() {
    document.getElementById('form-title').innerText = 'Add Contact';
    document.getElementById('contact-id').value = ''; // Clear hidden contact ID field
    document.getElementById('first-name').value = '';
    document.getElementById('last-name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('company').value = '';
    document.getElementById('job-title').value = '';
}

// Fetch all contacts to populate the table
function fetchContacts() {
    fetch('http://localhost:3000/contacts')
        .then(response => response.json())
        .then(data => {
            contacts = data; // Store the contacts data
            displayContacts(contacts); // Render all contacts
        })
        .catch(error => {
            console.error('Error fetching contacts:', error);
            alert('There was an error fetching contacts.');
        });
}

// Function to display contacts in the table
function displayContacts(filteredContacts) {
    const contactsList = document.getElementById('contacts-list');
    contactsList.innerHTML = ''; // Clear existing contacts

    filteredContacts.forEach(contact => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${contact.firstName}</td>
            <td>${contact.lastName}</td>
            <td>${contact.email}</td>
            <td>${contact.phone}</td>
            <td>${contact.company}</td>
            <td>${contact.jobTitle}</td>
            <td>
                <button class="edit" onclick="editContact('${contact._id}')">✏️</button>
                <button class="delete" onclick="deleteContact('${contact._id}')">🗑️</button>
            </td>
        `;
        contactsList.appendChild(row);
    });
}

// Function to search contacts
function searchContacts() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredContacts = contacts.filter(contact =>
        contact.firstName.toLowerCase().includes(searchInput) ||
        contact.lastName.toLowerCase().includes(searchInput) ||
        contact.email.toLowerCase().includes(searchInput) ||
        contact.company.toLowerCase().includes(searchInput)
    );
    displayContacts(filteredContacts); // Re-render the filtered contacts
}

// Form submission handler for adding and editing contacts
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const contactData = {
        firstName: document.getElementById('first-name').value.trim(),
        lastName: document.getElementById('last-name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        company: document.getElementById('company').value.trim(),
        jobTitle: document.getElementById('job-title').value.trim(),
    };

    // Check if the email or phone already exists in the database
    checkForDuplicate(contactData.email, contactData.phone).then(isDuplicate => {
        if (isDuplicate) {
            alert('Email or phone number already exists in the database.');
        } else {
            // Check if the form has a contact ID (edit mode)
            const contactId = document.getElementById('contact-id').value;
            if (contactId) {
                updateContact(contactId, contactData);
            } else {
                createContact(contactData);
            }
        }
    }).catch(error => {
        console.error('Error checking for duplicates:', error);
        alert('There was an error checking for duplicates.');
    });
});

// Function to check if email or phone already exists in the database
function checkForDuplicate(email, phone) {
    return new Promise((resolve, reject) => {
        const duplicate = contacts.some(contact => contact.email === email || contact.phone === phone);
        resolve(duplicate);
    });
}

// Create new contact
function createContact(contactData) {
    fetch('http://localhost:3000/contacts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(contactData),
        })
        .then(response => response.json())
        .then(() => {
            alert('Contact added successfully!');
            showTab('view');
            fetchContacts(); // Refresh contact list
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error saving the contact.');
        });
}

// Update existing contact
function updateContact(contactId, contactData) {
    fetch(`http://localhost:3000/contacts/${contactId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(contactData),
        })
        .then(response => response.json())
        .then(() => {
            alert('Contact updated successfully!');
            showTab('view');
            fetchContacts(); // Refresh contact list
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error updating the contact.');
        });
}

// Edit contact function (opens the form with existing contact data)
function editContact(contactId) {
    const contact = contacts.find(c => c._id === contactId);
    if (contact) {
        document.getElementById('form-title').innerText = 'Edit Contact';
        document.getElementById('contact-id').value = contact._id;
        document.getElementById('first-name').value = contact.firstName;
        document.getElementById('last-name').value = contact.lastName;
        document.getElementById('email').value = contact.email;
        document.getElementById('phone').value = contact.phone;
        document.getElementById('company').value = contact.company;
        document.getElementById('job-title').value = contact.jobTitle;
        showTab('edit'); // Show the form with pre-filled data
    }
}

// Delete contact
function deleteContact(contactId) {
    fetch(`http://localhost:3000/contacts/${contactId}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(() => {
            alert('Contact deleted!');
            fetchContacts(); // Refresh contact list
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error deleting the contact.');
        });
}

// Call the fetch function when the page loads
window.onload = fetchContacts;