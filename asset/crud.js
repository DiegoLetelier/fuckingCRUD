// Define an array to hold all the fuckers
let fuckersList = [];

// Define an object to hold information about each individual fucker
const objFucker = {
  id: '',
  name: '',
  lastName: '',
  age: '',
  email: ''
};

// Set initial editing status to false
let editing = false;

// Get references to all the relevant DOM elements
const userform = document.getElementById('userForm'); 
const nameInput = document.getElementById('name');
const lastNameInput = document.getElementById('lastName');
const ageInput = document.getElementById('age');
const emailInput = document.getElementById('email');
const addBtn = document.getElementById('addBtn');
const registeredContainer = document.querySelector('.registered-container');
let noInput = false

if (fuckersList.length === 0) {
  // If the fuckersList is empty, display a message indicating as much
  const registered = document.querySelector('#registeredList');
  const noFuckersMsg = document.createElement('p');
  noFuckersMsg.textContent = 'No fuckers registered yet';
  registered.appendChild(noFuckersMsg);
} 


const formValidate = (e) => {
  // Prevent the form from submitting
  e.preventDefault();

 

  // Check if there is info in all the inputs
  const noInput = !nameInput.value || !lastNameInput.value || !ageInput.value || !emailInput.value;
  
  if (noInput) {
    alert('Please fill out all fucking fields before submitting');
    return;

  }  else if (editing) {
    // Editing an existing fucker
    editFucker()
    editing = false;
  } else {
    // Create a new fucker object and add it to the fuckersList array
    objFucker.id = Date.now();
    objFucker.name = nameInput.value;
    objFucker.lastName = lastNameInput.value;
    objFucker.age = ageInput.value;
    objFucker.email = emailInput.value;
    fuckersList.push({ ...objFucker });
    // Display the updated list of fuckers
    displayFuckers();
  } 
  
   
}


// chat gpt version edit fucker 

const editFucker = () => {
  const id = objFucker.id;
  const editedFuckerIndex = fuckersList.findIndex(fucker => fucker.id === id);
  if (editedFuckerIndex === -1) {
    console.log('Cannot find edited fucker in the list');
    return;
  }
  
  const editedFucker = {
    ...fuckersList[editedFuckerIndex],
    name: nameInput.value,
    lastName: lastNameInput.value,
    age: ageInput.value,
    email: emailInput.value,
  };
  
  fuckersList[editedFuckerIndex] = editedFucker;
  editing = false;
  
  const submitButton = document.querySelector('button[type="submit"]');
  if(submitButton) {
    submitButton.textContent = 'Add Fucker';
  }
  
  displayFuckers();
  clearInputs();
};



// My version of edit fucker----

// const editFucker = () => {
//   console.log(fuckersList);
//   const id = objFucker.id;
//   const editedFucker = fuckersList.find(fucker => fucker.id === id)
//   if(editedFucker) {
//     editedFucker.name = nameInput.value;
//     editedFucker.lastName = lastNameInput.value;
//     editedFucker.age = ageInput.value;
//     editedFucker.email = emailInput.value;
  
//   }
 

//   console.log(fuckersList);
  
//   const submitButton = document.querySelector('button[type="submit"]');
//   if(submitButton) {
//     submitButton.textContent = 'send';
//   }
  
//   displayFuckers();
//   clearInputs();
// }


// Display all fuckers in the fuckersList array
const displayFuckers = () => {


  // Clear out the current list of fuckers
  
 
  registered.innerHTML = '';

  if (fuckersList.length === 0) {
    // If the fuckersList is empty, display a message indicating as much
    const noFuckersMsg = document.createElement('p');
    noFuckersMsg.textContent = 'No fuckers registered yet';
    registered.appendChild(noFuckersMsg);
  } else {

      // set the height of the fuckersList Container deppending on list items

    const computedStyle = getComputedStyle(registeredContainer);
    const paddingHeight = parseInt(computedStyle.paddingTop) + parseInt(computedStyle.paddingBottom);
    const borderHeight = parseInt(computedStyle.borderTopWidth) + parseInt(computedStyle.borderBottomWidth);
    const marginHeight = parseInt(computedStyle.marginTop) + parseInt(computedStyle.marginBottom);
    const listHeight = registered.scrollHeight / 16 - paddingHeight / 16 - borderHeight / 16 - marginHeight / 16;
    registeredContainer.style.height = `${listHeight}em`;
    console.log(listHeight);

    // Iterate over the fuckersList array, creating DOM elements to display each fucker
    fuckersList.forEach(fucker => {
      const { id, name, lastName, age, email } = fucker;
      const documentDisplay = document.createElement('p');
      documentDisplay.textContent = ` - ${name} - ${lastName} - ${age} - ${email} -`;
      documentDisplay.dataset.id = id;

      const btnEdit = document.createElement('button');
      btnEdit.textContent = 'edit';
      btnEdit.classList.add('btn', 'btn-edit');
      documentDisplay.append(btnEdit);

      const btnDelete = document.createElement('button');
      btnDelete.textContent = 'delete';
      btnDelete.classList.add('btn', 'btn-delete');
      documentDisplay.append(btnDelete);

      registered.append(documentDisplay, document.createElement('hr'));
    });
  }
}

// Remove a fucker from the fuckersList array by ID
const deleteFucker = (id) => {
  fuckersList = fuckersList.filter(fucker => fucker.id !== id);
  // Display the updated list of fuckers
  displayFuckers();
}

// Initialize the form submit event listener
userform.addEventListener('submit', formValidate);

// Initialize the click event listener for edit and delete buttons
const registered = document.querySelector('#registeredList');

registered.addEventListener('click', e => {
  if (e.target.classList.contains('btn-edit')) {
    // Edit the corresponding fucker
    const id = e.target.parentElement.dataset.id;
    const fucker = fuckersList.find(fucker => fucker.id == id);

    // Fill the form with the data of the selected fucker
    
    nameInput.value = fucker.name;
    lastNameInput.value = fucker.lastName;
    ageInput.value = fucker.age;
    emailInput.value = fucker.email;

    // set the id 

    
    console.log(id)
    // Set editing flag to true
    userform.querySelector('button[type="submit"]').textContent='edit'
    editing = true;
    
    
   
    

  } else if (e.target.classList.contains('btn-delete')) {
    // Delete the corresponding fucker
    const id = e.target.parentElement.dataset.id;
    const deletedFucker = fuckersList.find(fucker => fucker.id == id);

    const confirmDelete = confirm(`Are you sure you want to delete this fucker:  ${deletedFucker.name} ${deletedFucker.lastName}?`);
    if (confirmDelete) {
      fuckersList = fuckersList.filter(fucker => fucker.id != id);
      displayFuckers();
    }
  }
});

// Clear the form inputs
const clearInputs = () => {
  nameInput.value = '';
  lastNameInput.value = '';
  ageInput.value = '';
  emailInput.value = '';
};

// Add event listener to the clear button
// clearBtn.addEventListener('click', () => {
//   clearInputs();
//   editing = false;
// });

// Add event listener to the search button
// searchBtn.addEventListener('click', () => {
//   const searchTerm = searchInput.value.trim().toLowerCase();

//   if (searchTerm !== '') {
//     const filteredFuckers = fuckersList.filter(fucker => {
//       return (
//         fucker.name.toLowerCase().includes(searchTerm) ||
//         fucker.lastName.toLowerCase().includes(searchTerm) ||
//         fucker.email.toLowerCase().includes(searchTerm)
//       );
//     });

//     if (filteredFuckers.length > 0) {
//       displayFuckers(filteredFuckers);
//     } else {
//       alert(`No fuckers found with the search term '${searchTerm}'`);
//     }
//   }
// });

   
  

