let fuckersList = [];

const objFucker = {
  id: '',
  name: '',
  lastName: '',
  age: '',
  email: ''
};

let editing = false;

const userform = document.querySelector('#userForm');
const nameInput = document.querySelector('#name');
const lastNameInput = document.querySelector('#lastName');
const ageInput = document.querySelector('#age');
const emailInput = document.querySelector('#email');
const addBtn = document.querySelector('#addBtn');

const formValidate = (e) => {
  e.preventDefault();

  if (!nameInput.value || !lastNameInput.value || !ageInput.value || !emailInput.value) {
    alert('All fields are mandatory.');
    return;
  }

  if (editing) {
    // Editing Fucker
    editing = false;
  } else {
    objFucker.id = Date.now();
    objFucker.name = nameInput.value;
    objFucker.lastName = lastNameInput.value;
    objFucker.age = ageInput.value;
    objFucker.email = emailInput.value;
    addFuckers();
  }
};

const addFuckers = () => {
   const newFucker = {
      id: Date.now(),
      name: nameInput.value,
      lastName: lastNameInput.value,
      age: ageInput.value,
      email: emailInput.value
   };

   fuckersList.push(newFucker);

   const registered = document.querySelector('#registeredList');

   const documentDisplay = document.createElement('p');
   documentDisplay.textContent = ` - ${newFucker.name} - ${newFucker.lastName} - ${newFucker.age} - ${newFucker.email} -`;
   documentDisplay.dataset.id = newFucker.id;

   const btnEdit = document.createElement('button');
   btnEdit.textContent = 'edit';
   btnEdit.classList.add('btn', 'btn-edit');
   documentDisplay.append(btnEdit);

   const btnDelete = document.createElement('button');
   btnDelete.textContent = 'delete';
   btnDelete.classList.add('btn', 'btn-delete');
   documentDisplay.append(btnDelete);

   registered.append(documentDisplay, document.createElement('hr'));
};


// const addFuckers = () => {
//   fuckersList.push({...objFucker});
//   displayFuckers();
// };

// const displayFuckers = () => {
//   cleaningHTML();

//   const registered = document.querySelector('#registeredList');

//   fuckersList.forEach(fucker => {
//     const {id, name, lastName, age, email} = fucker;

//     const documentDisplay = document.createElement('p');
//     documentDisplay.textContent = ` - ${name} - ${lastName} - ${age} - ${email} -`;
//     documentDisplay.dataset.id = id;

//     const btnEdit = document.createElement('button');
//     btnEdit.textContent = 'edit';
//     btnEdit.classList.add('btn', 'btn-edit');
//     documentDisplay.append(btnEdit);

//     const btnDelete = document.createElement('button');
//     btnDelete.textContent = 'delete';
//     btnDelete.classList.add('btn', 'btn-delete');
//     documentDisplay.append(btnDelete);

//     registered.append(documentDisplay, document.createElement('hr'));
//   });
// };

const cleaningHTML = () => {
  const registered = document.querySelector('#registeredList');

  while (registered.firstChild) {
    registered.removeChild(registered.firstChild);
  }
};



userform.addEventListener('submit', formValidate);


// inputs are the ones that the user can insert, output should be a variable that I can console log and see an array. 
// the main goal is to make a crud

// first I will get the inputs from the user and spread them into a variable
// then, return the variable, and console log. 



// // first coding, how to create a user from the table´s inputs.  
//  const createUser = (e) => {
//     user = 
//     {...user,
//    [e.target.name]: e.target.value
//    }
// }

 // WILL USE THE SHEET SO i CAN GO TROW THE STEPS, ONE BY ONE. 