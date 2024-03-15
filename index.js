var account = JSON.parse(localStorage.getItem('account')) || [
    {
        name: 'xxx',
        unifiedCode: '91330783MA2HTW7E53',
        phoneNumber: '13805711234',
        password: 'jk123456'
    },
    {
        name: 'xxxx',
        unifiedCode: '91330783MA2HTW8D96',
        phoneNumber: '13805715869',
        password: 'jk123456'
    },
];

// Get the account list element
var accountList = document.getElementById('account_list');
// Get the form element
var form = document.querySelector('.passwordInput');
// Get the save button
var saveButton = document.querySelector('input.submit');
// Add an event listener to the save button
var clearAllMarkButton = document.getElementById('clearallmark');

saveButton.addEventListener('click', function (event) {
    // Prevent the form from submitting and refreshing the page
    event.preventDefault();

    // Get the form inputs
    var nameInput = document.querySelector('input[name="name"]');
    var unifiedCodeInput = document.querySelector('input[name="unifiedCode"]');
    var phoneNumberInput = document.querySelector('input[name="phoneNumber"]');
    var passwordInput = document.querySelector('input[name="password"]');

    // Check if an account is selected
    if (selectedAccount !== null) {
        // Update the selected account
        account[selectedAccount].name = nameInput.value;
        account[selectedAccount].unifiedCode = unifiedCodeInput.value;
        account[selectedAccount].phoneNumber = phoneNumberInput.value;
        account[selectedAccount].password = passwordInput.value;
    } else {
        // Add a new account
        account.push({
            name: nameInput.value,
            unifiedCode: unifiedCodeInput.value,
            phoneNumber: phoneNumberInput.value,
            password: passwordInput.value
        });
    }
    // Refresh the account list
    refreshAccountList();
    // Hide the form
    form.style.display = "none";

    // Save the account data to localStorage
    localStorage.setItem('account', JSON.stringify(account));
});

// Loop over the accounts and create an element for each one
for (let i = 0; i < account.length; i++) {
    var accountDiv = document.createElement('div');
    accountDiv.className = 'account';


    var nameDiv = document.createElement('div');
    nameDiv.textContent = account[i].name;
    nameDiv.id = 'name' + i;
    nameDiv.className = 'name';

    var buttonDiv = document.createElement('div');

    var updateButton = document.createElement('button');
    updateButton.className = 'update';
    updateButton.id = 'update' + i;
    updateButton.textContent = 'update';

    var loginButton = document.createElement('button');
    loginButton.className = 'login';
    loginButton.id = 'login' + i;
    loginButton.textContent = 'login';

    var deleteButton = document.createElement('button');
    deleteButton.className = 'delete';
    deleteButton.id = 'delete' + i;
    deleteButton.textContent = 'delete';

    buttonDiv.appendChild(updateButton);
    buttonDiv.appendChild(loginButton);
    buttonDiv.appendChild(deleteButton);

    accountDiv.appendChild(nameDiv);
    accountDiv.appendChild(buttonDiv);

    accountList.appendChild(accountDiv);

    // Add an event listener to the update button
    updateButton.addEventListener('click', function () {
        // Set the selected account to the current account's NO
        selectedAccount = i;
        // Get the form inputs
        var nameInput = document.querySelector('input[name="name"]');
        var unifiedCodeInput = document.querySelector('input[name="unifiedCode"]');
        var phoneNumberInput = document.querySelector('input[name="phoneNumber"]');
        var passwordInput = document.querySelector('input[name="password"]');

        // Fill the form with the account data
        nameInput.value = account[i].name;
        unifiedCodeInput.value = account[i].unifiedCode;
        phoneNumberInput.value = account[i].phoneNumber;
        passwordInput.value = account[i].password;

        // Show the form
        form.style.display = "block";

    });

    // Add an event listener to the delete button
    deleteButton.addEventListener('click', function () {
        // Remove the account from the array
        account.splice(i, 1);
        // Refresh the account list
        refreshAccountList();
        // Save the account data to localStorage
        localStorage.setItem('account', JSON.stringify(account));
    });

    clearAllMarkButton.addEventListener('click', function() {
        // Get all nameDiv elements
        var nameDivs = document.querySelectorAll('.name');
    
        // Loop over the nameDiv elements and remove the 'crossed-out' class
        nameDivs.forEach(function(nameDiv) {
            nameDiv.classList.remove('crossed-out');
        });
    });

    loginButton.addEventListener('click', function() {
        var nameDiv = document.getElementById('name' + i);
        nameDiv.classList.add('crossed-out');
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(account[i])
        }).then(response => response.text()).then(data => {
            console.log(data);
            
        });
    });
}

function refreshAccountList() {
    accountList.innerHTML = '';
    for (let i = 0; i < account.length; i++) {
        var accountDiv = document.createElement('div');
        accountDiv.className = 'account';

        var nameDiv = document.createElement('div');
        nameDiv.textContent = account[i].name;
        nameDiv.id = 'name' + i;
        nameDiv.className = 'name';

        var buttonDiv = document.createElement('div');

        var updateButton = document.createElement('button');
        updateButton.className = 'update';
        updateButton.id = 'update' + i;
        updateButton.textContent = 'update';

        var loginButton = document.createElement('button');
        loginButton.className = 'login';
        loginButton.id = 'login' + i;
        loginButton.textContent = 'login';

        var deleteButton = document.createElement('button');
        deleteButton.className = 'delete';
        deleteButton.id = 'delete' + i;
        deleteButton.textContent = 'delete';

        buttonDiv.appendChild(updateButton);
        buttonDiv.appendChild(loginButton);
        buttonDiv.appendChild(deleteButton);

        accountDiv.appendChild(nameDiv);
        accountDiv.appendChild(buttonDiv);

        accountList.appendChild(accountDiv);
        // Add an event listener to the update button
        updateButton.addEventListener('click', function () {
            // Set the selected account to the current account's NO
            selectedAccount = i;
            // Get the form inputs
            var nameInput = document.querySelector('input[name="name"]');
            var unifiedCodeInput = document.querySelector('input[name="unifiedCode"]');
            var phoneNumberInput = document.querySelector('input[name="phoneNumber"]');
            var passwordInput = document.querySelector('input[name="password"]');

            // Fill the form with the account data
            nameInput.value = account[i].name;
            unifiedCodeInput.value = account[i].unifiedCode;
            phoneNumberInput.value = account[i].phoneNumber;
            passwordInput.value = account[i].password;

            // Show the form
            form.style.display = "block";

        });

        clearAllMarkButton.addEventListener('click', function() {
            // Get all nameDiv elements
            var nameDivs = document.querySelectorAll('.name');
        
            // Loop over the nameDiv elements and remove the 'crossed-out' class
            nameDivs.forEach(function(nameDiv) {
                nameDiv.classList.remove('crossed-out');
            });
        });

        // Add an event listener to the delete button
        deleteButton.addEventListener('click', function () {
            // Remove the account from the array
            account.splice(i, 1);
            // Refresh the account list
            refreshAccountList();
            // Save the account data to localStorage
            localStorage.setItem('account', JSON.stringify(account));
        });
    }
    accountList.appendChild(addButton);
}



// Get the 'X' element
var close = document.querySelector('.close');
// Add an event listener to the 'X' that hides the form when clicked
close.addEventListener('click', function () {
    form.style.display = 'none';
});

// Create the add account button
var addButton = document.createElement('button');
addButton.textContent = 'Add account';
addButton.className = 'add';
addButton.addEventListener('click', function () {
    // Set the selected account to null
    selectedAccount = null;
    // Clear the form inputs
    document.querySelector('input[name="name"]').value = '';
    document.querySelector('input[name="unifiedCode"]').value = '';
    document.querySelector('input[name="phoneNumber"]').value = '';
    document.querySelector('input[name="password"]').value = '';

    // Show the form
    form.style.display = "block";
});

// Append the add account button to the account list
accountList.appendChild(addButton);

